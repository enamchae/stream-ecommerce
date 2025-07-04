import {error, json, type RequestHandler} from "@sveltejs/kit";
import {eq} from "drizzle-orm";

import { listingTable, userTable as userTable } from "$/lib/server/db/schema";
import { db } from "$/lib/server/db";
import { PostEndpoint, requiresLoggedInUser } from "../../middleware";
import { validate } from "$lib/validation";
import type { User } from "@supabase/supabase-js";

const endpoint = new PostEndpoint(
    async (
        payload: {
            listingTitle: string,
            listingDescription: string,
            listingOnDisplay: boolean,
        },
        {user}: {user: User},
    ) => {
        const userObjs = await db.select({canSell: userTable.canSell})
            .from(userTable)
            .where(eq(userTable.id, user.id))
            .limit(1);

        if (userObjs.length === 0) return error(500, "User not found");

        const userObj = userObjs[0];
        if (!userObj.canSell) return error(403, "User is not a seller");

        const validationResult = validate.listing({title: payload.listingTitle, description: payload.listingDescription});
        if (!validationResult.ok) {
            return error(400, JSON.stringify({errors: validationResult.errors}));
        }

        const listingId = await generateListingId();
        await db.insert(listingTable)
            .values({
                id: listingId,
                sellerUserId: user.id,
                title: payload.listingTitle,
                description: payload.listingDescription,
                onDisplay: payload.listingOnDisplay,
            });

        return {listingId};
    },
);

export const PUT = requiresLoggedInUser(async (user, event) => endpoint.callHandler({user}, event));
export type NewListing = typeof endpoint;

const generateListingId = async () => {
    let productId: string;
    while (true) {
        productId = crypto.randomUUID();

        const calls = await db.select({})
            .from(listingTable)
            .where(eq(listingTable.id, productId))
            .limit(1);
        if (calls.length === 0) break;
    }

    return productId;
};
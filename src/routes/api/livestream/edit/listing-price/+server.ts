import {and, eq} from "drizzle-orm";

import { streamListingAssociationTable } from "$/lib/server/db/schema";
import { db } from "$/lib/server/db";
import { PostEndpoint, requiresLoggedInUser } from "../../../middleware";
import type { User } from "@supabase/supabase-js";
import { userOwnsStreamErrors } from "../user-owns-stream";

const endpoint = new PostEndpoint(
    async (
        {streamId, listingId, price}: {
            streamId: string,
            listingId: string,
            price: string,
        },
        {user}: {user: User},
    ) => {
        const err = await userOwnsStreamErrors(user, streamId);
        if (err !== null) return err;


        await db.update(streamListingAssociationTable)
            .set({ price })
            .where(and(
                eq(streamListingAssociationTable.streamId, streamId),
                eq(streamListingAssociationTable.listingId, listingId),
            ));

        return {};
    },
);

export const PATCH = requiresLoggedInUser(async (user, event) => endpoint.callHandler({user}, event));
export type EditStreamListingPrice = typeof endpoint;

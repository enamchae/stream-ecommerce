import {eq} from "drizzle-orm";

import { streamListingAssociationTable } from "$/lib/server/db/schema";
import { db } from "$/lib/server/db";
import { PostEndpoint, requiresLoggedInUser } from "../../../middleware";
import type { User } from "@supabase/supabase-js";
import { userOwnsStreamErrors } from "../user-owns-stream";

const endpoint = new PostEndpoint(
    async (
        {streamId, listingIds}: {
            streamId: string,
            listingIds: string[],
        },
        {user}: {user: User},
    ) => {
        const err = await userOwnsStreamErrors(user, streamId);
        if (err !== null) return err;


        await db.delete(streamListingAssociationTable)
            .where(eq(streamListingAssociationTable.streamId, streamId));
        
        if (listingIds.length > 0) {
            await db.insert(streamListingAssociationTable)
                .values(listingIds.map(listingId => ({
                    listingId,
                    streamId,
                })));
        }

        return {};
    },
);

export const PATCH = requiresLoggedInUser(async (user, event) => endpoint.callHandler({user}, event));
export type EditStreamListingSelection = typeof endpoint;

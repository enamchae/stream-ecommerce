import { db } from "$/lib/server/db";
import { livestreamTable } from "$/lib/server/db/schema";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ url }) => {
    const callId = url.searchParams.get("call_id");

    if (callId === null) return error(400, "Missing call id");

    const calls = await db.select({
        hostUserId: livestreamTable.hostUserId,
        hostSessionId: livestreamTable.hostSessionId,
    })
        .from(livestreamTable)
        .where(eq(livestreamTable.id, callId))
        .limit(1);

    if (calls.length === 0) return error(404, "No livestream with the given id");

    const call = calls[0];
    if (call.hostSessionId === null) return error(400, "Livestream has not started yet");

    return json({
        hostUserId: call.hostUserId,
        hostSessionId: call.hostSessionId,
    });
};

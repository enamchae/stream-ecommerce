import type { User } from "@supabase/supabase-js";

export type UserData = Readonly<{
    supabaseUser: User,
    supabaseAccessToken: string,
    streamioAuth: Readonly<{
        id: string,
        name: string,
        token: string,
    }>,
    id: string,
    name: string,
    canSell: boolean,
    finishedProfileSetup: boolean,
}>;

export class Resolvable<T> {
    readonly promise: Promise<T>;
    readonly resolve: (value: T) => void;
    readonly reject: (value: T) => void;

    constructor() {
        const {promise, resolve, reject} = Promise.withResolvers<T>();
        this.promise = promise;
        this.resolve = resolve;
        this.reject = reject;
    }

    async then(onFulfilled: (value: T) => void) {
        onFulfilled(await this.promise);
    }
}

const resolvable = () => new Resolvable();

export const store = $state({
    user: <UserData | null>null,
    get isSeller() {
        return this.user !== null && this.user.canSell;
    },
    buildType: resolvable(),
});
<script lang="ts">
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import {type User} from "@supabase/supabase-js";

import LoginButtonGoogle from "@/LoginButtonGoogle.svelte";
import { store } from "./store.svelte";
import {apiFetch} from "$routes/util";
    import { userLogin } from "$api/api";

let { data } = $props();

const {supabase} = $derived(data);


onMount(() => {
    if (store.user === null) return;
    goto("/");
});

const updateLoginState = async (user: User, accessToken: string) => {
    const response = await userLogin({}, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
    });
    
    store.user = {
        supabaseUser: user,
        supabaseAccessToken: accessToken,
        streamioAuth: {
            id: response.userId,
            name: response.userName,
            token: response.streamioUserToken,
        },
		id: response.userId,
		name: response.userName,
        canSell: response.canSell,
    };

    goto("/now-live");
};
</script>


<main>
    <h1>SLAY - demo</h1>

    <button-rack>
        <LoginButtonGoogle
            {supabase}
            onLogin={updateLoginState}
        />
    </button-rack>
</main>

<style lang="scss">
main {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0 2.5rem 0;
}
</style>
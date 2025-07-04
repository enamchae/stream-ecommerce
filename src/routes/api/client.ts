import { apiGetter, apiPoster } from "./endpoint-client";
import type { GetListingsBySeller } from "./listing/by-seller/+server";
import type { GetListingDetails } from "./listing/details/+server";
import type { GetListingList } from "./listing/list/+server";
import type { GetLivestreamsBySeller } from "./livestream/by-seller/+server";
import type { GetStreamInfo } from "./livestream/details/+server";
import type { EditStreamDetails } from "./livestream/edit/details/+server";
import type { EditStreamListingActivation } from "./livestream/edit/listing-activation/+server";
import type { EditStreamListingPrice } from "./livestream/edit/listing-price/+server";
import type { EditStreamListingSelection } from "./livestream/edit/listing-selection/+server";
import type { GetLivestreamHost } from "./livestream/get-host/+server";
import type { GetLivestreamList } from "./livestream/list/+server";
import type { SetStreamHostSession } from "./livestream/set-host-session/+server";
import type { StartLivestream } from "./livestream/start/+server";
import type { StopLivestream } from "./livestream/stop/+server";
import type { UserLogin } from "./user/login/+server";
import type { UpdateProfile } from "./user/update-profile/+server";
import type { EditListing } from "./listing/edit/+server";
import type { NewListing } from "./listing/new/+server";
import type { NewLivestream } from "./livestream/new/+server";


export const api = {
    listing: {
        bySeller: apiGetter<GetListingsBySeller>("listing/by-seller", true),
        details: apiGetter<GetListingDetails>("listing/details", true),
        list: apiGetter<GetListingList>("listing/list", true),
        edit: apiPoster<EditListing>("listing/edit", true, "PATCH"),
        new: apiPoster<NewListing>("listing/new", true, "PUT"),
    },
    stream: {
        bySeller: apiGetter<GetLivestreamsBySeller>("livestream/by-seller", true),
        details: apiGetter<GetStreamInfo>("livestream/details", true),
        getHost: apiGetter<GetLivestreamHost>("livestream/get-host", true),
        list: apiGetter<GetLivestreamList>("livestream/list", true),
        new: apiPoster<NewLivestream>("livestream/new", true, "PUT"),
        start: apiPoster<StartLivestream>("livestream/start", true),
        stop: apiPoster<StopLivestream>("livestream/stop", true),
        setHostSession: apiPoster<SetStreamHostSession>("livestream/set-host-session", true, "PATCH"),
        edit: {
            details: apiPoster<EditStreamDetails>("livestream/edit/details", true, "PATCH"),
            listing: {
                selection: apiPoster<EditStreamListingSelection>("livestream/edit/listing-selection", true, "PATCH"),
                price: apiPoster<EditStreamListingPrice>("livestream/edit/listing-price", true, "PATCH"),
                activation: apiPoster<EditStreamListingActivation>("livestream/edit/listing-activation", true, "PATCH"),
            },
        },
    },
    user: {
        login: apiPoster<UserLogin>("user/login", false),
        updateProfile: apiPoster<UpdateProfile>("user/update-profile", true),
    },
};
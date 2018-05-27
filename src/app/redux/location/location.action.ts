import { Action } from "@ngrx/store";

interface location {
    city: string,
    formatted_address: string,
    lat: number,
    lng: number,
    lang: string
}

export namespace LOCATION_ACTION {
    export const CHANGE_LOCATION = 'CHANGE_LOCATION';
}

export class ChangeLocation implements Action {
    readonly type = LOCATION_ACTION.CHANGE_LOCATION;

    constructor ( public payload: location ) {}
}
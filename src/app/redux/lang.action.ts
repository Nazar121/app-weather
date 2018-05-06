import { Action } from "@ngrx/store";

export namespace LANG_ACTION {
    export const CHANGE_LANG = 'CHANGE_LANG';
}

export class ChangeLan implements Action {
    readonly type = LANG_ACTION.CHANGE_LANG;

    constructor ( public data: string ) {}
}
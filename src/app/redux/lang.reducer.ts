import { LANG_ACTION, ChangeLan } from "./lang.action";

const initialState = {
    lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
};

export function langReducer(state = initialState, action: ChangeLan) {
    switch(action.type) {
        case LANG_ACTION.CHANGE_LANG:
            return {
                ...state,
                lang: action.data
            };
        default:
            return state;
    }
}
import { LOCATION_ACTION, ChangeLocation } from "./location.action";

let location = JSON.parse(sessionStorage.getItem('weather'));

if ( location === undefined || location === null ) {
    location = {
        city: 'Lviv',
        formatted_address: 'Lviv, Lviv Oblast, Ukraine, 79000',
        lat: 49.839683,
        lng: 24.029717,
        lang: 'en'
    };
    sessionStorage.setItem('weather', JSON.stringify(location));
} else {
    location = JSON.parse(sessionStorage.getItem('weather'));
}

const initialState = {
    city: location.city,
    formatted_address: location.formatted_address,
    lat: location.lat,
    lng: location.lng,
    lang: location.lang
};

export function locationReducer(state = initialState, action: ChangeLocation) {
    switch(action.type) {
        case LOCATION_ACTION.CHANGE_LOCATION:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}
export interface AppState {
    language: {
        lang: string
    },
    location: {
        city: string,
        formatted_address: string,
        lat: number,
        lng: number
    }
}
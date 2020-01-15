export const reducer = (state, action) => {
    switch(action.type) {
        case "ENVIRONMENT_SET": {
            return Object.assign(state, {
                lat: action.payload.lat,
                lon: action.payload.lon,
                hosps: action.payload.hosps,
                pol: action.payload.pol,
                fs: action.payload.fs
            });
        }
        default:
            return state;
    }
}
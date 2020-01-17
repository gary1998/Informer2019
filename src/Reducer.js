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
        
        case "USER_SET": {
            return Object.assign(state, {
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone
            })
        }

        default:
            return state;
    }
}
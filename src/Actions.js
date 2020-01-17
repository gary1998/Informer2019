const serverURL = "http://localhost:8000";

export const setEnv = () => {
    return location => {
        const geolocation = navigator.geolocation;
        if(!geolocation){
            console.error("Geolocation isn't supported on this device!");
        }
        else{
            geolocation.watchPosition(position => {
                Promise.all([
                    fetch(serverURL+`/getHosps?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=10`).then(body => body.json()),
                    fetch(serverURL+`/getPolice?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=10`).then(body => body.json()),
                    fetch(serverURL+`/getFire?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=10`).then(body => body.json())
                ]).then((response) => {
                    location({
                        type: "ENVIRONMENT_SET",
                        payload: {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                            hosps: response[0],
                            pol: response[1],
                            fs: response[2]
                        }
                    })
                })
            }, err => {
                console.error("Error getting geolocation!", err); 
            });
        }
    }
}

export const setUser = () => {
    return User => {
        User({
            type: "USER_SET",
            payload: {
                name: "Gaurav Goswami",
                email: "gouravgoswami48@gmail.com",
                phone: "7017925280"
            }
        })
    }
}
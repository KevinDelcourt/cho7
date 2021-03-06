const getApiUrl = () => {
    switch (process.env.NODE_ENV) {
        case "test":
            return "http://localhost:8180"
        case "development":
            return "http://" + window.location.href.split(/[/:]/)[3] + ":8180"
        case "production":
            return "http://149.202.58.150:443"
        default:
            return "http://localhost:8180"
    }
}

export const getAudioUrl = filename => {
    let url = getApiUrl() + "/public/audio/"
    if (filename) url += filename
    return url
}

export const getImageUrl = filename => {
    let url = getApiUrl() + "/public/images/"
    if (filename) url += filename
    return url
}

export default getApiUrl

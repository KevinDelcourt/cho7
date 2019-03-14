

const getApiUrl = () => {
    switch(process.env.NODE_ENV){
        case 'test':
            return 'http://localhost:8180'
        case 'development':
            return 'http://'+window.location.href.split(/[/:]/)[3]+':8180'
        case 'production':
            return 'url du site'
        default:
            return 'error'
    }
        
}

export const getAudioUrl = () => {
    let baseUrl = getApiUrl()
    return baseUrl + '/public/audio/'
}

export const getImageUrl = () => {
    let baseUrl = getApiUrl()
    return baseUrl + '/public/images/'
}

export default getApiUrl

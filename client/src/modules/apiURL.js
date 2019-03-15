

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

export const getAudioUrl = (filename) => {
    let url = getApiUrl() + '/public/audio/'
    if(filename)
        url += filename
    return url
}

export const getImageUrl = (filename) => {
    let url = getApiUrl() + '/public/images/'
    if(filename)
        url += filename
    return url
}

export default getApiUrl

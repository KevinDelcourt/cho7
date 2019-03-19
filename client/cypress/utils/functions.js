export const longString = (length) => {
    let string = ""
    for(let i = 0; i < length; i++)
        string += "$"
    return string
}

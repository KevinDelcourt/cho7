const responseFromValidatorError = error => {
    let response = {}
    for (let val of error.array()) response[val.param] = val.msg
    return response
}

module.exports = {
    responseFromValidatorError
}

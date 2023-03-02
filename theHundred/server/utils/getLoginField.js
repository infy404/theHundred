/** 
 * User could login with either email or phoneNumber
 * This function receives the loginKey as an input
 * and returns an object {(email || phoneNumber) : password }
**/
const getLoginField = (loginKey) => {
    if(Object.is(parseInt(loginKey, 10), NaN)){
        return "userEmail"

    }
    return "phoneNumber"

}

module.exports = getLoginField
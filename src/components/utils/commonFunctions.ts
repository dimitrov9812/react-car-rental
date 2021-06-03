export const validateEmail = (mail: string) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }

    return (false)
}

export const validatePhoneNumber = (number: string): boolean => {
    let patternDashesAndPlus: RegExp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    let patternDashes: RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let pattern: RegExp = /^\d{10}$/;

    if(number.match(pattern) || number.match(patternDashes) || number.match(patternDashesAndPlus)) {
        return true;
    }

    return false
}
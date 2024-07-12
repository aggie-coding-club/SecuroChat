// utilities file containing common functionalities

export function validateUsername(username) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
}

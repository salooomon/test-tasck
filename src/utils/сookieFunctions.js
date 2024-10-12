export function setCookie(name, value, hour) {
    const d = new Date();
    d.setTime(d.getTime() + (hour*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    const str = `${name}=${value};${expires}`
    document.cookie = str;
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

export function deleteCookie(name) {
    const newName = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    document.cookie = newName
}
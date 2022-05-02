import {HttpError} from "./httpError";

export async function fetchJSON(url, requestInit) {
    let res;
    if (arguments.length === 1) {
        res = await fetch(url);
    } else res = await fetch(url, requestInit);
    if (res.status === 204) {
        console.log(204);
        return null;
    } else if (res.ok) {
        return await res.json();
    } else {
        throw new HttpError(res.status, res.statusText);
    }
}
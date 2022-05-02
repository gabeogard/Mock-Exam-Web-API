export class HttpError extends Error {
    constructor(status, statusText) {
        super(statusText);
        this.status = status;
    }
}
export class AppError extends Error{
    statusCode: number;
    status: string;
    operational: any

    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode
        this.status = this.statusCode > 400 ? "fail" : "Error"
        this.operational = true

        Error.captureStackTrace(this, this.constructor);
    }
}
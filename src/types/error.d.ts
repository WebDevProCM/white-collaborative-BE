export interface CustomError extends Error{
    statusCode: number,
    errorMessage: string
}
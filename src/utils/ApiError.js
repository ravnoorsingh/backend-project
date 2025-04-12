class ApiError extends Error {
    constructor(
        statusCode, 
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}

// https://chatgpt.com/share/67fac3bb-24b8-800c-a61e-dd519e0f5c71
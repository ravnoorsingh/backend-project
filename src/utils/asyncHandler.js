const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }

    // return (req, res, next) => {
    //     Promise.resolve(requestHandler(req, res, next)).
    //     catch((err) => next(err))
    // }
}

export {asyncHandler}

// https://chatgpt.com/share/67fabfb1-0144-800c-a351-4320ba7d96db


// const asyncHandler = () => {}
// const asyncHandler= (function) => {() => {}}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async() => {}


// passing paremeters to a function which is again calling another function
// const asyncHandler = (fn) => async(req, res, next ) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         }) // sending error in response
//     }
// }
export const notFound = (req, res, next) => {
    res.status(404).json({status: "failed", message: "This route does not exist"})
}
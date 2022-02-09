const wrapAsync = (execution) => (req, res, next) => {
    Promise.resolve(execution(req, res, next)).catch(next)
}

module.exports = { wrapAsync }
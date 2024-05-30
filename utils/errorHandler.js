let bitErrorHandler = {
    error500ServerError: function(res, err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    },
    error404NotFound: function(res, err) {
        res.status(404).json(`${err} not found`);
    },
    error400Database: function(res, err) {
        res.status(400).json(`The ${Object.keys(err.keyValue)} ${err.keyValue[Object.keys(err.keyValue)]} already exist`);
    },
    error428Required: function(res, err) {
        res.status(428).json(`The ${Object.keys(err.errors)[0]} is required`);   
    },
    error400BadRequest: function(res, err) {
        res.status(400).json({
            message: "There is a trouble with your request",
            error: err
        })
    }
}

export default bitErrorHandler;

// Utility function for validating the parameter
function validateParameter(docLimit, docSkip){
    if (docLimit){
        if (parseInt(docLimit) > 1000){
            let err = new Error().message = "Limit values should not be more than 1000.";
            return {
                error: err,
                filter: null
            };
        }
    } else {
        let err = new Error().message = "Incorrect parameters. Example - /skip/:skip/limit/:limit with your request url";
        return {
            error: err,
            filter: null
        };
    }

    if (docSkip){
        if (docSkip === ""){
            let err = new Error().message = "Skip values cannot be empty.";
            return {
                error: err,
                filter: null
            };
        }
    } else {
        let err = new Error().message = "Incorrect parameters. Example - /skip/:skip/limit/:limit with your request url";
        return {
            error: err,
            filter: null
        };
    }

    return {
        error: null,
        filter: { skip: parseInt(docSkip), limit: parseInt(docLimit) }
    };
}

module.exports.validateParameter = validateParameter;
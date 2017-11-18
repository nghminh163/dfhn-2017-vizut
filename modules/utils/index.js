var genRes = (status, result, message) => {
	return {
		status: status,
		result: result,
		message: message
	}
}

module.exports = {genRes};
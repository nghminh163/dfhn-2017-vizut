var CONFIGS = {
	port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000,
	ip: process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
}

module.exports = CONFIGS;
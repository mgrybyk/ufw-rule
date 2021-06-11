// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import Joi from 'joi'

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
        PORT: Joi.number().default(8230),
        AUTH_TOKEN: Joi.string().required(),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    authToken: envVars.AUTH_TOKEN,
}

import Joi from 'joi'
import { Router } from 'express'
import { addRule } from '../../components/ufw-cli/ufw'
import { asyncHandler } from '../../middlewares/asyncHandler'

export const ufwRoute = Router()

const addRuleSchema = Joi.object({
    type: Joi.string().required().valid('allow', 'deny'),
    ipFrom: Joi.string(),
    ipTo: Joi.string(),
    port: Joi.string(),
    proto: Joi.string(),
}).or('ipFrom', 'ipTo', 'port', 'proto')

const removeRuleSchema = Joi.object({
    to: Joi.string().required(),
    action: Joi.string().required(),
    from: Joi.string().required(),
})

ufwRoute.get('/rule-list', (req, res) => {
    res.status(501).end({ error: 'not implemented' })
})

ufwRoute.post(
    '/rule-add',
    asyncHandler(async (req, res) => {
        const { value, error } = addRuleSchema.validate(req.body)
        if (error) {
            throw error
        }
        let remoteIp
        if (value.ipFrom === '$remoteIp') {
            remoteIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            value.ipFrom = remoteIp
        } else if (value.ipFrom === '$remoteIpRange') {
            remoteIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string
            value.ipFrom = remoteIp.substr(0, remoteIp.lastIndexOf('.')) + '.0/24'
        }
        const r = await addRule(value)
        res.json(remoteIp ? { ...r, remoteIp } : r)
    })
)

ufwRoute.post('/rule-remove', (req, res) => {
    const { error } = removeRuleSchema.validate(req.body)
    if (error) {
        throw error
    }
    res.status(501).end({ error: 'not implemented' })
})

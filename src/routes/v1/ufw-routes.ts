import { Router } from 'express'

export const ufwRoute = Router()

ufwRoute.get('/rule-list', (req, res) => {
    res.end('rule-list')
})

ufwRoute.post('/rule-add', (req, res) => {
    res.end('rule-add')
})

ufwRoute.post('/rule-remove', (req, res) => {
    res.end('rule-remove')
})

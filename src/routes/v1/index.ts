import { Router } from 'express'

import { ufwRoute } from './ufw-routes'

export const routes = Router()

routes.use('/ufw', ufwRoute)

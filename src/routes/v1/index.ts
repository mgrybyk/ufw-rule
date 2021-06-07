import * as express from 'express'

import { ufwRoute } from './ufw-routes'

export const routes = express.Router()

routes.use('/ufw', ufwRoute)

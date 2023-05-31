import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { create } from './create'
import { find } from './find'
import { fetch } from './fetch'
import { filter } from './filter'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/pets', fetch)
  app.get('/pets/filter', filter)
  app.get('/pets/:id', find)

  app.post('/pets', { onRequest: [verifyUserRole('ADMIN')] }, create)
}

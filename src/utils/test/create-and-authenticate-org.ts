import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  const { id } = await prisma.org.create({
    data: {
      name: 'Test Organization',
      email: 'testorg@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua do meio, Recife-PE',
      cep: '14587-000',
      whatsapp_number: '(99)99999-9999',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'testorg@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token, id }
}

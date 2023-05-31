import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe Company',
      email: 'johndoecompany@example.com',
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password: '123456',
      whatsapp_number: '(99)12345-6789',
    })

    expect(response.statusCode).toEqual(201)
  })
})

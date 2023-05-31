import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Test Organization',
      email: 'testorg@example.com',
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password: '123456',
      whatsapp_number: '(99)12345-6789',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'testorg@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

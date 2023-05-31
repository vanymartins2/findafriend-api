import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, id } = await createAndAuthenticateOrg(app, true)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet',
        about:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex at est porttitor, sit amet commodo enim pellentesque. Proin vitae massa odio. Sed euismod nisl id nisi aliquet, nec bibendum orci commodo',
        age: 'Filhote',
        energy_level: 4,
        environment: 'Ambiente amplo',
        size: 'Pequenino',
        independency_level: 'Baixo',
        photos: ['/public/images/image1.png', '/public/images/image2.png'],
        requirements: [
          'Local grande para o animal correr e brincar',
          'Proibido apartamento',
          'Ambiente frio, pois possui muito pelo',
        ],
        org_id: id,
      })

    expect(response.statusCode).toEqual(201)
  })
})

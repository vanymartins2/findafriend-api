import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Pets By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const { token, id } = await createAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        about:
          'Eu sou um lindo doguinho de 3 anos, um jovem brincalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Juscelino',
        about:
          'Eu sou um lindo gatinho de 1 ano, um preguiçoso que gosta muito de dormir, e também ama comer peixe.',
        age: 'Adulto',
        energy_level: 2,
        environment: 'Ambiente amplo',
        size: 'Médio',
        independency_level: 'Médio',
        photos: ['/public/images/image1.png', '/public/images/image2.png'],
        requirements: [
          'Proibido apartamento',
          'Ambiente frio, pois possui muito pelo',
        ],
        org_id: id,
      })

    const response = await request(app.server)
      .get('/pets')
      .query({ query: 'Recife' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })
})

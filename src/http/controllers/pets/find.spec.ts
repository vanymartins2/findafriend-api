import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createPet } from '@/utils/test/create-pet'

describe('Find Pet By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a pet by its id', async () => {
    const { token, id } = await createAndAuthenticateOrg(app, true)

    const { pet } = await createPet(app, id)

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(expect.objectContaining({ id: pet.id }))
  })
})

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Test Organization',
      email: 'testorg@example.com',
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password_hash: await hash('123456', 6),
      whatsapp_number: '(99)12345-6789',
    })

    const { user } = await sut.execute({
      email: 'testorg@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

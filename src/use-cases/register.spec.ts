import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Test Organization',
      email: 'testorg@example.com',
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password: '123456',
      whatsapp_number: '(99)12345-6789',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Test Organization',
      email: 'testorg@example.com',
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password: '123456',
      whatsapp_number: '(99)12345-6789',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'testorg@example.com'

    await sut.execute({
      name: 'Test Organization',
      email,
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password: '123456',
      whatsapp_number: '(99)12345-6789',
    })

    await expect(() =>
      sut.execute({
        name: 'Test Organization',
        email,
        cep: '99989-888',
        address: 'Rua do meio, Recife-PE',
        password: '123456',
        whatsapp_number: '(99)12345-6789',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})

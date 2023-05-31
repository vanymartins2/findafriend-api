import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      id: 'org-1',
      name: 'Test Organization',
      email: 'testorg@example.com',
      cep: '99989-888',
      address: 'Rua do meio, Recife-PE',
      password_hash: '123456',
      whatsapp_number: '(99)12345-6789',
      created_at: new Date(),
      role: 'ADMIN',
    })

    const { pet } = await sut.execute({
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
      org_id: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(expect.objectContaining({ org_id: org.id }))
  })
})

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)

    await orgsRepository.create({
      id: 'org-1',
      name: 'Meu cãopanheiro',
      email: 'findafriendcompany@email.com',
      cep: '45870-000',
      address: 'Rua do meio, Recife-PE',
      password_hash: '12345',
      whatsapp_number: '(99)99999-9999',
    })
  })

  it('should be able to fetch pets by city', async () => {
    await petsRepository.create({
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
      org_id: 'org-1',
    })

    await petsRepository.create({
      name: 'Lina',
      about: 'Sou uma gatinha preguiçosa que gosta muito de comer peixes.',
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
      org_id: 'org-1',
    })

    const { pets } = await sut.execute({
      query: 'Recife',
    })

    expect(pets).toHaveLength(2)

    expect(pets[0]).toEqual(expect.objectContaining({ org_id: 'org-1' }))
  })
})

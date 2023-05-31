import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindPetByIdUseCase } from './find-pet-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: FindPetByIdUseCase

describe('Find Pet By Id', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetByIdUseCase(petsRepository)
  })

  it('should be able to find a pet by its id', async () => {
    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Alfredo')
  })

  it('should not be able to find a pet when id does not exists', async () => {
    await expect(() =>
      sut.execute({
        id: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

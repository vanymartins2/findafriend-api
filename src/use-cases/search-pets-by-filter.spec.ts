import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsByFilterUseCase } from './search-pets-by-filter'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByFilterUseCase

describe('Search Pets By Filter', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByFilterUseCase(petsRepository)
  })

  it('should be able to filter pets by its characteristics', async () => {
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
    })

    await petsRepository.create({
      name: 'Juscelino',
      about:
        'Eu sou um lindo gatinho de 1 ano, um preguiçoso que gosta muito de dormir, e também ama comer peixe.',
      age: 'Filhote',
      energy_level: 2,
      environment: 'Ambiente amplo',
      size: 'Pequenino',
      independency_level: 'Médio',
      photos: ['/public/images/image1.png', '/public/images/image2.png'],
      requirements: [
        'Proibido apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
    })

    const { pets } = await sut.execute({
      energy_level: 2,
      size: 'Pequenino',
      age: 'Filhote',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Juscelino' })])
  })
})

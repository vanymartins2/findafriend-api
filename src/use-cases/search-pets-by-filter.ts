import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsByFilterUseCaseRequest {
  age?: string
  energy_level?: number
  size?: string
  independency_level?: string
}

interface SearchPetsByFilterUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy_level,
    size,
    independency_level,
  }: SearchPetsByFilterUseCaseRequest): Promise<SearchPetsByFilterUseCaseResponse> {
    const pets = await this.petsRepository.searchManyByFilter({
      age,
      energy_level,
      size,
      independency_level,
    })

    return { pets }
  }
}

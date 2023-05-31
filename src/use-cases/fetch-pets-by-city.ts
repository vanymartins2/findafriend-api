import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindPetsByCityUseCaseRequest {
  query: string
}

interface FindPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
  }: FindPetsByCityUseCaseRequest): Promise<FindPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.fetchManyByCity(query)

    return { pets }
  }
}

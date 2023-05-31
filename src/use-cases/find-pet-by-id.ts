import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPetByIdUseCaseRequest {
  id: string
}

interface FindPetByIdUseCaseResponse {
  pet: Pet
}

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}

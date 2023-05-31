import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: number
  independency_level: string
  environment: string
  photos: string[]
  requirements: string[]
  org_id?: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    photos,
    requirements,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment,
      photos,
      requirements,
      org_id,
    })

    return { pet }
  }
}

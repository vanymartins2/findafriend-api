import { Pet, Prisma } from '@prisma/client'

export interface FindManyByFilterParams {
  age?: string
  energy_level?: number
  size?: string
  independency_level?: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  fetchManyByCity(query: string): Promise<Pet[]>
  searchManyByFilter(params: FindManyByFilterParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}

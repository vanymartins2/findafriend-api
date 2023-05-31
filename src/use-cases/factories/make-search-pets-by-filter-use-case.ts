import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByFilterUseCase } from '../search-pets-by-filter'

export function makeSearchPetsByFilterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsByFilterUseCase = new SearchPetsByFilterUseCase(
    petsRepository,
  )

  return searchPetsByFilterUseCase
}

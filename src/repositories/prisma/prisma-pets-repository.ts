import { Pet, Prisma } from '@prisma/client'
import { FindManyByFilterParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async fetchManyByCity(query: string) {
    const pets = await prisma.$queryRaw<Pet[]>`
      SELECT *
      FROM pets AS pet
      JOIN orgs AS org ON pet.org_id = org.id
      WHERE org.address LIKE '%${query}%'
    `

    return pets
  }

  async searchManyByFilter({
    age,
    energy_level,
    size,
    independency_level,
  }: FindManyByFilterParams) {
    const filteredPets = await prisma.pet.findMany({
      where: {
        AND: [{ age }, { energy_level }, { size }, { independency_level }],
      },
    })

    return filteredPets
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}

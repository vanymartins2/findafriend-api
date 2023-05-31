import { Org, Pet, Prisma } from '@prisma/client'
import { FindManyByFilterParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []
  public orgs: Org[] = []

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async fetchManyByCity(query: string) {
    const filteredPets = this.pets.filter((pet) => {
      const org = this.orgs.find((org) => org.id === pet.org_id)

      if (org && org.address) {
        return org.address.toLowerCase().includes(query.toLowerCase())
      }

      return []
    })

    return filteredPets
  }

  async searchManyByFilter({
    age,
    energy_level,
    independency_level,
    size,
  }: FindManyByFilterParams) {
    let filteredPets = this.pets

    if (size !== undefined) {
      filteredPets = filteredPets.filter((pet) => pet.size === size)
    }

    if (energy_level !== undefined) {
      filteredPets = filteredPets.filter(
        (pet) => pet.energy_level === energy_level,
      )
    }

    if (independency_level !== undefined) {
      filteredPets = filteredPets.filter(
        (pet) => pet.independency_level === independency_level,
      )
    }

    if (age !== undefined) {
      filteredPets = filteredPets.filter((pet) => pet.age === age)
    }

    return filteredPets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment: data.environment,
      photos: data.photos,
      requirements: data.requirements,
      org_id: data.org_id,
      created_at: new Date(),
    } as Pet

    this.pets.push(pet)

    return pet
  }
}

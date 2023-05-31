import { makeSearchPetsByFilterUseCase } from '@/use-cases/factories/make-search-pets-by-filter-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterPetsQuerySchema = z.object({
    age: z.string().optional(),
    energy_level: z.number().optional(),
    size: z.string().optional(),
    independency_level: z.string().optional(),
  })

  const { age, energy_level, size, independency_level } =
    filterPetsQuerySchema.parse(request.query)

  const searchPetsByFilterUseCase = makeSearchPetsByFilterUseCase()

  const { pets } = await searchPetsByFilterUseCase.execute({
    age,
    energy_level,
    size,
    independency_level,
  })

  return reply.status(200).send({ pets })
}

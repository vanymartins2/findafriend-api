import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchByCityQuerySchema = z.object({
    query: z.string(),
  })

  const { query } = fetchByCityQuerySchema.parse(request.query)

  const fetchByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchByCityUseCase.execute({
    query,
  })

  return reply.status(200).send({ pets })
}

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.number(),
    independency_level: z.string(),
    environment: z.string(),
    photos: z.array(z.string()),
    requirements: z.array(z.string()),
    org_id: z.string(),
  })

  const {
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
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
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

  return reply.status(201).send()
}

import { makeFindPetByIdUseCase } from '@/use-cases/factories/make-find-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = findByIdParamsSchema.parse(request.params)

  const findByIdUseCase = makeFindPetByIdUseCase()

  const { pet } = await findByIdUseCase.execute({
    id,
  })

  return reply.status(200).send({ pet })
}

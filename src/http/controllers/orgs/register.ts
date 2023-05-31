import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string(),
    address: z.string(),
    whatsapp_number: z.string(),
  })

  const { name, email, password, cep, address, whatsapp_number } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      whatsapp_number,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}

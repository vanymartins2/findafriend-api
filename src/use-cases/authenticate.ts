import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.orgsRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createPet(app: FastifyInstance, org_id: string) {
  const pet = await prisma.pet.create({
    data: {
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem brincalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'Filhote',
      energy_level: 4,
      environment: 'Ambiente amplo',
      size: 'Pequenino',
      independency_level: 'Baixo',
      photos: ['/public/images/image1.png', '/public/images/image2.png'],
      requirements: [
        'Local grande para o animal correr e brincar',
        'Proibido apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      org_id,
    },
  })

  await request(app.server).post('/pets').send({
    pet,
  })

  return { pet }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { postSchema } from './postSchema'

export const storePost = async ({ request }: HttpContextContract) => {
  const { title, body, userId } = await request.validate({ schema: postSchema })

  const post = await Post.create({
    title,
    body,
    userId,
  })

  return { message: 'Post created', post }
}

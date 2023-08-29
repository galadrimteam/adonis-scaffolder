import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { validateResourceId } from 'App/utils/validation/validateResourceId'
import { postSchema } from './postSchema'

export const updatePost = async ({ params, request }: HttpContextContract) => {
  const { id } = await validateResourceId(params)
  const { title, body, userId } = await request.validate({ schema: postSchema })

  // TODO Bouncer policy to restrict access

  const updatedPost = await Post.updateOrCreate(
    { id },
    {
      title,
      body,
      userId,
    }
  )

  return { message: 'Post updated', updatedPost }
}

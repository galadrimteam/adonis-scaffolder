import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { validateResourceId } from 'App/utils/scaffolderValidation/validateResourceId'

export const showPost = async ({ params }: HttpContextContract) => {
  const { id } = await validateResourceId(params)

  // TODO Bouncer policy to restrict access

  const post = await Post.findOrFail(id)

  return post
}

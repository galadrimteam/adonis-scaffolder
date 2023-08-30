import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { validateResourceId } from 'App/utils/scaffolderValidation/validateResourceId'

export const destroyPost = async ({ params }: HttpContextContract) => {
  const { id } = await validateResourceId(params)
  const post = await Post.findOrFail(id)

  // TODO Bouncer policy to restrict access

  const deletedId = post.id

  await post.delete()

  return { message: 'Post deleted', deletedId }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export const postsList = async ({}: HttpContextContract) => {
  const posts = await Post.all()

  return posts
}

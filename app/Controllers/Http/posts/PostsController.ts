import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { destroyPost } from 'App/Controllers/Http/posts/destroyPost'
import { postsList } from 'App/Controllers/Http/posts/postsList'
// import { showPost } from 'App/Controllers/Http/posts/showPost'
// import { storePost } from 'App/Controllers/Http/posts/storePost'
// import { updatePost } from 'App/Controllers/Http/posts/updatePost'

export default class OrganizationsController {
  public async index(ctx: HttpContextContract) {
    return postsList(ctx)
  }

  // public async store(ctx: HttpContextContract) {
  //   return storePost(ctx)
  // }

  // public async show(ctx: HttpContextContract) {
  //   return showPost(ctx)
  // }

  // public async update(ctx: HttpContextContract) {
  //   return updatePost(ctx)
  // }

  public async destroy(ctx: HttpContextContract) {
    return destroyPost(ctx)
  }
}

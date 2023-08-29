import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const postSchema = schema.create({
  title: schema.string([rules.minLength(3), rules.maxLength(20)]),
  body: schema.string([rules.minLength(3), rules.maxLength(200)]),
  userId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
})
import { BaseCommand, args } from '@adonisjs/core/build/standalone'
import { string } from '@ioc:Adonis/Core/Helpers'
import View from '@ioc:Adonis/Core/View'
import { BaseModel, RelationshipsContract } from '@ioc:Adonis/Lucid/Orm'
import { filterUndefinedOrNullValues } from 'App/utils/array'
import { getFieldValidationRules } from 'App/utils/validation/getFieldValidationRules'
import { MetaAttributeValidation } from 'App/utils/validation/modelAttributesValidation'

import fs from 'fs/promises'

const ROOT_PATH = '../../..'
const VIEWS_PATH = `scaffolder/api`
// .rw-r--r--
const FILE_RIGHTS = 0o644

const CRUD_NAMES = ['create', 'read', 'update', 'destroy', 'list'] as const

type CrudNames = (typeof CRUD_NAMES)[number]

export default class Api extends BaseCommand {
  public static commandName = 'make:api'

  public static description = 'Scaffold a new API controller for a Model'

  @args.string({
    description: 'Model name',
    name: 'modelName',
  })
  public modelName: string

  // run `node ace generate:manifest` after changing this
  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const relativePath = `${ROOT_PATH}/app/Models/${this.modelName}`
    const LoadedModel = (await import(relativePath)).default

    await this.getBelongsToRelations(LoadedModel)

    await this.createController()

    await this.createSchema(LoadedModel)

    await this.createCrudRoute('list')
    await this.createCrudRoute('destroy')
    await this.createCrudRoute('read')
  }

  private getFieldsToValidate(LoadedModel: typeof BaseModel) {
    const results = Array.from(LoadedModel.$columnsDefinitions.entries()).map(
      ([columnName, column]) => {
        if (column.meta?.validation === undefined) {
          return null
        }

        return {
          name: columnName,
          // column,
          validation: column.meta.validation as MetaAttributeValidation,
        }
      }
    )

    return filterUndefinedOrNullValues(results)
  }

  private async getBelongsToRelations(LoadedModel: typeof BaseModel) {
    const belongsToRelations: RelationshipsContract[] = []

    LoadedModel.$relationsDefinitions.forEach((rel) => {
      if (rel.type === 'belongsTo') {
        belongsToRelations.push(rel)
      }
    })

    return belongsToRelations
  }

  private get modelCamelCaseName() {
    return string.camelCase(this.modelName)
  }

  private get modelPluralizedCamelCaseName() {
    return string.pluralize(this.modelCamelCaseName)
  }

  private get crudNames() {
    const create = `store${this.modelName}`
    const read = `show${this.modelName}`
    const update = `update${this.modelName}`
    const destroy = `destroy${this.modelName}`
    const list = `${this.modelPluralizedCamelCaseName}List`

    return {
      folder: this.modelPluralizedCamelCaseName,
      create,
      read,
      update,
      destroy,
      list,
    }
  }

  private get folderPath() {
    const folder = `app/Controllers/Http/${this.modelPluralizedCamelCaseName}`

    return folder
  }

  private async createController() {
    const fileName = `${string.pluralize(this.modelName)}Controller.ts`
    const filePath = `${this.folderPath}/${fileName}`

    const text = await View.render(`${VIEWS_PATH}/controller`, { crudNames: this.crudNames })

    await fs.mkdir(this.folderPath, { recursive: true })
    await fs.writeFile(filePath, text, { encoding: 'utf-8', mode: FILE_RIGHTS })

    this.logger.info(`Creating file: ${filePath}`)
  }

  private async createCrudRoute(crudName: CrudNames) {
    const fileName = this.crudNames[crudName]
    const filePath = `${this.folderPath}/${fileName}.ts`

    const text = await View.render(`${VIEWS_PATH}/${crudName}`, {
      fileName,
      model: this.modelName,
      modelCamelCaseName: this.modelCamelCaseName,
      modelPluralizedCamelCaseName: this.modelPluralizedCamelCaseName,
    })

    await fs.writeFile(filePath, text, { encoding: 'utf-8', mode: FILE_RIGHTS })

    this.logger.info(`Creating file: ${filePath}`)
  }

  private async createSchema(LoadedModel: typeof BaseModel) {
    const fileName = `${this.modelCamelCaseName}Schema`
    const filePath = `${this.folderPath}/${fileName}.ts`

    const fieldsToValidate = this.getFieldsToValidate(LoadedModel)

    let fields = fieldsToValidate.map((field) => getFieldValidationRules(field)).join(',\n  ')

    if (fieldsToValidate.length > 0) fields += ','

    const text = await View.render(`${VIEWS_PATH}/schema`, {
      fileName,
      fields,
    })

    await fs.writeFile(filePath, text, { encoding: 'utf-8', mode: FILE_RIGHTS })

    this.logger.info(`Creating file: ${filePath}`)
  }
}

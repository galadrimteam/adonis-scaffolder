const fs = require('fs')

const FILES_CONFIG = [
  { where: 'commands/scaffolder', from: 'commands/Api.ts' },
  {
    where: 'resources/views/scaffolder',
    from: [
      'views/controller.edge',
      'views/create.edge',
      'views/destroy.edge',
      'views/list.edge',
      'views/read.edge',
      'views/schema.edge',
      'views/update.edge',
    ],
  },
  {
    where: 'app/utils/scaffolderValidation',
    from: [
      'validation/array.ts',
      'validation/getFieldValidationRules.ts',
      'validation/modelAttributesValidation.ts',
      'validation/validateResourceId.ts',
    ],
  },
]

const createFile = (projectRoot, app, sink, where, from) => {
  const fromPath = path.join(__dirname, 'build/templates', from)
  const fileName = from.split('/').pop()
  const toPath = path.join(projectRoot, where, fileName)

  return new Promise((resolve) => {
    fs.copyFile(fromPath, toPath, (err) => {
      if (err) {
        sink.logger.action('create').failed(modelPath)
      } else {
        sink.logger.action('create').succeeded(modelPath)
      }
      resolve()
    })
  })
}

/**
 * Instructions to be executed when setting up the package.
 */
async function instructions(projectRoot, app, sink) {
  const flatConfig = FILES_CONFIG.flatMap((config) => {
    if (Array.isArray(config.from)) {
      return config.from.map((nestedConf) => ({ from: nestedConf, where: config.where }))
    }

    return config
  })

  flatConfig.forEach((config) => {
    createFile(projectRoot, app, sink, config.where, config.from)
  })

  sink.logger.info('Scaffolder files created, please run "node ace generate:manifest"')
  sink.logger.info('Then you can run "node ace make:api [model name]"')
  sink.logger.info('e.g. "node ace make:api Post"')
}

module.exports = instructions

const fs = require('fs')
const path = require('path')

const FILES_CONFIG = [
  { where: 'commands', from: 'commands/Scaffolder.ts' },
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
    where: 'resources/views/scaffolder/auth',
    from: [
      'views/auth/AuthController.edge',
      'views/auth/changePassword.edge',
      'views/auth/login.edge',
      'views/auth/logout.edge',
      'views/auth/register.edge',
      'views/auth/resetPassword.edge',
      'views/auth/sendResetPasswordCode.edge',
    ],
  },
  {
    where: 'app/Scaffolder',
    from: ['Scaffolder/array.ts', 'Scaffolder/scaffolder.ts', 'Scaffolder/validateResourceId.ts'],
  },
]

const createFile = (projectRoot, app, sink, where, from) => {
  const fromPath = path.join(__dirname, 'build/templates', from)
  const fileName = from.split('/').pop()

  const toFolder = path.join(projectRoot, where)
  const toCompletePath = path.join(projectRoot, where, fileName)

  fs.mkdirSync(toFolder, { recursive: true })
  fs.copyFileSync(fromPath, toCompletePath)
  sink.logger.action('create').succeeded(toCompletePath)
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

  sink.logger.success('Scaffolder files created')
  sink.logger.info('you can now run "node ace scaffold [model name]"')
  sink.logger.info('e.g. "node ace scaffold Post"')
}

module.exports = instructions

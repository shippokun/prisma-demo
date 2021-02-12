// @ts-check
const path = require('path')
const fs = require('fs')
const util = require('util')
const NodeEnvironment = require('jest-environment-node')
const { nanoid } = require('nanoid')
const exec = util.promisify(require('child_process').exec)

const prismaBinary = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  'prisma'
)

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    this.dbName = `test_${nanoid()}`
    this.connectionString = `mysql://root:password@127.0.0.1:3306/prisma?schema=${this.dbName}`
    this.dbPath = path.join(__dirname, this.dbName)
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    await exec(`${prismaBinary} db push --preview-feature --ignore-migrations`)
    return super.setup()
  }

  async teardown() {
    try {
      await fs.promises.unlink(this.dbPath)
    } catch (error) {
    }
  }
}

module.exports = PrismaTestEnvironment
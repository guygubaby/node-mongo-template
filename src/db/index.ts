import process from 'node:process'
import mongoose from 'mongoose'
import { createLogger } from 'src/utils/logger'
import dotenv from 'dotenv'

const logger = createLogger('mongodb')

dotenv.config({
  path: ['.env', '.env.local'],
})

const MONGO_URI = process.env.MONGO_URI
const USER_NAME = process.env.MONGO_USER_NAME
const PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DB_NAME = process.env.MONGO_DB_NAME

export async function connectMongoDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      user: USER_NAME,
      pass: PASSWORD,
      dbName: MONGO_DB_NAME,
    })
    logger.info('MongoDB connected')
  }
  catch (err) {
    logger.error('MongoDB connection failed')
    logger.error(err)
    logger.error('MONGO_URI: ', MONGO_URI)
    logger.error('USER_NAME: ', USER_NAME)
    process.exit(1)
  }
}

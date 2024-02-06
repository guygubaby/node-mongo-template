import { streamToResponse } from 'ai'
import { Router } from 'express'
import { respFailed } from 'src/utils/resp'
import { createLogger } from 'src/utils/logger'
import { authMiddleware } from 'src/middlewares/auth'
import { chatProcess, genPayload } from '../chatgpt'

export const chatgptRouter = Router()

const logger = createLogger('chatgpt route')

chatgptRouter.post('/chat/completions', authMiddleware, async (req, res) => {
  try {
    const payload = genPayload(req)
    const stream = await chatProcess(payload)
    streamToResponse(stream, res)
  }
  catch (err) {
    respFailed(res, logger, { err, statusCode: 500, msg: err.message })
  }
})

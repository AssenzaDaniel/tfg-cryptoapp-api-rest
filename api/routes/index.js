import { Router } from 'express'
import { symbolsPerVolumeQuote, searchSymbols } from '../controllers/search.js'
import { HTTP_STATUS } from '../constants.js'

import subscriptionsRoutes from './subscriptions.js'

const router = Router()
router.use('/subscriptions', subscriptionsRoutes)

router.get('/symbols', async (request, response) => {
    const symbols = await symbolsPerVolumeQuote()

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

router.post('/search', async (request, response) => {
    const { email, symbol } = request.body
    const symbols = await searchSymbols(email, symbol)

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

export default router
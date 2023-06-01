import { Router } from 'express'
import { searchSymbols } from '../controllers/search.js'
import { HTTP_STATUS } from '../constants.js'

import subscriptionsRoutes from './subscriptions.js'
import symbolsRoutes from './symbols.js'

const router = Router()

router.use('/subscriptions', subscriptionsRoutes)
router.use('/symbols', symbolsRoutes)

router.post('/search', async (request, response) => {
    const { email, symbol } = request.body
    const symbols = await searchSymbols(email, symbol)

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

export default router
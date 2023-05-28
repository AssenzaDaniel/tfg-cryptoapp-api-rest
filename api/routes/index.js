import { Router } from 'express'
import { symbolsPerVolumeQuote, searchSymbols } from '../controllers/search.js'
import { HTTP_STATUS } from '../constants.js'

const router = Router()

router.get('/24hrsChanges', async (request, response) => {
    const symbols = await symbolsPerVolumeQuote()

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

router.get('/search', async (request, response) => {
    const symbol = request.query.symbol.toUpperCase()
    const symbols = await searchSymbols(symbol)

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

export default router
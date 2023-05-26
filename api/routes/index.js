import { Router } from 'express'
import { symbolsPerVolumeQuote, symbolsSearch } from '../controllers/search.js'

const router = Router()

router.get('/24hrsChanges',async (request, response) => {
    const symbols = await symbolsPerVolumeQuote()

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

router.get('/search',async (request, response) => {
    const symbol = request.query.symbol.toUpperCase()
    const symbols = await symbolsSearch(symbol)

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

export default router
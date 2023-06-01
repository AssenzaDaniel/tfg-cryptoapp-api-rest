import { Router } from 'express'
import { getSymbols, symbolsPerVolumeQuote } from '../controllers/search.js'
import { HTTP_STATUS } from '../constants.js'

const router = Router()

router.get('/', async (request, response) => {
    const symbols = await symbolsPerVolumeQuote()

    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

router.get('/updates', async (request, response) => {
    const requestedSymbols = JSON.parse(request.query.symbols)
    const symbols = await getSymbols(requestedSymbols)
    
    response.contentType('application/json')
    response.send(symbols)
    response.end()
})

export default router
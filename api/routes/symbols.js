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

    response.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    response.flushHeaders()
    response.write('retry: 3000\n\n')

    const event = setInterval(async () => {
        const symbols = await getSymbols(requestedSymbols)
        response.write(`data: ${JSON.stringify(symbols)}\n\n`)
    }, 2000)

    response.on('close', () => {
        clearInterval(event)
        response.end()
    })
})

export default router
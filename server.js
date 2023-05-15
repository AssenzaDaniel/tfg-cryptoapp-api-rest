import Express from 'express'
import Cors from 'cors'

import { get24Hrs } from './services/binance-api/getSymbols.js'

let data = await get24Hrs()
const app = Express()

const corsOptions = {
    origin: 'http://localhost:1616'
}

app.use(Cors(corsOptions))

app.get('/', (request, response) => {
    response.send('Hola mundo!')
    response.end()
})

app.get('/api/24hrsChanges', (request, response) => {
    response.contentType('application/json')
    response.send(data)
    response.end()
})

app.get('/api/search', (request, response) => {

    const searchSymbol = request.query.symbol

    if (!searchSymbol) {
        response.contentType('text')
        response.send('Error en la petición')
        response.end()
    }

    const filteredData = data.filter(symbol => symbol.symbol.match(searchSymbol))

    response.contentType('application/json')
    response.send(filteredData)
    response.end()
})

app.listen(1717)

console.info(`\n\n-- Server running at http://localhost:1717`)

setInterval(async () => data = await get24Hrs(), 5000)
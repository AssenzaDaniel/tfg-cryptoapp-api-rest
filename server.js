import Express from 'express'
import Cors from 'cors'
import fs from 'fs'
import config from './config.js'
import router from './api/routes/index.js'

const app = Express()

const corsOptions = {
    origin: `http://${config.front.dev.hostname}:${config.front.dev.port}`
}

app.use(Cors(corsOptions))
app.use(Express.json())
app.use('/api', router)

app.get('/', (request, response) => {
    response.send('Hola mundo!')
    response.end()
})

app.get('/api/testimage', (request, response) => {
    
    // const icon = fs.readFileSync('./wallet.svg', 'utf-8')
    // const json = { icon }
    // response.contentType('application/json')
    // response.send(json)
    // response.end()

    console.time('cod')
    const image = fs.readFileSync('./wallet.svg', 'base64')
    console.timeEnd('cod')
    const object = { image }
    
    response.contentType('application/json')
    response.send(object)
    response.end()
    // response.sendFile('capt.png', { root: '.' }, () => {
    //     response.end()
    // })
})

app.listen(config.api.dev.port)

console.info(`\n\n-- Server running at http://${config.api.dev.hostname}:${config.api.dev.port}\n`)
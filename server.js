import Express from 'express'
import Cors from 'cors'
import config from './config.js'
import router from './api/routes/index.js'

const app = Express()
const hostname = config.api.hostname
const port = config.api.port

const corsOptions = {
    origin: [
        `http://${config.front.hostname}:${config.front.port}`,
        `http://${config.front.ip}:${config.front.port}`
    ]
}

app.use(Cors(corsOptions))
app.use(Express.json())
app.use('/api', router)

app.listen(config.api.port, config.api.hostname)

console.info(`\n\n-- Server running at http://${hostname}:${port}\n`)
import { Router } from 'express'
import { getSubscriptions, subscribe } from '../services/db-consumer.js'
import { HTTP_STATUS } from '../constants.js'

const router = Router()

router.put('/', async (request, response) => {
    const  { email, symbol } = request.body
    console.log(email, symbol)

    try {
        await subscribe(email, symbol)

    } catch(status) {

        response.statusCode = status
    }

    response.end()
})

router.post('/', async (request, response) => {
    const { email } = request.body
    let subscriptions = null

    try {
        subscriptions = await getSubscriptions(email)

    } catch(status) {

        response.statusCode = status
        response.end()
        return
    }

    response.contentType('application/json')
    response.send(subscriptions)
    response.end()
})

export default router
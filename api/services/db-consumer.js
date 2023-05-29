import { XMLHttpRequest } from 'xmlhttprequest'
import { HTTP_STATUS } from '../constants.js'
import config from '../../config.js'

const API_URL = `http://${config.back.dev.hostname}:${config.back.dev.port}`

const dbConnection = (method, endpoint = '', data = null) => {
    const xhr = new XMLHttpRequest()

    if (data) {
        data = JSON.stringify(data)
    }

    return new Promise((resolve, reject) => {

        xhr.open(method, `${API_URL}${endpoint}`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(data)

        xhr.onload = () => {
            xhr.status === HTTP_STATUS.OK
                ? resolve(xhr.responseText)
                : reject(xhr.status)
        }

        xhr.onerror = () => reject(xhr.status)
    })
}

export const getData = async () => {
    let symbols = await dbConnection('GET', '/symbols')
    symbols = JSON.parse(symbols)
    
    symbols.forEach(symbol => {
        symbol.quoteVolume = Number(symbol.quoteVolume)
        symbol.priceChangePercent = Number(symbol.priceChangePercent).toFixed(2)
        symbol.lastPrice = symbol.lastPrice.substring(0, 8)
    })
    
    return symbols
}

export const subscribe = async (email, symbol) => {
    return dbConnection('PUT', '/subscriptions', { email, symbol })
}

export const getSubscriptions = async (email) => {
    const subscriptions = await dbConnection('POST', '/subscriptions', { email })

    return JSON.parse(subscriptions)
}
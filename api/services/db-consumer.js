import { XMLHttpRequest } from 'xmlhttprequest'
import config from '../../config.js'

const API_URL = `http://${config.back.dev.hostname}:${config.back.dev.port}`

const dbConnection = (method, endpoint = '', data = null) => {
    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {

        xhr.open(method, `${API_URL}${endpoint}`)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(data)

        xhr.onload = () => resolve(JSON.parse(xhr.responseText))
        xhr.onerror = () => reject(xhr.status)
    })
}

export const getData = async () => {
    const symbols = await dbConnection('GET', '/getSymbols')
    symbols.forEach(symbol => symbol.quoteVolume = Number(symbol.quoteVolume))
    
    return symbols
}

export const connectionTest = async () => {
    return dbConnection('GET')
}
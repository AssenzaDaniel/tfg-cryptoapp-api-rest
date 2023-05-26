import { XMLHttpRequest } from 'xmlhttprequest'
import config from '../../config.js'

const API_URL = `http://${config.back.dev.hostname}:${config.back.dev.port}`

const dbConnection = (method, endpoint = '', data = null) => {

    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {

        xhr.open(method, `${API_URL}${endpoint}`)
        xhr.send(data)

        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.responseXML)
    })
}

export const getData = async () => {
    let result = await dbConnection('GET', '/getSymbols')
    
    result = JSON.parse(result)
        .map(symbol => { 
            return { ...symbol, quoteVolume: Number(symbol.quoteVolume) }
        })

    console.log(result.length);
    console.log(result.filter(sym => sym.quoteVolume === 0).length);

    return result
}

export const connectionTest = async () => {
    return dbConnection('GET')
}
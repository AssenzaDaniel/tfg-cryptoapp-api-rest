import { XMLHttpRequest } from 'xmlhttprequest'
import { HTTP_STATUS } from '../constants.js'
import config from '../../config.js'

const API_URL = `http://${config.back.hostname}:${config.back.port}`

/**
 * 
 * @param {String} method Método de la petición
 * @param {String} endpoint Endpoint del backend
 * @param {JSON} data Data to send in the petition
 * @returns 
 */
const request = (method, endpoint = '', data = null) => {
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

/**
 * Obtiene los simbolos desde el back y formatea los datos según la necesidad
 * @returns {Array<JSON>}
 */
export const getData = async () => {
    let symbols = await request('GET', '/symbols')
    symbols = JSON.parse(symbols)
    
    symbols.forEach(symbol => {
        symbol.quoteVolume = Number(symbol.quoteVolume)
        symbol.priceChangePercent = Number(symbol.priceChangePercent).toFixed(2)
        symbol.lastPrice = symbol.lastPrice.substring(0, 8)
    })
    
    return symbols
}

/**
 * @param {String} email Correo del usuario
 * @param {String} symbol Simbolo al que realizar la subscripción
 * @returns {HTTP_STATUS} 404 si falla la subscripción en el backend
 */
export const subscribe = async (email, symbol) => {
    return request('PUT', '/subscriptions', { email, symbol })
}

/**
 * @param {String} email Correo del usuario
 * @returns {Array<String>} Simbolos a los que el usuario esta subscrito
 */
export const getSubscriptions = async (email) => {
    const subscriptions = await request('POST', '/subscriptions', { email })

    return JSON.parse(subscriptions)
}

export const logUser = async (userData) => {
    return request('PUT', '/users', userData)
}
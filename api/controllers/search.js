import { appendIcons, orderByVolume, appendFavorites } from '../utils/data-filters.js'
import { getData, getSubscriptions } from '../services/db-consumer.js'

import fs from 'fs'

/**
 * Devuelve un array con la información de todos los simbolos
 * @returns {Promise<JSON>}
 */
export const getAllSymbols = async () => {
    return await getData()
}

/**
 * Busca los simbolos que contengan el símbolo
 * @param {String} email Correo del usuario
 * @param {String} symbol Símbolo a buscar
 * @returns {Array<JSON>}
 */
export const searchSymbols = async (email, symbol) => {
    console.time('search')

    const favorites = await getSubscriptions(email)
    let symbols = await getData()

    symbols = symbols.filter(element => element.symbol.includes(symbol))
    symbols = orderByVolume(symbols, 30)
    appendIcons(symbols)
    appendFavorites(symbols, favorites)

    console.timeEnd('search')
    return symbols
}

/**
 * Devuelve los primeros 20 pares USDT con mayor volumen las últimas
 * 24hrs ordenados de descendentemente
 * @returns {Array<JSON>}
 */
export const symbolsPerVolumeQuote = async () => {
    console.time('volume')
    let symbols = await getData()

    const symbolsName = fs.readFileSync('api/coin-map.json')
    const json = JSON.parse(symbolsName)

    symbols = symbols.filter(symbol => symbol.symbol.endsWith('USDT'))
    symbols = orderByVolume(symbols, 20)

    symbols.forEach(symbol => {
        const coinSymbol = symbol.symbol.replace('USDT', '')
        const coinName = json.find(element => element.symbol === coinSymbol)

        symbol.name = coinName ? coinName.name : null
    })
    appendIcons(symbols)

    console.timeEnd('volume')
    return symbols
}

/**
 * Devuelve los datos actualizados de los símbolos solicitados
 * @param {Array<String>} requestedSymbols simbolos a buscar
 * @returns {Array<JSON>}
 */
export const getSymbols = async (requestedSymbols) => {
    const symbols = await getData()

    return symbols.filter(symbol => requestedSymbols.includes(symbol.symbol))
}

/**
 * Devuelve los simbolos a los que esta subscrito el usuario
 * @param {String} email correo del usuario
 * @returns {Array<String>}
 */
export const getSubscriptionsSymbols = async (email) => {
    const subscriptions = await getSubscriptions(email)
    const symbols = await getSymbols(subscriptions)
    appendIcons(symbols)

    return symbols
}
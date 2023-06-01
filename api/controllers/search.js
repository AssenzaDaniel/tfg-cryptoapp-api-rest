import { appendIcons, orderByVolume, appendFavorites } from '../utils/data-filters.js'
import { getData, getSubscriptions } from '../services/db-consumer.js'

import fs from 'fs'

export const getAllSymbols = async () => {
    return await getData()
}

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

export const getSymbols = async (requestedSymbols) => {
    const symbols = await getData()

    return symbols.filter(symbol => requestedSymbols.includes(symbol.symbol))
}

export const getSubscriptionsSymbols = async (email) => {
    const subscriptions = await getSubscriptions(email)
    const symbols = await getSymbols(subscriptions)
    appendIcons(symbols)

    return symbols
}
import { appendIcons, orderByVolume } from '../utils/data-filters.js'
import { getData } from '../services/db-consumer.js'

export const getAllSymbols = async () => {
    return await getData()
}

export const searchSymbols = async (symbol) => {
    console.time('search')
    let symbols = await getData()

    symbols = symbols.filter(element => element.symbol.includes(symbol))
    symbols = orderByVolume(symbols, 30)
    appendIcons(symbols)

    console.timeEnd('search')
    return symbols
}

export const symbolsPerVolumeQuote = async () => {
    console.time('volume')
    let symbols = await getData()

    symbols = symbols.filter(symbol => symbol.symbol.endsWith('USDT'))
    symbols = orderByVolume(symbols, 10)
    symbols.forEach(symbol => {
        symbol.symbol = symbol.symbol.replace('USDT', '')
    })
    appendIcons(symbols)

    console.timeEnd('volume')
    return symbols
}
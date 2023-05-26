import { orderByVolume } from '../services/data-filters.js'
import { getData } from '../services/db-consumer.js'

export const getAllSymbols = async () => {
    return await getData()
}

export const searchSymbols = async (symbol) => {
    console.time('search')
    const symbols = await getData()

    let result = symbols.filter(element => element.symbol.includes(symbol))
    result = orderByVolume(result, 30)

    console.timeEnd('search')

    return result
}

export const symbolsPerVolumeQuote = async () => {
    console.time('volume')
    const symbols = await getData()

    let result = symbols.filter(symbol => symbol.symbol.endsWith('USDT'))
    result = orderByVolume(result, 10)

    result = result.map(symbol => {
        const name = symbol.symbol.replace('USDT', '')
        return { ...symbol, symbol: name }
    })
    console.timeEnd('volume')

    return result
}
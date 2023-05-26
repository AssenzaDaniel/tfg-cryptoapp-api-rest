export const orderByVolume = (data, limit = null, ascendingOrder = false) => {
    
    const order = ascendingOrder 
        ? (a, b) => a.quoteVolume - b.quoteVolume 
        :  (a, b) => b.quoteVolume - a.quoteVolume

    const result = data.sort(order)

    return limit ? result.slice(0, limit) : result
}

function getData(responseString) {

    // Convierto String a JSON.
    let data = JSON.parse(responseString)

    // Valores que terminen por el symbol dado por parámetro.
    let dataResult = searchEndsWithSymbol(data, '')

    const pairs = dataResult.map(pair => pair.symbol.replace('USDT', ''))
    let euroPrice = data.find(pair => pair.symbol.startsWith('EURUSDT')).lastPrice

    dataResult.forEach(pair => console.log(`${pair.symbol} - € ${pair.lastPrice / euroPrice} $ ${pair.lastPrice}`))

    return dataResult
}

// Visualiza los valores que empiezen por el symbol dado por parámetro.
function searchStartsWithSymbol(data, symbol) {
    // Array de resultados.
    let result = []
    for (const iterator of data) {
        // Que empiece por symbol.
        if (iterator.symbol.startsWith(symbol)) {
            result.push(iterator)
        }
    }

    return result
}

// Visualiza los valores que terminen por el symbol dado por parámetro.
function searchEndsWithSymbol(data, symbol) {
    // Array de resultados.
    let result = []
    for (const iterator of data) {
        // Que empiece por symbol.
        if (iterator.symbol.endsWith(symbol)) {
            result.push(iterator)
        }
    }

    return result
}

// Visualiza los valores que contengan el symbol dado por parámetro.
function searchIncludesSymbol(data, symbol) {
    // Array de resultados.
    let result = []
    for (const iterator of data) {
        // Que incluya symbol.
        if (iterator.symbol.includes(symbol)) {
            result.push(iterator)
        }
    }

    return result
}

// Ordena el Array dado por parámetro (SOLO NÚMEROS).
function highSymbols(data, action, quantity) {
    if (action == 1) {
        data = data.sort((a, b) => a.lastPrice - b.lastPrice)
    } else {
        data = data.sort((a, b) => b.lastPrice - a.lastPrice)
    }

    return data.slice(0, quantity)
}
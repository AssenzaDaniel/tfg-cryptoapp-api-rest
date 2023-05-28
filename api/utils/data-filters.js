import fs from 'fs'

export const orderByVolume = (data, limit = null, ascendingOrder = false) => { 
    const order = ascendingOrder 
        ? (a, b) => a.quoteVolume - b.quoteVolume 
        :  (a, b) => b.quoteVolume - a.quoteVolume

    data.sort(order)

    return limit ? data.slice(0, limit) : data
}

export const appendIcons = (symbols) => {
    symbols.forEach( symbol => {
        let icon
        try {
            icon = fs.readFileSync(`assets/icons/color/${symbol.symbol}.svg`, 'base64')
            
        } catch {
            
            icon = fs.readFileSync('assets/icons/generic-crypto.svg', 'base64')
        }

        symbol.icon = icon
    })
}
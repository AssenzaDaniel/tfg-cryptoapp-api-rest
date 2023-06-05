import { log } from 'console'
import fs from 'fs'

export const orderByVolume = (data, limit = null, ascendingOrder = false) => { 
    const order = ascendingOrder 
        ? (a, b) => a.quoteVolume - b.quoteVolume 
        :  (a, b) => b.quoteVolume - a.quoteVolume

    data.sort(order)

    return limit ? data.slice(0, limit) : data
}

export const appendIcons = (symbols) => {
    const iconsNames = obtainPossibleIconName(symbols)
    let index = 0

    symbols.forEach(symbol => {

        const names = iconsNames[index++].possibleNames
        let icon = null

        names.forEach(name => {

            if (fs.existsSync(`assets/icons/color/${name}.svg`)) {
                icon = fs.readFileSync(`assets/icons/color/${name}.svg`, 'base64')
                return
            }
        })

        if (!icon) 
            icon = fs.readFileSync('assets/icons/generic-crypto.svg', 'base64')
        
        symbol.icon = icon
    })
}

/**
 * 
 * @param { JSON } symbols 
 * @param { Array<String> } favorites 
*/
export const appendFavorites = (symbols, favorites) => {
    
    symbols.forEach(symbol => {
        if (favorites.includes(symbol.symbol))
            symbol.favorite = true
    })
}

const obtainPossibleIconName = (symbols) => {
    const names = []
    symbols.forEach(symbol => {
        const name = symbol.symbol.toLowerCase()

        names.push({
            name,
            possibleNames: [
                name,
                name.substring(0, 3),
                name.substring(0, 4),
                name.substring(0, 5),
            ]
        })
    })

    return names
}
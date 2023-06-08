import { getSymbolIcon } from './icons-helper.js'

/**
 * @param {Array<JSON>} data Simbolos que recibe del backend
 * @param {Number} limit Número límite que se van a extraer
 * @param {Boolean} ascendingOrder Orden ascendiente
 * @returns {Array<JSON>} Simbolos ya tratados
 */
export const orderByVolume = (data, limit = null, ascendingOrder = false) => { 
    const order = ascendingOrder 
        ? (a, b) => a.quoteVolume - b.quoteVolume 
        :  (a, b) => b.quoteVolume - a.quoteVolume

    data.sort(order)

    return limit ? data.slice(0, limit) : data
}

/**
 * Añade los íconos en base64 a los símbolos
 * @param {Array<JSON>} symbols Simbolos a los que añadir los iconos
 */
export const appendIcons = (symbols) => {

    symbols.forEach(symbol => {
        const possibleIcons = obtainPossibleIconName(symbol.symbol)
        const icon = getSymbolIcon(possibleIcons)

        symbol.icon = icon
    })
}

/**
 * Añade el atributo favorite a los símbolos marcados como favoritos
 * @param { JSON } symbols Símbolos a los que añadir si es favorito
 * @param { Array<String> } favorites Símbolos que son favortios del usuario
*/
export const appendFavorites = (symbols, favorites) => {
    
    symbols.forEach(symbol => {
        if (favorites.includes(symbol.symbol))
            symbol.favorite = true
    })
}

/**
 * Devuelve un Array los posibles nombres de los íconos para el símbolo
 * @param {String} symbol Símbolo
 * @returns {Array<String>}
 */
const obtainPossibleIconName = (symbol) => {
    const names = [
        symbol,
        symbol.substring(0, 3),
        symbol.substring(0, 4),
        symbol.substring(0, 5),
    ]

    return names
}
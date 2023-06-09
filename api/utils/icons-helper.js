import fs from 'fs'

/**
 * Busca el ícono del símbolo y lo devuelve codificado en base64
 * @param {String} symbol Simbolo a buscar el ícono
 * @returns {String} Ícono del simbolo o el genérico si no existiese
 */
export const getSymbolIcon = (names) => {
    let icon
    
    for (const name of names) {
        if (fs.existsSync(`api/static/icons/color/${name.toLowerCase()}.svg`)) {
            icon = fs.readFileSync(`api/static/icons/color/${name.toLowerCase()}.svg`, 'base64')
            break
        }
    }

    return icon ? icon : fs.readFileSync(`api/static/icons/generic-crypto.svg`, 'base64')
}
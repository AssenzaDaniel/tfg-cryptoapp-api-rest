import fs from 'fs'

/**
 * Genera un archivo json con todos los iconos, en base64, de las íconos de los symbolos disponibles
 */
export const generateJSONIcons = async () => {
    const icons = []
    const files = fs.readdirSync('api/static/icons/color')
    
    files.forEach(file => {
        const icon = fs.readFileSync(`api/static/icons/color/${file}`, 'base64')
        const data = {
            symbol: file.replace('.svg', '').toUpperCase(),
            icon
        }

        icons.push(data)
    })

    const genericIcon = fs.readFileSync('api/static/icons/generic-crypto.svg', 'base64')
    icons.push({ symbol: 'generic', icon: genericIcon })

    fs.writeFileSync('api/static/icons/base64-icons.json', JSON.stringify(icons))
}

/**
 * Busca el ícono del símbolo y lo devuelve codificado en base64
 * @param {String} symbol Simbolo a buscar el ícono
 * @returns {String} Ícono del simbolo o el genérico si no existiese
 */
export const getSymbolIcon = (names) => {
    const file = fs.readFileSync('api/static/icons/base64-icons.json')
    const icons = JSON.parse(file)

    let icon
    
    for (const name of names) {
        icon = icons.find(icon => icon.symbol === name)

        if (icon) break
    }

    return icon ? icon.icon : icons.find(icon => icon.symbol === 'generic').icon
}
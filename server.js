const Express = require('express')
const app = Express()

app.use('/', (request, response) => {
    response.send('Hola mundo!')
    response.end()
})

app.listen(1717, () => {
    console.log(`\n\n-- Server Running at http://localhost:1717`)
})
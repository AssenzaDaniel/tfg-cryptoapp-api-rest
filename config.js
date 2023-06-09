import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(`${process.env.NODE_ENV}.env`)
})

const config = {
    api: {
        hostname: process.env.HOST,
        ip: process.env.IP,
        port: process.env.PORT
    },

    back: {
        hostname: process.env.BACK_HOST,
        port: process.env.BACK_PORT
    },

    front: {
        hostname: process.env.FRONT_HOST,
        port: process.env.FRONT_PORT
    }
}

export default config
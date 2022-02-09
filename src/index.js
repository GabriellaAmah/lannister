import express, {json} from 'express'
import dotenv from 'dotenv'
import router from './routes'

async function startServer() {
    dotenv.config()

    const app = express()

    app.use(json())
    app.use(router)

    app.use((error, req, res, next) => {
        if(error){
           console.log(error)
            let statusCode = error.statusCode || 422  
            res.status(statusCode).json({
                code : statusCode,
                success : false,
                message : error.message
            })
        }
        next()
    })

    app.listen(process.env.PORT, () => console.log(`server running on ${process.env.PORT}`))
}

startServer()

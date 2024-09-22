import express, { request, response } from "express"
import {PORT, mongodbURL} from "./config.js"
import mongoose from "mongoose"
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


const app = express()
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get('/', (request, response) => {
    console.log("request: ", request)
    return response.status(234).send("Welcome to my book store")
})

app.use('/books', booksRoute)

mongoose.connect(mongodbURL)
    .then(()=>{
        console.log("Connected to database!")
        app.listen(PORT, ()=>{
            console.log(`App is listenting to port ${PORT}🚀`)
        })
    }).catch((e)=>{
        console.error(e)
    })
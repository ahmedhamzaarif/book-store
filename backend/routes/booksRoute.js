import express from 'express'
const router  = express.Router()
import { Book } from '../models/bookModel.js';

router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await Book.create(newBook)
        return response.status(201).send(book)
    } catch (e){
        console.error(e.message)
        response.status(500).send({message: e.message})
    }
})

// Get All Books
router.get('/', async (request, response)=>{
    try{
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (e){
        console.error(e.message)
    }
});

// Get Single Book
router.get('/:id', async (request, response)=>{
    try{
        const {id} = request.params
        const book = await Book.findById(id)
        return response.status(200).json(book)
    } catch (e){
        console.error(e.message)
    }
});

// Update Book
router.put('/:id', async (request, response)=>{
    try{
        const {id} = request.params
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        // Attempt to update the book
        const updatedBook = await Book.findByIdAndUpdate(id, request.body)
        if(!updatedBook){
            return response.status(404).json({message: "Book not found"});
        }

        // Attempt to update the book
        return response.status(200).send({message: "Book Updated Successfully!"});
    } catch (e){
        console.log(e.message)
        response.status(500).send({message: e.message})
    }
})

// Delete a book
router.delete('/:id', async(request, response)=>{
    try{
        const {id} = request.params
        const deletedBook = await Book.findByIdAndDelete(id)

        if(!deletedBook){
            return response.status(404).json({message: 'Book not found'})
        }

        return response.status(200).send({message: "Book Deleted Successfully!"})

    } catch(e){
        console.log(e.message)
        return response.status(500).send({message: e.message})
    }
})

export default router
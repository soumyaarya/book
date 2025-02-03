const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } = require('./book.controller');
const verifyAdmin = require('../middleware/verifyAdminToken');
const router = express.Router();
//frontend=>backend server=>controller=>book Schema=>database=>send to the server=>back to frontend
//post a book
//post =when submit something from frontend to db
//get = when get something back from db
//put = when edit or update something
//delete = when delete something
router.post("/create-book",verifyAdmin,postABook)
//get all books
router.get("/",getAllBooks) 
//single book endpoint
router.get("/:id",getSingleBook)
//update a book endpoint
router.put("/edit/:id",verifyAdmin,updateBook)
//delete a book
router.delete('/:id',verifyAdmin,deleteABook)
module.exports = router

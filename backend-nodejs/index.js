const express= require('express');
const bodyParser= require('body-parser');
const cors=require('cors');
const mongoose= require('mongoose');
const Book =require('./models/Book')
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/books');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
router.route('/books').get((req, res) => {
    Book.find((err, books) => {
        if (err)
            console.log(err);
        else
            res.json(books);
    });
});
router.route('/books/:id').get((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err)
            console.log(err);
        else
            res.json(book);
    });
});
router.route('/books/add').post((req, res) => {
    let book = new Book(req.body);
    book.save()
        .then(book => {
            res.status(200).json({'book': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
router.route('/books/update/:id').post((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (!book)
            return next(new Error('Could not load document'));
        else {
            book.name = req.body.name;
            book.author = req.body.author;
            book.language = req.body.language;
            book.yearofpublication = req.body.yearofpublication;
            

            book.save().then(book => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
router.route('/books/delete/:id').get((req, res) => {
    Book.findByIdAndRemove({_id: req.params.id}, (err, book) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})
app.use('/', router);
app.listen(8000, () => console.log('Express server running on port 8000'));
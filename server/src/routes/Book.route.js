const express = require('express');
const router = express.Router();
const bookController = require('../controllers/Book.controller');;
const multer = require('multer');

// const AzureStorageBlob = require("@azure/storage-blob");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // https://baha21storage.blob.core.windows.net/book-store
        cb(new Error('only type jpeg or png'), false);
    }
};

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

router.get('/', bookController.getAllBooks);
router.get('/:BookId', bookController.getBook);
router.post('/', upload.single('coverUrl'), bookController.postBook);
router.patch('/:BookId', bookController.updateBook);
router.delete('/:BookId', bookController.deleteBook);
router.delete('/', bookController.deleteAllBooks);

module.exports = router;
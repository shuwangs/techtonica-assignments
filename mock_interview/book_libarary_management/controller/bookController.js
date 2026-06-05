import { books } from "../data/books.js";
// TODOS
export const addBook = async (req, res) => {
    console.log("addBook is called.");
    try {
        const { title, author, isbn, copiesAvailable, estimatedValue } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title cannot be empty",
            });
        }

        if (!author || author.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Author cannot be empty",
            });
        }
        if (!isbn || isbn.length !== 13) {
            return res.status(400).json({
                success: false,
                message: "ISBN must be 13 characters",
            });
        }

        const existingBook = books.find((book) => book.isbn === isbn);
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "ISBN must be unique",
            });
        }
        if (copiesAvailable < 0) {
            return res.status(400).json({
                success: false,
                message: "Copies cannot be negative",
            });
        }

        const newBook = {
            id: Date.now(),
            title,
            author,
            isbn,
            copiesAvailable,
            totalCopies: copiesAvailable,
            borrowHistory: [],
            createdAt: new Date(),
        };
        books.push(newBook);

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: newBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add book"
        })
    }
}

//  getAllBooks
export const getAllBooks = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            data: books
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed from getAllBooks"
        })
    }

}

export const getOutStockBooks = async (req, res) => {
    console.log("getOutStockBooks is called.");

    try {
        const result = books.filter((book) => book.availableCopies === 0)
        console.log("getOutStockBooks: ", result);

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed from getOutStockBooks"
        })
    }

}

export const getBooksByAuthor = async (req, res) => {
    console.log("getBooksByAuther is called.");

    try {
        const { name } = req.query;
        const result = books.filter(
            (book) =>
                book.author.toLowerCase() === name.toLowerCase()
        );

        res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get books by author",
        });
    }
}

export const borrowBook = async (req, res) => {
    console.log("borrowBook is called.");
    try {


        const { id } = req.params;
        const { borrowerName } = req.body;
        // find book
        const book = books.find(
            (book) => book.id === Number(id)
        );

        // check if book exists
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        // check available copies
        if (book.availableCopies === 0) {
            return res.status(400).json({
                success: false,
                message: "Book out of stock",
            });
        }
        // decrease available copies
        book.availableCopies -= 1;

        // add borrow history
        book.borrowHistory.push({
            borrowerName,
            borrowedAt: new Date(),
            returnedAt: null,
            status: "BORROWED",
        });

        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get books by author",
        });
    }
}

export const returnBook = async (req, res) => {
    console.log("returnBook is called.");
}

export const getBorrowHistory = async (req, res) => {
    console.log("borrowHistory is called.");
}

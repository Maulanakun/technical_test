const { Book, Borrow } = require("../models");

class ControllerBook {
  static async readAllBook(req, res) {
    try {
      let dataBook = await Book.findAll({
        include: [
          {
            model: Borrow,
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      });
      const result = dataBook
        .map((book) => {
          const bookData = book.toJSON();
          bookData.Borrows = bookData.Borrows.length;
          bookData.stock = bookData.stock - bookData.Borrows;
          if (bookData.stock - bookData.Borrows !== 0) {
            return bookData;
          }
        })
        .filter((book) => book !== undefined);
      console.log();
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ControllerBook;

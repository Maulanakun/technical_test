const { Book, Member, Borrow } = require("../models");

class ControllerBorrow {
  static async borrowBook(req, res) {
    try {
      const { bookId } = req.params;

      const { sessionid } = req.headers;
      console.log(sessionid);
      const getBook = await Book.findByPk(bookId, {
        include: [
          {
            model: Borrow,
          },
        ],
      });
      if (!getBook) {
        throw new Error("Book not found");
      }
      if (getBook.Borrows.length > 0) {
        throw new Error("Book is borrowed");
      }

      const getMember = await Member.findByPk(sessionid, {
        include: [
          {
            model: Borrow,
          },
        ],
      });
      if (!getMember) {
        throw new Error("Member not found");
      }
      if (getMember.penalty && getMember.limitPenalty > new Date()) {
        throw new Error("you are still under sanction");
      } else {
        await Member.update(
          {
            penalty: false,
            limitPenalty: null,
          },
          {
            where: {
              id: sessionid,
            },
          }
        );
      }
      if (getMember.Borrows.length === 2) {
        throw new Error("limit to borrow book max 2");
      }

      let currentDate = new Date();
      let dueDate = currentDate.setDate(currentDate.getDate() + 7);
      let addBorrow = await Borrow.create({
        bookId,
        memberId: sessionid,
        limitBorrow: dueDate,
      });

      await getBook.update(
        {
          stock: getBook.stock - 1,
        },
        {
          where: {
            id: bookId,
          },
        }
      );
      res.status(201).json({ message: "success to borrow" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  static async returnBook(req, res) {
    try {
      const { bookId } = req.params;

      const { sessionid } = req.headers;
      let borrowedBook = await Borrow.findOne({
        where: {
          bookId,
          memberId: sessionid,
        },
      });

      if (!borrowedBook) {
        throw new Error("not found");
      }

      if (borrowedBook.limitBorrow < new Date()) {
        let currentDate = new Date();
        let dueDate = currentDate.setDate(currentDate.getDate() + 3);
        await Member.update(
          {
            penalty: true,
            limitPenalty: dueDate,
          },
          {
            where: { id: sessionid },
          }
        );
        await Borrow.destroy({
          where: {
            bookId,
            memberId: sessionid,
          },
        });
        return res
          .status(201)
          .json({ message: "sucees to return book but you got penalty" });
      }

      await Borrow.destroy({
        where: {
          bookId,
          memberId: sessionid,
        },
      });
      const getBook = await Book.findByPk(bookId, {
        include: [
          {
            model: Borrow,
          },
        ],
      });
      await getBook.update(
        {
          stock: getBook.stock - 1,
        },
        {
          where: {
            id: bookId,
          },
        }
      );
      res.status(201).json({ message: "sucees to return" });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

module.exports = ControllerBorrow;

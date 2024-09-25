const { Member, Borrow } = require("../models");

class ControllerMember {
  static async readMember(req, res) {
    try {
      let dataMember = await Member.findAll({
        include: [
          {
            model: Borrow,
            attributes: {
              exclude: ["id"],
            },
          },
        ],
      });
      const result = dataMember.map((member) => {
        const memberData = member.toJSON();
        memberData.Borrows = memberData.Borrows.length;
        return memberData;
      });
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ControllerMember;

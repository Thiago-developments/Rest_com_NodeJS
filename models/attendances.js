const { json } = require("body-parser");
const moment = require("moment");
const connection = require("../infrastructure/connection");
class Attendance {
  add(attendance, res) {
    const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(attendance.date, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS'
    );

    const validDate = moment(date).isSameOrAfter(creationDate);
    const validCustomer = attendance.customer.length >= 5

    const validations = [
      {
        name:'date',
        valid: validDate ,
        message: 'Date must be equal or bigger than current date'
      },
      {
        name:'customer',
        valid : validCustomer,
        message: 'Customer must have at least five characters'
      }
    ]
    const errors = validations.filter(field => !field.valid)

    if (errors.length) {
      res.status(400).json(errors)
    }else{
      const datedAttendance = { ...attendance, creationDate, date };
    
      const sql = 'INSERT INTO Attendance SET ? '

      connection.query(sql, datedAttendance, (erro, results) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(results);
      }
    });
    }

    
  }
}
module.exports = new Attendance();

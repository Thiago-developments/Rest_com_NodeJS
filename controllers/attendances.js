const Attendance = require("../models/attendances");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    res.send("GET atendimentos");
  });

  app.post("/atendimentos", (req, res) => {
    const attendance = req.body
    Attendance.add(attendance)
    res.send("POST atendimentos");
  });
};

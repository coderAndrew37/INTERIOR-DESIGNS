const contacts = require("../routes/contacts.js");
const newsletter = require("../routes/newsletter.js");
module.exports = function (app) {
  app.use("/api/contacts", contacts);
  app.use("/api/newsletter", newsletter); // Added the newsletter route
};

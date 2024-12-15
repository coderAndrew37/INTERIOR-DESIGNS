const contacts = require("../routes/contacts.js");
const newsletter = require("../routes/newsletter.js");
const leads = require("../routes/leads.js");
module.exports = function (app) {
  app.use("/api/contacts", contacts);
  app.use("/api/newsletter", newsletter); // Added the newsletter route
  app.use("/api/leads", leads); // Added the leads route
};

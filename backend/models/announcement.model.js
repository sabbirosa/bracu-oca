const dbConnect = require("../config/dbConfig");

const announcementCollection = dbConnect.db("BRACU_OCA").collection("announcements");

module.exports = announcementCollection;
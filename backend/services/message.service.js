const messageCollection = require("../models/message.model");

const getMessages = async (clubMail) => {
  return await messageCollection
    .find({
      $or: [
        { receiverEmail: clubMail, senderEmail: "oca@bracu.ac.bd" },
        { senderEmail: clubMail, receiverEmail: "oca@bracu.ac.bd" },
      ],
    })
    .sort({ date: 1, time: 1 })
    .toArray();
};

const sendMessage = async (messageInfo) => {
  return await messageCollection.insertOne(messageInfo);
};

module.exports = {
  getMessages,
  sendMessage,
};
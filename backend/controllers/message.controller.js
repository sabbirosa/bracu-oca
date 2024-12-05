const messageService = require("../services/message.service");

const getMessages = async (req, res) => {
  const clubMail = req.params.clubMail;
  try {
    const messages = await messageService.getMessages(clubMail);
    res.json(messages);
  } catch (error) {
    res.status(500).send("Error fetching messages");
  }
};

const sendMessage = async (req, res) => {
  const messageInfo = req.body;
  try {
    const result = await messageService.sendMessage(messageInfo);
    res.send(result);
  } catch (error) {
    res.status(500).send("Error sending message");
  }
};

module.exports = {
  getMessages,
  sendMessage,
};


const chatService = require('../services/chat.service');

exports.chatController = async (req, res, next) => {
  try {
    const { sessionId, query } = req.body;
    const result = await chatService.handleChat(sessionId, query);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

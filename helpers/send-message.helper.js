const sendMessage = (wss, message) => {
  wss.clients.forEach((c) => {
    c.send(JSON.stringify(message));
  });
};

module.exports = sendMessage;

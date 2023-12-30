import io from "./server.js";

const documents = [
  {
    name: "Javascript",
    text: "javascript",
  },
  {
    name: "Nodejs",
    text: "nodejs",
  },
  {
    name: "Socket.io",
    text: "socket.io",
  },
];

io.on("connection", (socket) => {
  socket.on("enter", (document, callBack) => {
    socket.join(document);

    const matchDocument = getDocument(document);

    if (matchDocument) {
      callBack(matchDocument.text);
    }
  });
  socket.on("send", (value, document) => {
    const matchDocument = getDocument(document);
    if (matchDocument) {
      matchDocument.text = value;
      socket.to(document).emit("send:receive", value);
    }

    console.log(matchDocument);
  });
});

const getDocument = (name) => {
  const document = documents.find(
    (doc) => doc.name.toLowerCase() === name.toLowerCase()
  );
  return document;
};

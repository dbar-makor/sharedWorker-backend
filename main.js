// Initializing binance API
const Binance = require("node-binance-api");
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET_KEY
});

// Creating a new websocket server
const WebSocketServer = require("ws");
const wss = new WebSocketServer.Server({ port: 8080 });

// Creating connection using websocket
wss.on("connection", (ws) => {
  console.log("new client connected");

  // sending message
  ws.on("message", (data) => {
    console.log(`Client has sent us: ${data}`);
  });

  let BTC = {};
  let ETH = {};
  let BCH = {};
  let LTC = {};
  let XTZ = {};
  let LINK = {};
  let XMR = {};
  let ADA = {};
  let FTM = {};
  let ALICE = {};

  // Retrieving data from binance API and emit to client
  binance.futuresBookTickerStream("BTCUSDT", (data) => {
    BTC = data;
  });
  binance.futuresBookTickerStream("ETHUSDT", (data) => {
    ETH = data;
  });
  binance.futuresBookTickerStream("BCHUSDT", (data) => {
    BCH = data;
  });
  binance.futuresBookTickerStream("LTCUSDT", (data) => {
    LTC = data;
  });
  binance.futuresBookTickerStream("XTZUSDT", (data) => {
    XTZ = data;
  });
  binance.futuresBookTickerStream("LINKUSDT", (data) => {
    LINK = data;
  });
  binance.futuresBookTickerStream("XMRUSDT", (data) => {
    XMR = data;
  });
  binance.futuresBookTickerStream("ADAUSDT", (data) => {
    ADA = data;
  });
  binance.futuresBookTickerStream("FTMUSDT", (data) => {
    FTM = data;
  });
  binance.futuresBookTickerStream("ALICEUSDT", (data) => {
    ALICE = data;
  });

  setInterval(() => {
    const data = JSON.stringify({
      BTC,
      ETH,
      BCH,
      LTC,
      XTZ,
      LINK,
      XMR,
      ADA,
      FTM,
      ALICE
    });

    ws.send(data);
  }, 100);

  // handling what to do when clients disconnects from server
  ws.on("close", () => {
    console.log("the client has connected");
  });
  // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});

console.log("The WebSocket server is running on port 8080");

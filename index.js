const express = require("express");
const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server);
const bluetooth = require("bluetooth-serial-port");

const app = express();
const port = 3000;

// 블루투스 통신 관련 코드
const serialPort = new bluetooth.BluetoothSerialPort();

// 웹 소켓 설정
io.on("connection", (socket) => {
  console.log("웹 소켓 연결됨");

  // 데이터 수신 이벤트 핸들러
  serialPort.on("data", (buffer) => {
    const data = buffer.toString("utf-8");
    console.log("블루투스에서 수신한 데이터:", data);

    // 수신한 데이터를 클라이언트로 전송
    socket.emit("bluetoothData", data);
  });

  // 클라이언트로부터의 메시지 수신
  socket.on("clientMessage", (message) => {
    console.log("클라이언트에서 수신한 메시지:", message);

    // 메시지를 블루투스로 전송
    serialPort.write(new Buffer(message, "utf-8"), (err, bytesWritten) => {
      if (err) {
        console.error("데이터 전송 오류:", err);
      } else {
        console.log("블루투스로 전송 성공, 전송된 바이트 수:", bytesWritten);
      }
    });
  });
});

// Express 서버
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.on("request", app);
server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

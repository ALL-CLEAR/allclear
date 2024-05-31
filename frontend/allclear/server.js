import express from "express";
import http from "http";
import rtspRelay from "rtsp-relay";

const app = express();
const server = http.createServer(app);

const { proxy, scriptUrl } = rtspRelay(app, server);

app.ws("/api/stream", proxy({ url: "rtsp://43.200.5.209:5002/mystream" })); // rtsp주소(여기에 젯슨나노) 바꿔야함, 그리고 클라이언트 주소도 바꿔야할듯(굳이?)

app.get("/", (req, res) =>
  res.send(`
    <canvas id='canvas'></canvas>
    <script src='${scriptUrl}'></script>
    <script>
      loadPlayer({
        url: 'ws://' + location.host + '/api/stream',
        canvas: document.getElementById('canvas')
      });
    </script>
  `)
);

server.listen(5002, () => {
  console.log("Server is listening on port 5002");
});

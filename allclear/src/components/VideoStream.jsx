import React, { useCallback, useRef, useState, useEffect } from "react";

const VideoStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    fetch("ws://k10b302.p.ssafy.io:30203/ws")
      .then((response) => response.json())
      .then((data) => {
        console.log("GET request data:", data);
        // Process the data as needed
      })
      .catch((error) => {
        console.error("Error during GET request:", error);
      });

    const ws = new WebSocket("ws://k10b302.p.ssafy.io:30203/ws");

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "pong") {
          console.log("Received pong");
        } else {
          console.warn("Unknown JSON message", message);
        }
      } catch (e) {
        // 메시지가 JSON 형식이 아니면 이미지 데이터로 처리
        const image = new Image();
        image.src = `data:image/jpeg;base64,${event.data}`;
        image.onload = () => {
          if (videoRef.current) {
            const context = videoRef.current.getContext("2d");
            context.clearRect(
              0,
              0,
              videoRef.current.width,
              videoRef.current.height
            );
            context.drawImage(
              image,
              0,
              0,
              videoRef.current.width,
              videoRef.current.height
            );
            // console.log("프레임 렌더링 완료"); // 디버깅 메시지
          }
        };
        // console.log("이미지 데이터 수신: ", event.data.length, "바이트"); // 디버깅 메시지
      }
    };

    ws.onopen = () => {
      console.log("WebSocket connection established");
      // 주기적으로 ping 메시지 보내기
      setInterval(() => {
        ws.send(JSON.stringify({ type: "ping" }));
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed", event.code, event.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  return <canvas ref={videoRef} width="640" height="480"></canvas>;
};

export default VideoStream;

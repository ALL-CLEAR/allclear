from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

websocket_router = APIRouter()

clients: List[WebSocket] = []

@websocket_router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            if message:
                for client in clients:
                    if client != websocket:
                        await client.send_text(message)
            else:
                print("Received empty message")
    except WebSocketDisconnect:
        clients.remove(websocket)

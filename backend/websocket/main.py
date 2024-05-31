from fastapi import FastAPI
from app.router.websocket_router import websocket_router
from app.service.server_status import server_status
import asyncio
import time
import uvicorn
from contextlib import asynccontextmanager
from py_eureka_client import eureka_client

@asynccontextmanager
async def start_load(init: FastAPI):
    # schedule.start()
    await eureka_client.init_async(eureka_server="http://k10b302.p.ssafy.io:30200/eureka",
                                   app_name="websocket-service",
                                   instance_ip="127.0.0.1",
                                   instance_port=3023
                                   )
    yield

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    start_time = time.time()
    asyncio.create_task(server_status(start_time))

app.include_router(websocket_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3023)

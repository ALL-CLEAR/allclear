import asyncio
import time

async def server_status(start_time):
    while True:
        elapsed_time = int(time.time() - start_time)
        print(f"Server is running for {elapsed_time} seconds")
        await asyncio.sleep(10)

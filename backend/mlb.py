import requests


# Example: Get Dodgers roster
#url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live"
#url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live/timestamps"
#url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live?timecode=20210714_031900"
# response = requests.get(url)
# data = response.json()

# # Extract all plays
# plays = data.get("liveData", {}).get("plays", {}).get("allPlays", [])

# # Extract descriptions
# descriptions = [play.get("result", {}).get("description", "No description available") for play in plays]

# # Print the list of descriptions
# for description in descriptions:
#     print(description)

import asyncio
import websockets

# Replace with the actual game ID
game_id = "717344"  # Example game ID
uri = f"wss://ws.statsapi.mlb.com/api/v1/game/push/subscribe/gameday/{game_id}"

async def listen_to_game():
    async with websockets.connect(uri) as websocket:
        print("Connected to WebSocket server")

        while True:
            # Receive data from the WebSocket server
            response = await websocket.recv()
            print("Received message:", response)
            # You can process the response here

# Run the WebSocket listener
asyncio.get_event_loop().run_until_complete(listen_to_game())


import requests

# Example: Get Dodgers roster
#url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live"
#url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live/timestamps"
url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live?timecode=20210714_031900"
response = requests.get(url)
data = response.json()

# Extract all plays
plays = data.get("liveData", {}).get("plays", {}).get("allPlays", [])

# Extract descriptions
descriptions = [play.get("result", {}).get("description", "No description available") for play in plays]

# Print the list of descriptions
for description in descriptions:
    print(description)
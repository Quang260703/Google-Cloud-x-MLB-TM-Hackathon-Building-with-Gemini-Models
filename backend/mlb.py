
import requests
import os
from IPython.display import HTML, Markdown, display
from google import genai
from google.genai.types import (
    FunctionDeclaration,
    GenerateContentConfig,
    GoogleSearch,
    Part,
    Retrieval,
    SafetySetting,
    Tool,
    VertexAISearch,
)

# # Example: Get Dodgers roster
# #url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live"
# #url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live/timestamps"
# url = "https://statsapi.mlb.com/api/v1.1/game/634675/feed/live?timecode=20210714_031900"
# response = requests.get(url)
# data = response.json()

# # Extract all plays
# plays = data.get("liveData", {}).get("plays", {}).get("allPlays", [])

# # Extract descriptions
# descriptions = [play.get("result", {}).get("description", "No description available") for play in plays]

# # Print the list of descriptions
# for description in descriptions:
#     print(description)

PROJECT_ID = "eng-oven-446002-e0"  # @param {type: "string", placeholder: "[your-project-id]", isTemplate: true}
LOCATION = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")
client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
MODEL_ID = "gemini-2.0-flash-exp"  # @param {type: "string"}
response = client.models.generate_content(
    model=MODEL_ID, contents="What's the largest planet in our solar system?"
)

print(response.text)
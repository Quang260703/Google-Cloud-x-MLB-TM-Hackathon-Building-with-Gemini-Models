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

PROJECT_ID = "eng-oven-446002-e0"  # @param {type: "string", placeholder: "[your-project-id]", isTemplate: true}
LOCATION = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")
client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
MODEL_ID = "gemini-2.0-flash-exp"  # @param {type: "string"}
response = client.models.generate_content(
    model=MODEL_ID, contents="Explain baseball for Manny Machado singles on a sharp line drive to center fielder Adolis Garcia.   Manny Machado to 2nd.  Manny Machado advances to 2nd, on a fielding error by center fielder Adolis Garcia."
)

print(response.text)
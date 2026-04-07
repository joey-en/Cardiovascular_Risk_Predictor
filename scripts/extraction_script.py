import os
import json
import random
from dotenv import load_dotenv
from openai import AzureOpenAI

# Load environment variables
load_dotenv()

GPT_ENDPOINT = os.getenv("GPT_ENDPOINT")
GPT_DEPLOYMENT = os.getenv("GPT_DEPLOYMENT")
GPT_KEY = os.getenv("GPT_KEY")
GPT_VERSION = os.getenv("GPT_VERSION")

# Initialize Azure OpenAI Client
client = AzureOpenAI(
    azure_endpoint=GPT_ENDPOINT,
    api_key=GPT_KEY,
    api_version=GPT_VERSION
)

def extract_patient_data(query: str) -> dict:
    """
    Extracts cardiovascular features from a natural language query using Azure OpenAI.
    """
    
    system_prompt = """
    You are a medical data extraction assistant. Your job is to extract patient information from a given query 
    and output it in JSON format to match a specific cardiovascular dataset's schema.
    
    Here is the schema mapping you MUST follow:
    - `age`: Convert the patient's age in years to DAYS (Multiply by 365.25 and round to the nearest whole number). If not provided, estimate or put null.
    - `gender`: 1 for women, 2 for men.
    - `height`: Height in cm.
    - `weight`: Weight in kg.
    - `ap_hi`: Systolic blood pressure.
    - `ap_lo`: Diastolic blood pressure.
    - `cholesterol`: 1: normal, 2: above normal, 3: well above normal.
    - `gluc`: Glucose levels. 1: normal, 2: above normal, 3: well above normal.
    - `smoke`: 1 if they smoke, 0 if they do not.
    - `alco`: 1 if they drink alcohol, 0 if they do not.
    - `active`: 1 if they are physically active, 0 if they are not.
    
    Respond ONLY with a JSON object containing the extracted properties. Do not include markdown formatting or explanations.
    """
    
    few_shot_examples = [
        {"role": "user", "content": "I am a 45-year-old man, 175cm tall, weighing 80kg. My blood pressure is 130/85. I have normal cholesterol and glucose levels. I don't smoke or drink alcohol, and I am physically active."},
        {"role": "assistant", "content": '{"age": 16436, "gender": 2, "height": 175, "weight": 80.0, "ap_hi": 130, "ap_lo": 85, "cholesterol": 1, "gluc": 1, "smoke": 0, "alco": 0, "active": 1}'},
        {"role": "user", "content": "A 30-year-old female, 160cm, 55kg, BP 110/70, active, nonsmoker. She has high cholesterol but normal glucose."},
        {"role": "assistant", "content": '{"age": 10958, "gender": 1, "height": 160, "weight": 55.0, "ap_hi": 110, "ap_lo": 70, "cholesterol": 2, "gluc": 1, "smoke": 0, "alco": 0, "active": 1}'}
    ]
    
    messages = [{"role": "system", "content": system_prompt}] + few_shot_examples + [{"role": "user", "content": query}]
    
    response = client.chat.completions.create(
        model=GPT_DEPLOYMENT,
        messages=messages,
        temperature=0.0
    )
    
    response_content = response.choices[0].message.content.strip()
    
    # Strip markdown block if necessary
    if response_content.startswith("```json"):
        response_content = response_content[7:]
    if response_content.endswith("```"):
        response_content = response_content[:-3]
        
    extracted_data = json.loads(response_content)
    
    # Generate a random ID (as the dataset has an ID column)
    extracted_data["id"] = random.randint(100000, 999999)
    
    return extracted_data

if __name__ == "__main__":
    test_query = "My patient is a 50 year old woman. She weighs 70kg and is 165cm tall. Her blood pressure is 120 over 80. She doesn't smoke or drink, exercises regularly, and has completely normal blood work."
    print("Testing query:", test_query)
    
    try:
        result = extract_patient_data(test_query)
        print("Extracted Data:", json.dumps(result, indent=2))
        
        # Formatting as a CSV row
        columns = ["id", "age", "gender", "height", "weight", "ap_hi", "ap_lo", "cholesterol", "gluc", "smoke", "alco", "active"]
        csv_row = ";".join([str(result.get(col, "")) for col in columns])
        print("\nAs CSV Row (ready for cardio_train.csv):")
        print(csv_row)
        
    except Exception as e:
        print(f"Error: {e}")

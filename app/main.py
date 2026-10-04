from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.staticfiles import StaticFiles

class Customer(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float

app=FastAPI()
app.mount("/frontend", StaticFiles(directory="frontend", html=True), name="frontend")
model=joblib.load("pipeline/pipeline_churn.pkl")
@app.get("/")
def home():
    return {"message": "churn prediction is running"}
@app.post("/predict")
def predict(data: Customer):

   
    customer_data = data.model_dump()
    input_data = pd.DataFrame([customer_data])
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    return {
        "prediction": "Churn" if prediction == 1 else "No Churn",
        "churn_probability": round(float(probability), 3)
    }

# Customer Churn Prediction

An end-to-end **customer churn prediction application** built using machine learning and deployed as a web application. It helps identify customers who may be likely to leave a telecom service by analyzing their service, contract, and billing information.

**Live Demo:** [Try the application](https://customer-churn-prediction-ozjk.onrender.com/frontend/)

**API Documentation:** [Explore the FastAPI docs](https://customer-churn-prediction-ozjk.onrender.com/docs)

## Overview

The project takes a machine-learning model beyond a notebook and turns it into an interactive application that accepts customer information and returns a churn prediction with an estimated probability.

### Features

- Collects customer, service, contract, and billing information through a web form.
- Uses a trained **Logistic Regression pipeline** for churn prediction.
- Returns the predicted class and estimated churn probability.
- Displays a **Low / Medium / High risk** interpretation.
- Provides basic retention-oriented guidance for higher-risk customers.
- Exposes predictions through a **FastAPI REST API**.
- Supports interactive API testing through Swagger UI.
- Includes a notebook covering exploratory data analysis, model comparison, and hyperparameter tuning.
- Deployed on Render.

## Application Workflow

```text
Customer Information
        ↓
Web Frontend
        ↓
FastAPI Prediction Endpoint
        ↓
Preprocessing + Trained ML Pipeline
        ↓
Prediction + Churn Probability
        ↓
Risk Interpretation + Retention Guidance
```

## Model Development

Multiple classification algorithms were evaluated:

- Logistic Regression
- K-Nearest Neighbors
- Decision Tree
- Random Forest
- XGBoost

Logistic Regression achieved the strongest initial F1 score among the evaluated models. Hyperparameter tuning was then performed using `GridSearchCV`, with particular emphasis on **recall** to identify as many potential churners as possible.

The final preprocessing and classification pipeline is saved as:

```text
pipeline/pipeline_churn.pkl
```

The API loads this fitted pipeline to generate predictions for new customer inputs.

## Exploratory Data Analysis

The project includes visual analysis of customer churn patterns.

### Overall Churn

![Overall Churn](images/churn_count.png)

### Churn by Customer Tenure

![Churn by Tenure](images/churn_count_wrt_duration.png)

### Churn by Gender

![Churn by Gender](images/churn_count_wrt_gender.png)

### Churn by Monthly Charges

![Churn by Monthly Charges](images/churn_count_wrt_monthly_charges.png)

## Tech Stack

- **Programming:** Python
- **Data Analysis:** Pandas, NumPy, Matplotlib, Seaborn
- **Machine Learning:** Scikit-learn, XGBoost
- **Model Persistence:** Joblib
- **Backend:** FastAPI, Pydantic, Uvicorn
- **Frontend:** HTML, CSS, JavaScript
- **Version Control:** Git, GitHub
- **Deployment:** Render

## Project Structure

```text
customer_churn_prediction/
├── app/
│   └── main.py
├── dataset/
│   └── Telco-Customer-Churn.csv
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── images/
│   ├── churn_count.png
│   ├── churn_count_wrt_duration.png
│   ├── churn_count_wrt_gender.png
│   └── churn_count_wrt_monthly_charges.png
├── notebook/
│   └── customer churn.ipynb
├── pipeline/
│   └── pipeline_churn.pkl
├── .gitignore
├── .python-version
├── README.md
└── requirements.txt
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Amank0106/customer_churn_prediction.git
cd customer_churn_prediction
```

### 2. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 3. Start the application

```bash
python -m uvicorn app.main:app --reload
```

### 4. Open the application

- **Web interface:** http://127.0.0.1:8000/frontend/
- **API documentation:** http://127.0.0.1:8000/docs

## Roadmap

- [x] Exploratory data analysis and feature analysis
- [x] Model comparison and selection
- [x] Hyperparameter tuning
- [x] Saved preprocessing and model pipeline
- [x] FastAPI prediction endpoint
- [x] Interactive web frontend
- [x] Git/GitHub version control
- [x] Cloud deployment on Render
- [ ] Dockerize the application
- [ ] Improve retention recommendations
- [ ] Add model explainability
- [ ] Add automated model evaluation and monitoring

## Key Learnings

- Building and evaluating classification models
- Handling preprocessing within a Scikit-learn pipeline
- Using recall and F1 score to evaluate model performance
- Serving ML predictions through a REST API
- Connecting a frontend to a backend
- Version-controlling and deploying an end-to-end ML application

## Author

**Aman Kumar**  
Electronics & Communication Engineering  
Interests: Machine Learning, Deep Learning, Data Science, and AI Engineering

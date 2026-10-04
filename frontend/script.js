const form = document.getElementById("churnForm");
const button = document.getElementById("predictBtn");
const result = document.getElementById("result");
const errorBox = document.getElementById("error");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    errorBox.classList.add("hidden");
    result.classList.add("hidden");
    button.disabled = true;
    button.textContent = "Predicting...";

    const formData = new FormData(form);

    const data = {
        gender: formData.get("gender"),
        SeniorCitizen: Number(formData.get("SeniorCitizen")),
        Partner: formData.get("Partner"),
        Dependents: formData.get("Dependents"),
        tenure: Number(formData.get("tenure")),
        PhoneService: formData.get("PhoneService"),
        MultipleLines: formData.get("MultipleLines"),
        InternetService: formData.get("InternetService"),
        OnlineSecurity: formData.get("OnlineSecurity"),
        OnlineBackup: formData.get("OnlineBackup"),
        DeviceProtection: formData.get("DeviceProtection"),
        TechSupport: formData.get("TechSupport"),
        StreamingTV: formData.get("StreamingTV"),
        StreamingMovies: formData.get("StreamingMovies"),
        Contract: formData.get("Contract"),
        PaperlessBilling: formData.get("PaperlessBilling"),
        PaymentMethod: formData.get("PaymentMethod"),
        MonthlyCharges: Number(formData.get("MonthlyCharges")),
        TotalCharges: Number(formData.get("TotalCharges"))
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const detail = await response.text();
            throw new Error(detail || "Prediction request failed.");
        }

        const output = await response.json();
        showResult(output);
    } catch (error) {
        errorBox.textContent =
            "Could not connect to the FastAPI server. Make sure Uvicorn is running.";
        errorBox.classList.remove("hidden");
        console.error(error);
    } finally {
        button.disabled = false;
        button.textContent = "Predict Churn";
    }
});

function showResult(output) {
    const probability = Number(output.churn_probability) * 100;
    const prediction = output.prediction;

    document.getElementById("predictionText").textContent =
        prediction === "Churn"
            ? "This customer is likely to churn"
            : "This customer is likely to stay";

    document.getElementById("probabilityValue").textContent =
        `${probability.toFixed(1)}%`;

    const riskBadge = document.getElementById("riskBadge");
    const barFill = document.getElementById("barFill");
    const message = document.getElementById("resultMessage");

    let risk;
    if (probability >= 70) {
        risk = "HIGH RISK";
        message.textContent =
            "Consider a retention offer or proactive customer outreach.";
    } else if (probability >= 40) {
        risk = "MEDIUM RISK";
        message.textContent =
            "This customer may benefit from proactive engagement.";
    } else {
        risk = "LOW RISK";
        message.textContent =
            "The model estimates a relatively low churn risk.";
    }

    riskBadge.textContent = risk;
    barFill.style.width = `${probability}%`;

    result.classList.remove("hidden");
}

import os
from flask import Flask, jsonify, request
app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify(status="ok", service="flask-backend")

@app.post("/api/submit")
def submit():
    data = request.get_json(silent=True) or {}
    fields = {key: str(data.get(key, "")).strip() for key in ("name", "email", "message")}
    if not all(fields.values()):
        return jsonify(success=False, message="Name, email, and message are required."), 400
    return jsonify(success=True, message="Data received successfully by the Flask backend.", data=fields)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))

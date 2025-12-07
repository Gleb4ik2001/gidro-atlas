import os
import pickle


BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

with open(MODEL_PATH, "rb") as f:
    MODEL = pickle.load(f)

def predict_attention_probability(technical_condition, passport_age):
    features = [[technical_condition, passport_age]]
    return float(MODEL.predict_proba(features)[0][1])

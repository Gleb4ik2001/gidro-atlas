import numpy as np
import pandas as pd
import pickle
from sklearn.linear_model import LogisticRegression
import os


BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

np.random.seed(42)

data = []
for _ in range(500):
    condition = np.random.randint(1, 6)
    age = np.random.randint(0, 20)
    priority = (6 - condition) * 3 + age
    attention = 1 if priority >= 12 else 0

    data.append([condition, age, attention])

df = pd.DataFrame(data, columns=["condition", "age", "attention"])


X = df[["condition", "age"]]
y = df["attention"]

model = LogisticRegression()
model.fit(X, y)


with open(MODEL_PATH, "wb") as f:
    pickle.dump(model, f)

print("Модель обучена и сохранена в:", MODEL_PATH)

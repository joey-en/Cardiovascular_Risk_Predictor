# Cardiovascular Case

## Original User Query

Patient is a 58 year old man, 172cm, 92kg, BP 150/95, high cholesterol, above-normal glucose, sedentary, smoker, occasional alcohol.

## Extracted Features

```json
{
  "age": 21188,
  "gender": 2,
  "height": 172,
  "weight": 92,
  "ap_hi": 150,
  "ap_lo": 95,
  "cholesterol": 3,
  "gluc": 2,
  "smoke": 1,
  "alco": 1,
  "active": 0
}
```

## Model Prediction

- Predicted class: cardio_disease
- Predicted probability: 0.84

## SHAP Values

```json
{
  "ap_hi": 0.22,
  "smoke": 0.18,
  "cholesterol": 0.14,
  "gluc": 0.12,
  "age": 0.09,
  "weight": 0.06,
  "active": -0.05
}
```

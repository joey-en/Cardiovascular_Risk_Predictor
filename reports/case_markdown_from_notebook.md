# Cardiovascular Case

## Original User Query
Auto-generated from notebook test case index 0. Replace this line with the original user query when available.

## Extracted Features
```json
{
  "age": 44.0,
  "gender": 2.0,
  "height": 170.0,
  "weight": 100.0,
  "ap_hi": 140.0,
  "ap_lo": 100.0,
  "cholesterol": 1.0,
  "gluc": 1.0,
  "smoke": 0.0,
  "alco": 0.0,
  "active": 1.0,
  "bmi": 34.602076124567475,
  "pulse_pressure": 40.0,
  "map": 113.33333333333333,
  "bp_category": 2.0,
  "bmi_cat": 3.0,
  "age_group": 1.0,
  "lifestyle_risk": 0.0,
  "metabolic_risk": 1.0,
  "bp_ratio": 1.4
}
```

## Model Prediction
- Predicted class: cardio_disease
- Predicted probability: 0.9300

## SHAP Values
```json
{
  "ap_hi": 0.120643,
  "map": 0.08553,
  "ap_lo": 0.071229,
  "bp_category": 0.065955,
  "metabolic_risk": 0.030662,
  "weight": 0.029479,
  "bmi": 0.026263,
  "bp_ratio": 0.025514,
  "gender": -0.012072,
  "pulse_pressure": -0.008339,
  "active": -0.007229,
  "bmi_cat": 0.006962,
  "height": 0.006184,
  "cholesterol": -0.005519,
  "smoke": 0.004486,
  "age": 0.003433,
  "gluc": 0.002922,
  "lifestyle_risk": -0.001286,
  "age_group": -0.001215,
  "alco": 0.000634
}
```

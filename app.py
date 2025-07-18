from fastapi import FastAPI
from .database import Base, engine

# Import all models to register them with Base
from . import models

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Internship portal API is running"}

# Create tables
Base.metadata.create_all(bind=engine)

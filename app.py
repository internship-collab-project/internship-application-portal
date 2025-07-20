
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Health check
@app.get("/")
def root():
    return {"message": "Internship API running."}

# Example: Create applicant
@app.post("/applicants/", response_model=schemas.ApplicantResponse)
def create_applicant(applicant: schemas.ApplicantCreate, db: Session = Depends(get_db)):
    db_applicant = models.Applicant(**applicant.dict())
    db.add(db_applicant)
    db.commit()
    db.refresh(db_applicant)
    return db_applicant

# Example: List job listings
@app.get("/jobs/", response_model=list[schemas.JobListingResponse])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(models.JobListing).all()


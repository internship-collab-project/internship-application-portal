from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Job
from app.schemas import JobBase, JobResponse
from typing import List
from app.auth import admin_required  # Protect create route

router = APIRouter()

# Only Admin can create jobs
@router.post("/", response_model=JobResponse)
def create_job(job: JobBase, db: Session = Depends(get_db), current_admin=Depends(admin_required)):
    new_job = Job(**job.dict())
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

# Anyone can view jobs
@router.get("/", response_model=List[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Job
from app.schemas import JobBase, JobResponse
from typing import List
from app.auth import role_required

router = APIRouter()

@router.get("/", response_model=List[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()

@router.post("/", dependencies=[Depends(role_required(["admin"]))])
def create_job(job: JobBase, db: Session = Depends(get_db)):
    new_job = Job(**job.dict())
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return {"message": "Job created", "job": new_job}

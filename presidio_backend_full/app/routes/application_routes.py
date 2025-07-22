from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Application, Profile
from app.schemas import ApplicationCreate, ApplicationResponse
from typing import List
import os, shutil
from app.utils.email_utils import send_email

router = APIRouter()
UPLOAD_DIR = "app/uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/apply/{job_id}", response_model=ApplicationResponse)
async def apply_for_job(
    job_id: int,
    application: ApplicationCreate,
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not resume.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Resume must be a PDF file")
    file_path = os.path.join(UPLOAD_DIR, resume.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    # Autofill from profile if exists
    profile = db.query(Profile).filter(Profile.user_id == 1).first()  # Assume user_id=1 for now
    if profile:
        application.name = f"{profile.first_name} {profile.last_name}"
        application.email = profile.email

    new_application = Application(name=application.name, email=application.email, resume=file_path, job_id=job_id)
    db.add(new_application)
    db.commit()
    db.refresh(new_application)
    return new_application

@router.post("/{application_id}/accept")
async def accept_application(application_id: int, db: Session = Depends(get_db)):
    app_record = db.query(Application).filter(Application.id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    app_record.status = "Accepted"
    db.commit()
    await send_email(app_record.email, "Application Accepted", "Congratulations! Your application was accepted.")
    return {"message": "Application accepted and email sent"}

@router.post("/{application_id}/reject")
async def reject_application(application_id: int, db: Session = Depends(get_db)):
    app_record = db.query(Application).filter(Application.id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    app_record.status = "Rejected"
    db.commit()
    await send_email(app_record.email, "Application Rejected", "Unfortunately, your application was rejected.")
    return {"message": "Application rejected and email sent"}
    
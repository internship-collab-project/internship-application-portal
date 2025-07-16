from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Application, Job
from app.auth import role_required
from app.utils.email_utils import send_email
import shutil
import os

router = APIRouter()
UPLOAD_DIR = "app/uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/apply/{job_id}")
async def apply(job_id: int, name: str, email: str, resume: UploadFile = File(...), db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    file_path = os.path.join(UPLOAD_DIR, resume.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    application = Application(name=name, email=email, job_id=job_id, resume=file_path)
    db.add(application)
    db.commit()
    return {"message": "Application submitted successfully"}

@router.get("/", dependencies=[Depends(role_required(["admin"]))])
def get_applications(db: Session = Depends(get_db)):
    return db.query(Application).all()

@router.post("/{app_id}/accept", dependencies=[Depends(role_required(["admin"]))])
async def accept_application(app_id: int, db: Session = Depends(get_db)):
    application = db.query(Application).filter(Application.id == app_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    application.status = "Accepted"
    db.commit()
    await send_email(
        subject="Application Accepted",
        email_to=application.email,
        body=f"Congratulations {application.name}, your application has been accepted!"
    )
    return {"message": "Application accepted and email sent"}

@router.post("/{app_id}/reject", dependencies=[Depends(role_required(["admin"]))])
async def reject_application(app_id: int, db: Session = Depends(get_db)):
    application = db.query(Application).filter(Application.id == app_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    application.status = "Rejected"
    db.commit()
    await send_email(
        subject="Application Rejected",
        email_to=application.email,
        body=f"Hello {application.name}, thank you for applying. Unfortunately, your application was not successful."
    )
    return {"message": "Application rejected and email sent"}

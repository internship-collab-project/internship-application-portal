from fastapi import FastAPI, APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from . import schemas, crud, models
from .database import SessionLocal
from datetime import date

#api router is used to group related endpoints
router = APIRouter()

#create dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint to get applicant profile by id
@router.get("/applicantProfile/id/{id}", response_model=schemas.ApplicantProfileOut)
def get_applicant_profile_by_id(id: int, db: Session = Depends(get_db)):
    profile = db.query(models.ApplicantProfile).filter(models.ApplicantProfile.id == id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

# Endpoint to create a new applicant profile, uses email since that is how the user is first created
# @router.post("/applicantProfile", response_model=schemas.ApplicantProfileOut)
# def create_applicant_profile(profile: schemas.ApplicantProfileCreate, db: Session = Depends(get_db)):
#     user = crud.get_user_by_email(db, email=profile.email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     applicant_profile = crud.create_applicant_profile(db, profile=profile, user_id=user.id)
#     return applicant_profile

@router.post("/applicantProfile", response_model=schemas.ApplicantProfileOut)
async def create_applicant_profile(
    #Form(...) is used to handle form data, which is common for file uploads and multipart forms
    #Form for form fields, File for file uploads
    email: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    phone_number: str = Form(...),
    university: str = Form(...),
    major: str = Form(...),
    graduation_date: date = Form(...),
    resume: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # Create a new applicant profile
    applicant_profile = crud.create_applicant_profile(
        db=db,
        email=email,
        first_name=first_name,
        last_name=last_name,
        phone_number=phone_number,
        university=university,
        major=major,
        graduation_date=graduation_date,
        resume=resume
    )
    return applicant_profile

# Endpoint to update applicant profile by id
@router.put("/applicantProfile/id/{id}", response_model=schemas.ApplicantProfileOut)
def update_applicant_profile( #none makes the field optional
    id: int,
    email: str = Form(None),
    first_name: str = Form(None),
    last_name: str = Form(None),
    phone_number: str = Form(None),
    university: str = Form(None),
    major: str = Form(None),
    graduation_date: date = Form(None),
    resume: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    db_profile = db.query(models.ApplicantProfile).filter(models.ApplicantProfile.id == id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Update fields if provided
    # if email:
    #     db_profile.email = email //dont update email for now, it should be immutable after creation to avoid issues with user lookup and authentication/authorization
    if first_name is not None:
        db_profile.first_name = first_name
    if last_name is not None:
        db_profile.last_name = last_name
    if phone_number is not None:
        db_profile.phone_number = phone_number
    if university is not None:
        db_profile.university = university
    if major is not None:
        db_profile.major = major
    if graduation_date is not None:
        db_profile.graduation_date = graduation_date
    if resume is not None:
        # Handle file upload logic here if needed, for now will set to None
        pass  # Placeholder for file handling logic

    db.commit()
    db.refresh(db_profile)
    
    return db_profile
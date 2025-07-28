from http.client import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas
from fastapi import UploadFile
from datetime import date

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, password=hashed_pw, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not pwd_context.verify(password, user.password):
        return None
    return user

def get_jobs(db: Session):
    return db.query(models.Job).all()

def get_applications(db: Session):
    return db.query(models.Application).all()

def create_applicant_profile(
    db: Session,
    email: str,
    first_name: str,
    last_name: str,
    phone_number: str,
    university: str,
    major: str,
    graduation_date: date,
    resume: UploadFile = None
):
    user = get_user_by_email(db, email) #looks up user by email in database
    if not user:
        raise HTTPException(status_code=404, detail="User not found") #if user does not exist, raise error
    
    # resume_path = None #initialize a variable for resume path
    # if resume: #if a resume file is provided
    #     file_location = f"resumes/{user.id}_{resume.filename}"
    #     with open(file_location, "wb") as f:
    #         f.write(resume.file.read())
    #     resume_path = file_location

    # Create the applicant profile in the database

    db_profile = models.ApplicantProfile(
        user_id=user.id,
        first_name=first_name,
        last_name=last_name,
        phone_number=phone_number,
        university=university,
        major=major,
        graduation_date=graduation_date,
        resume=None #make None for now, can be updated later with file handling
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile
# === schemas.py ===
from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from datetime import date, datetime

# --- Applicant Auth ---
class ApplicantAuthCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=8)

class ApplicantAuthResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True

# --- Admin Auth ---
class AdminAuthCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=8)

class AdminAuthResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True

# --- Applicant Info ---
class ApplicantInfoCreate(BaseModel):
    name: str
    gpa: Optional[float]
    graduation_date: Optional[date]
    experience: Optional[str]
    resume_url: Optional[str]

class ApplicantInfoResponse(ApplicantInfoCreate):
    id: int

    class Config:
        orm_mode = True

# --- Admin Info ---
class AdminInfoCreate(BaseModel):
    name: str
    department: Optional[str]

class AdminInfoResponse(AdminInfoCreate):
    id: int

    class Config:
        orm_mode = True

# --- Job Listings ---
class JobListingCreate(BaseModel):
    title: str
    description: Optional[str]
    deadline: Optional[date]

class JobListingResponse(JobListingCreate):
    id: int
    posted_at: datetime

    class Config:
        orm_mode = True

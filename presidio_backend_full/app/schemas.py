from pydantic import BaseModel, EmailStr
from typing import Optional

# --- AUTH ---
class UserCreate(BaseModel):
    username: str
    password: str
    role: Optional[str] = "applicant"

class UserLogin(BaseModel):
    username: str
    password: str

# --- JOB ---
class JobBase(BaseModel):
    title: str
    description: str
    category: str
    location: str
    deadline: str

class JobResponse(JobBase):
    id: int
    class Config:
        orm_mode = True

# --- APPLICATION ---
class ApplicationCreate(BaseModel):
    name: str
    email: EmailStr

class ApplicationResponse(BaseModel):
    id: int
    name: str
    email: str
    status: str
    class Config:
        orm_mode = True

# --- PROFILE ---
class ProfileCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    dob: str
    major: str
    gpa: float
    graduation_date: str
    work_experience: str

class ProfileUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[EmailStr]
    dob: Optional[str]
    major: Optional[str]
    gpa: Optional[float]
    graduation_date: Optional[str]
    work_experience: Optional[str]

class ProfileResponse(ProfileCreate):
    id: int
    user_id: int
    resume: Optional[str]
    class Config:
        orm_mode = True
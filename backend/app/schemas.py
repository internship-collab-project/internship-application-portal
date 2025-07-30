from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date

# --- Auth & User ---
class UserBase(BaseModel):
    email: EmailStr

# class UserCreate(UserBase):
#     password: str
#     admin_code: Optional[str] = None # Used for admin creation, can be None for applicants
#     role: Optional[str] = "applicant"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    admin_code: Optional[str] = Field(default=None, alias="adminCode")  # alias for frontend compatibility
    role: Optional[str] = "applicant"

    class Config:
        allow_population_by_field_name = True  # Allow using field name or alias


class UserOut(UserBase):
    id: int
    role: str
    class Config:
        orm_mode = True

class Token(BaseModel):
    accessToken: str
    roles: List[str]

class LoginData(BaseModel):
    email: EmailStr
    password: str

# --- Profile ---
#for creating a profile
class ApplicantProfileCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone_number: str
    university: str
    major: str
    graduation_date: date
   # resume: Optional[str] = None #can exclude because pydantic does not deal with file uploads directly

#for updating an application
class UpdateApplicantProfile(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone_number: Optional[str]
    university: Optional[str]
    major: Optional[str]
    graduation_date: Optional[date]
    # resume: Optional[str] = None  # can exclude because pydantic does not deal with file uploads directly

# class ApplicantProfileCreate(ApplicantProfileBase): 
#     # frontend can send this to create a profile
#     pass

class ApplicantProfileOut(ApplicantProfileCreate):
    # used to return profile data from the backend to the frontend
    id: int
    user_id: int
    class Config:
        orm_mode = True

# --- Job ---
class JobBase(BaseModel):
    title: str
    description: str
    category: Optional[str]
    location: Optional[str]
    deadline: Optional[str]

class JobCreate(JobBase):
    pass

class JobOut(JobBase):
    id: int
    class Config:
        orm_mode = True

# --- Application ---
class ApplicationBase(BaseModel):
    status: Optional[str] = "Pending"

class ApplicationCreate(ApplicationBase):
    job_id: int

class ApplicationOut(ApplicationBase):
    id: int
    user_id: int
    job_id: int
    created_at: datetime
    class Config:
        orm_mode = True

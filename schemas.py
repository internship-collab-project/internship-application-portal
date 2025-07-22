from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date

# User Schemas

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

# Profile Schemas

class ProfileBase(BaseModel):
    name: str
    gpa: Optional[str] = None
    graduation_date: Optional[date] = None
    experience: Optional[str] = None
    resume: Optional[str] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileOut(ProfileBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# Job Schemas

class JobBase(BaseModel):
    title: str
    description: str
    category: str
    location: str
    deadline: str

class JobCreate(JobBase):
    pass

class JobOut(JobBase):
    id: int

    class Config:
        orm_mode = True

# Application Schemas

class ApplicationBase(BaseModel):
    job_id: int

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationOut(BaseModel):
    id: int
    user_id: int
    job_id: int
    status: str
    created_at: datetime

    class Config:
        orm_mode = True

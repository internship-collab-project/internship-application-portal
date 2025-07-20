from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# User Schema

class UserBase(BaseModel):
    email: EmailStr
    is_admin: bool = False


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

# Profile Schema (for autofill)

class ProfileBase(BaseModel):
    full_name: str
    major: str
    graduation_date: str
    gpa: float
    resume_link: str
    experience: Optional[str] = None


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# Job Listing Schema

class JobListingBase(BaseModel):
    title: str
    description: str
    requirements: str


class JobListingCreate(JobListingBase):
    pass


class JobListingResponse(JobListingBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Application Schema

class ApplicationBase(BaseModel):
    job_id: int


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationResponse(ApplicationBase):
    id: int
    user_id: int
    applied_at: datetime

    class Config:
        orm_mode = True

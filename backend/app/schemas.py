from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date

# --- Auth & User ---
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "applicant"

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
class ProfileBase(BaseModel):
    name: Optional[str]
    gpa: Optional[str]
    graduation_date: Optional[date]
    experience: Optional[str]
    resume: Optional[str]

class ProfileCreate(ProfileBase):
    pass

class ProfileOut(ProfileBase):
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

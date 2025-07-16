from pydantic import BaseModel, EmailStr
from typing import Optional

# Auth Schemas
class UserCreate(BaseModel):
    username: str
    password: str
    role: Optional[str] = "applicant"

class UserLogin(BaseModel):
    username: str
    password: str

# Job Schemas
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

# Application Schemas
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

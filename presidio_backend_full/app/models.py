from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="applicant")

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String)
    location = Column(String)
    deadline = Column(String)

class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    resume = Column(String)
    status = Column(String, default="Pending")
    job_id = Column(Integer, ForeignKey("jobs.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    dob = Column(String)
    major = Column(String)
    gpa = Column(Float)
    graduation_date = Column(String)
    work_experience = Column(String)
    resume = Column(String)
    user = relationship("User")
    
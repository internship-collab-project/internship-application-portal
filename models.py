from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="applicant")  # admin, reviewer, applicant

    profile = relationship("Profile", uselist=False, back_populates="user")
    applications = relationship("Application", back_populates="user")


class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    gpa = Column(String)
    graduation_date = Column(Date)
    experience = Column(Text)
    resume = Column(String)  # path to uploaded file

    user = relationship("User", back_populates="profile")


class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    category = Column(String)
    location = Column(String)
    deadline = Column(String)

    applications = relationship("Application", back_populates="job")


class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))  # ForeignKey to pull profile info
    job_id = Column(Integer, ForeignKey("jobs.id"))
    status = Column(String, default="Pending")  # Pending, Accepted, Rejected
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="applications")
    job = relationship("Job", back_populates="applications")

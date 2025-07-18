from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class ApplicantAuth(Base):
    __tablename__ = 'applicant_auth'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

class AdminAuth(Base):
    __tablename__ = 'admin_auth'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

class ApplicantInfo(Base):
    __tablename__ = 'applicant_info'
    id = Column(Integer, primary_key=True)
    auth_id = Column(Integer, ForeignKey('applicant_auth.id', ondelete='CASCADE'), unique=True, nullable=False)
    name = Column(String, nullable=False)
    gpa = Column(String)
    graduation_date = Column(Date)
    experience = Column(Text)
    resume_url = Column(String)

class AdminInfo(Base):
    __tablename__ = 'admin_info'
    id = Column(Integer, primary_key=True)
    auth_id = Column(Integer, ForeignKey('admin_auth.id', ondelete='CASCADE'), unique=True, nullable=False)
    name = Column(String)
    department = Column(String)

class JobListing(Base):
    __tablename__ = 'job_listings'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    posted_at = Column(DateTime, default=datetime.utcnow)
    deadline = Column(Date)

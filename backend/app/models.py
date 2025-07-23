from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id       = Column(Integer, primary_key=True, index=True)
    email    = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role     = Column(String, default="applicant", nullable=False)  # applicant or admin

    profile      = relationship("Profile", uselist=False, back_populates="user", cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="user", cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"
    id              = Column(Integer, primary_key=True, index=True)
    user_id         = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name            = Column(String, nullable=True)
    gpa             = Column(String, nullable=True)
    graduation_date = Column(Date, nullable=True)
    experience      = Column(Text, nullable=True)
    resume          = Column(String, nullable=True)

    user = relationship("User", back_populates="profile")

class Job(Base):
    __tablename__ = "jobs"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category    = Column(String, nullable=True)
    location    = Column(String, nullable=True)
    deadline    = Column(String, nullable=True)

    applications = relationship("Application", back_populates="job", cascade="all, delete-orphan")

class Application(Base):
    __tablename__ = "applications"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    job_id     = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    status     = Column(String, default="Pending", nullable=False)  # Pending/Accepted/Rejected
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="applications")
    job  = relationship("Job", back_populates="applications")

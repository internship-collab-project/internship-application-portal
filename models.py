from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="applicant", nullable=False)  # admin, reviewer, applicant

    profile = relationship("Profile", uselist=False, back_populates="user", passive_deletes=True)
    applications = relationship("Application", back_populates="user", passive_deletes=True)


class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    gpa = Column(String, nullable=True)
    graduation_date = Column(Date, nullable=True)
    experience = Column(Text, nullable=True)
    resume = Column(String, nullable=True)  # path to uploaded file

    user = relationship("User", back_populates="profile")


class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)
    location = Column(String, nullable=False)
    deadline = Column(String, nullable=False)

    applications = relationship("Application", back_populates="job", passive_deletes=True)


class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    status = Column(String, default="Pending", nullable=False)  # Pending, Accepted, Rejected
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="applications")
    job = relationship("Job", back_populates="applications")

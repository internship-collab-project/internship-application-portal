from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Applicant Login Credentials
class ApplicantAuth(db.Model):
    __tablename__ = 'applicant_auth'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

# Admin Login Credentials
class AdminAuth(db.Model):
    __tablename__ = 'admin_auth'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

# Applicant Info
class ApplicantInfo(db.Model):
    __tablename__ = 'applicant_info'
    id = db.Column(db.Integer, primary_key=True)
    auth_id = db.Column(db.Integer, db.ForeignKey('applicant_auth.id', ondelete='CASCADE'), unique=True, nullable=False)
    name = db.Column(db.String(128), nullable=False)
    gpa = db.Column(db.Numeric(3, 2))
    graduation_date = db.Column(db.Date)
    experience = db.Column(db.Text)
    resume_url = db.Column(db.String(256))

# Admin Info
class AdminInfo(db.Model):
    __tablename__ = 'admin_info'
    id = db.Column(db.Integer, primary_key=True)
    auth_id = db.Column(db.Integer, db.ForeignKey('admin_auth.id', ondelete='CASCADE'), unique=True, nullable=False)
    name = db.Column(db.String(128), nullable=False)
    department = db.Column(db.String(128))

# Job Listings
class JobListing(db.Model):
    __tablename__ = 'job_listings'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    posted_at = db.Column(db.DateTime, default=datetime.utcnow)
    deadline = db.Column(db.Date)

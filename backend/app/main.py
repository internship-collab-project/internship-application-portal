from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import jwt, os
from .database import Base, engine
from . import models, schemas, crud, auth

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # add both dev ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth router (must be after app = FastAPI() but before protected routes)
app.include_router(auth.router)

bearer_scheme = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET", "changeme")
ALGORITHM = "HS256"

# Auth utility function to extract current user from JWT
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(auth.get_db)
):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        roles = payload.get("roles", [])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return {"user": user, "roles": roles}

# Public route: list of jobs
@app.get("/jobs/", response_model=list[schemas.JobOut])
def read_jobs(db: Session = Depends(auth.get_db)):
    return crud.get_jobs(db)

# Protected route: user-specific applications
@app.get("/applicantDashboard", response_model=list[schemas.ApplicationOut])
def applicant_dashboard(
    info=Depends(get_current_user),
    db: Session = Depends(auth.get_db)
):
    user = info["user"]
    return db.query(models.Application).filter(models.Application.user_id == user.id).all()

# Protected route: all applications (admin-only)
@app.get("/adminDashboard", response_model=list[schemas.ApplicationOut])
def admin_dashboard(
    info=Depends(get_current_user),
    db: Session = Depends(auth.get_db)
):
    if "admin" not in info["roles"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.get_applications(db)

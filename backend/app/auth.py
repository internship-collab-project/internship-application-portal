import os, jwt
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import schemas, crud, models
from .database import SessionLocal
from .email_utils import send_email

from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

SECRET_KEY = os.getenv("JWT_SECRET", "changeme")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def signup(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=409, detail="Email already registered")
    # user = crud.create_user(db, user_in)

    # # Send welcome email
    # subject = "Welcome to the Internship Portal"
    # html_content = (
    #     f"<p>Hi {user.email},</p>"
    #     "<p>Thank you for signing up for our Internship Application Portal. "
    #     "You can now log in and submit your application.</p>"
    #     "<p>Best regards,<br/>The Team</p>"
    # )
    # send_email(user.email, subject, html_content)

    #determine user role based on admin code
    admin_code_env = os.getenv("ADMIN_CODE")
    # if user_in.admin_code == admin_code_env:
    #     user.role = "admin"
    # role = "admin" if user_in.admin_code == admin_code_env else "applicant"
    role = "admin" if (user_in.admin_code or "").strip() == (admin_code_env or "").strip() else "applicant" #helps get rid of any leading/trailing whitespace

    user = crud.create_user(db, user_in, role_override=role)

    return user

# @router.post("/login", response_model=schemas.Token)
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = crud.authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     roles = [user.role]
#     token = create_access_token({"sub": user.email, "roles": roles})
#     return {"accessToken": token, "roles": roles}
@router.post("/login", response_model=schemas.Token)
def login(request: schemas.LoginData, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    roles = [user.role]
    token = create_access_token({"sub": user.email, "roles": roles})
    return {"accessToken": token, "roles": roles}
from fastapi import FastAPI
from app.routes import auth_routes, job_routes, profile_routes, application_routes
from app.db import Base, engine

# Create all tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(title="Presidio Job Application API")

# Include Routes
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(job_routes.router, prefix="/jobs", tags=["Jobs"])
app.include_router(profile_routes.router, prefix="/profile", tags=["Profile"])
app.include_router(application_routes.router, prefix="/applications", tags=["Applications"])

@app.get("/")
def home():
    return {"message": "Welcome to the Presidio Job Application API"}
    
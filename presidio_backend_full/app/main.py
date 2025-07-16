from fastapi import FastAPI
from app.routes import auth_routes, job_routes, application_routes
from app.db import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Presidio Job Application API")

# Register routes
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(job_routes.router, prefix="/jobs", tags=["Jobs"])
app.include_router(application_routes.router, prefix="/applications", tags=["Applications"])

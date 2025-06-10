from typing import Annotated
from fastapi import FastAPI, HTTPException, status
from sqlalchemy import inspect
from database import engine, Base
from api_groups.project_api import project_router

app = FastAPI()

app.include_router(project_router)

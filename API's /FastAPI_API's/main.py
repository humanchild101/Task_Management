from typing import Annotated
from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from database import engine, Base, SessionLocal
from models.priority import Priority
from models.projects import Projects

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dep = Annotated[Session, Depends(get_db)]


# @app.create("/create-project/", status_code = status.HTTP_201_CREATED)


@app.get("/get-project/{id}/", status_code=status.HTTP_200_OK)
def get_project(id: int, db: db_dep):
    db_project = db.query(Projects).filter(Projects.id == id).first()
    if db_project is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project does not exist")
    else:
        return db_project

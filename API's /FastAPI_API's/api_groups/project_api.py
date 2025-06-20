from fastapi import APIRouter, HTTPException, status

from models.projects import Projects
from schemas.ProjectsBase import ProjectsBase

from db_dep import db_dep

project_router = APIRouter(prefix="/projects", tags=["Projects"])


@project_router.get("/get-project/{id}/", status_code=status.HTTP_200_OK)
def get_project(id: int, db: db_dep):
    db_project = db.query(Projects).filter(Projects.id == id).first()
    if db_project is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project does not exist")
    else:
        return db_project


@project_router.post("/create-project/", status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectsBase, db: db_dep):
    db_project = Projects(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@project_router.put("/update-project/{id}", status_code=status.HTTP_201_CREATED)
def update_project(id: int, project: ProjectsBase, db: db_dep):
    db_project = db.query(Projects).filter(Projects.id == id).first()
    if db_project is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project does not exist")
    for key, value in project.model_dump(exclude_unset=True).items():
        setattr(db_project, key, value)

    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@project_router.delete("/delete-project/{id}", status_code=status.HTTP_202_ACCEPTED)
def delete_project(id: int, db: db_dep):
    db_project = db.query(Projects).filter(Projects.id == id).first()
    if db_project is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Project does not exist")
    db.delete(db_project)
    db.commit()

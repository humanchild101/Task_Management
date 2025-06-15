from fastapi import APIRouter, HTTPException, status

from models.users import Users
from schemas.UsersBase import UsersBase

from db_dep import db_dep

user_router = APIRouter(prefix="/users", tags=["Users"])


@user_router.get("/get-user/{id}/", status_code=status.HTTP_200_OK)
def get_user(id: int, db: db_dep):
    db_user = db.query(Users).filter(Users.id == id).first()
    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist")
    else:
        return db_user


@user_router.post("/create-user/", status_code=status.HTTP_201_CREATED)
def create_user(user: UsersBase, db: db_dep):
    db_user = Users(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@user_router.put("/update-user/{id}", status_code=status.HTTP_201_CREATED)
def update_user(id: int, user: UsersBase, db: db_dep):
    db_user = db.query(Users).filter(Users.id == id).first()
    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist")
    for key, value in user.model_dump(exclude_unset=True).items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@user_router.delete("/delete-user/{id}", status_code=status.HTTP_202_ACCEPTED)
def delete_user(id: int, db: db_dep):
    db_user = db.query(Users).filter(Users.id == id).first()
    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist")
    db.delete(db_user)
    db.commit()

from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status

from models.users import Users
from schemas.UsersBase import UsersBase, UserLogin

from db_dep import db_dep
from auth import create_access_token, get_current_user
from auth import bcrypt_context

user_dep = Annotated[dict, Depends(get_current_user)]

user_router = APIRouter(prefix="/users", tags=["Users"])


@user_router.get("/get-user/{id}/", status_code=status.HTTP_200_OK)
def get_user(user_d: user_dep, id: int, db: db_dep):
    if user_d is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    db_user = db.query(Users).filter(Users.id == id).first()
    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist")
    else:
        return db_user


@user_router.post("/create-user/", status_code=status.HTTP_201_CREATED)
def create_user(user_d: user_dep, user: UsersBase, db: db_dep):
    if user_d is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    db_user = Users(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@user_router.put("/update-user/{id}", status_code=status.HTTP_201_CREATED)
def update_user(user_d: user_dep, id: int, user: UsersBase, db: db_dep):
    if user_d is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

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
def delete_user(user_d: user_dep, id: int, db: db_dep):
    if user_d is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")

    db_user = db.query(Users).filter(Users.id == id).first()
    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User does not exist")
    db.delete(db_user)
    db.commit()


@user_router.post("/login", status_code=status.HTTP_200_OK)
def login(user: UserLogin, db: db_dep):
    db_user = db.query(Users).filter(Users.email == user.email).first()

    if db_user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Unauthorized")

    pass_w = db_user.password_hash
    if pass_w is not None:
        if not bcrypt_context.verify(user.password_hash, pass_w):
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect Password")

    token = create_access_token(db_user.email, db_user.id, timedelta(minutes=20))
    return {"access_token": token, "token_type": "bearer"}


@user_router.get("/home", status_code=status.HTTP_200_OK)
def get_cur_user(db: db_dep, cur_user: dict = Depends(get_current_user)):
    user = db.query(Users).filter(Users.id == cur_user["id"]).first()

    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Invalid User")

    return {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "id": user.id,
    }


@user_router.get("/all", status_code=status.HTTP_200_OK)
def get_all(db: db_dep):
    users = db.query(Users).all()

    return [
        {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "id": user.id,
        }
        for user in users
    ]

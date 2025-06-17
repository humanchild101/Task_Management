# from typing import Annotated
from fastapi import FastAPI
import uvicorn  # , HTTPException, status

# from sqlalchemy import inspect
# from database import engine, Base
from api_groups.project_api import project_router
from api_groups.user_api import user_router
from auth import router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)  # auth router
app.include_router(project_router)
app.include_router(user_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

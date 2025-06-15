from datetime import datetime
from pydantic import BaseModel, field_validator


class UsersBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    password_hash: str
    created_at: datetime
    updated_at: datetime

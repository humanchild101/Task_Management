from datetime import datetime
from pydantic import BaseModel, field_validator


class ProjectsBase(BaseModel):
    name: str
    description: str
    created_by: int
    is_archived: bool
    created_at: datetime
    updated_at: datetime

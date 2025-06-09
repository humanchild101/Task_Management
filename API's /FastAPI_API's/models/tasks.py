from sqlalchemy import *
from database import Base, metadata, engine


class Tasks(Base):
    __table__ = Table("tasks", metadata, autoload_with=engine)

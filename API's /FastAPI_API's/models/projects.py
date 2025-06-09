from sqlalchemy import *
from database import Base, metadata, engine


class Projects(Base):
    __table__ = Table("projects", metadata, autoload_with=engine)

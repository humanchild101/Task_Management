from sqlalchemy import *
from database import Base, metadata, engine


class Roles(Base):
    __table__ = Table("roles", metadata, autoload_with=engine)

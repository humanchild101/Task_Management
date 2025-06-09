from sqlalchemy import *
from database import Base, metadata, engine


class Status(Base):
    __table__ = Table("status", metadata, autoload_with=engine)

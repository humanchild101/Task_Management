from sqlalchemy import *
from database import Base, engine


class Users(Base):
    __table__ = Table("users", Base.metadata, autoload_with=engine)

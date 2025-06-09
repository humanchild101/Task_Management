from sqlalchemy import *
from database import Base, engine


class User_Projects(Base):
    __table__ = Table("user_projects", Base.metadata, autoload_with=engine)

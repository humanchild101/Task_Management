from sqlalchemy import *
from database import Base, metadata, engine


class Priority(Base):
    __table__ = Table("priority", metadata, autoload_with=engine)

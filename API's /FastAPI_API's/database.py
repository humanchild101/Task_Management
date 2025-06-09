from sqlalchemy import *
from sqlalchemy.orm import sessionmaker, declarative_base

SQL_DB_URL = "mysql+pymysql://root:u9*W5p%%40M_f@localhost:3306/task_management"

engine = create_engine(SQL_DB_URL, echo=True)

metadata = MetaData()
metadata.reflect(bind=engine)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime

app = FastAPI()

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Persona(BaseModel):
    name: str
    dni: int
    date: str
    from_date: str
    to_date: str
    is_gba: bool

class PersonaModel(Base):
    __tablename__ = "persona"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    dni = Column(Integer, unique=True, index=True)
    date = Column(DateTime, unique=True, index=True)
    is_gba = Column(Boolean, unique=True, index=True)

def get_persona(db: Session, name: str, dni: int, from_date: str, to_date: str, is_gba: bool):
    model = db.query(PersonaModel)
    if name == '':
        model = model.filter(PersonaModel.name == name)
    if dni == '':
        model = model.filter(PersonaModel.dni == dni)
    if is_gba == '':
        model = model.filter(PersonaModel.is_gba == is_gba)
    if from_date == '':
        model = model.filter(PersonaModel.from_date == from_date)
    return model.first()

def create_persona(db: Session, persona: Persona):
    datetime_object = datetime.strptime(persona.date, '%d-%m-%Y')
    db_persona = PersonaModel(
        name=persona.name,
        dni=persona.dni,
        date=datetime_object,
        is_gba=persona.is_gba
    )
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

@app.post("/persona/", response_model=Persona)
def create_user(persona: Persona, db: Session = Depends(get_db)):
    return create_persona(db=db, persona=persona)

@app.get("/persona/", response_model=Persona)
def read_persona(name: str, dni: int, from_date: str, to_date: str, is_gba: bool, db: Session = Depends(get_db)):
    persona = get_persona(db, name=name, dni=dni, from_date=from_date, to_date=to_date, is_gba=is_gba)
    if persona == None:
        raise HTTPException(status_code=400, detail="Name error")
    return persona
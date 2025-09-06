from fastapi import FastAPI
from sqlmodel import SQLModel
from .db import engine
from .routers import auth, events, registrations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mis Eventos API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLModel.metadata.create_all(engine)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(registrations.router)

@app.get("/")
def root():
    return {"message": "Welcome to Mis Eventos API"}

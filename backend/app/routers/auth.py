from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from ..schemas import UserCreate, UserRead, Token
from ..models import User
from ..auth import hash_password, verify_password, create_access_token
from ..db import get_session

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserRead)
def register(user_in: UserCreate, session: Session = Depends(get_session)):
    user = session.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    user = User(email=user_in.email, password_hash=hash_password(user_in.password), full_name=user_in.full_name)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer"}

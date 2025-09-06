from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserRead(BaseModel):
    id: UUID
    email: EmailStr
    full_name: Optional[str]
    role: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    capacity: int = 0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    status: Optional[str] = "draft"

class EventRead(BaseModel):
    id: UUID
    title: str
    description: Optional[str]
    location: Optional[str]
    capacity: Optional[int]
    status: str
    start_date: Optional[datetime]
    end_date: Optional[datetime]

    class Config:
        orm_mode = True

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    capacity: Optional[int] = None
    status: Optional[str] = None

class RegistrationBase(BaseModel):
    event_id: UUID
    user_id: UUID
    status: str

class RegistrationCreate(BaseModel):
    event_id: UUID

class RegistrationRead(RegistrationBase):
    id: UUID

    class Config:
        orm_mode = True

class RegistrationRequest(BaseModel):
    user_id: UUID
    full_name: Optional[str] = None

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from uuid import uuid4, UUID
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(index=True, nullable=False)
    password_hash: str
    full_name: Optional[str] = None
    role: str = Field(default="attendee")

    registrations: List["Registration"] = Relationship(back_populates="user")

class Event(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    title: str = Field(index=True)
    description: Optional[str] = None
    location: Optional[str] = None
    capacity: int = 0
    status: str = Field(default="draft")
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

    created_by: UUID = Field(default="ec4514b2-6579-4a40-8ecd-ec00da12b0c3")
    registrations: List["Registration"] = Relationship(back_populates="event")


class Registration(SQLModel, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    user_id: Optional[UUID] = Field(default=None, foreign_key="user.id")
    event_id: Optional[UUID] = Field(default=None, foreign_key="event.id")
    registered_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="active")

    user: Optional[User] = Relationship(back_populates="registrations")
    event: Optional[Event] = Relationship(back_populates="registrations")

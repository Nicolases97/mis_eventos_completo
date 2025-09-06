from typing import List
from uuid import UUID

from dns.e164 import query
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlmodel import select

from ..db import get_session
from ..deps import get_current_user
from ..models import User, Event, Registration
from ..schemas import EventRead

router = APIRouter(prefix="/event", tags=["events"])

@router.post("/{event_id}/register")
def register_authenticated_user_to_event(
    event_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    ev = session.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    if ev.status != "published":
        raise HTTPException(status_code=400, detail="El evento no está publicado")

    registrations_count = session.query(Registration).filter(Registration.event_id == event_id).count()
    if registrations_count >= 25:
        raise HTTPException(status_code=400, detail="Capacidad máxima alcanzada (25)")

    existing = session.query(Registration).filter(
        Registration.event_id == event_id,
        Registration.user_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Ya estás registrado en este evento")

    reg = Registration(event_id=event_id, user_id=current_user.id, status="active")
    session.add(reg)
    session.commit()
    session.refresh(reg)

    return {
        "ok": True,
        "message": f"{current_user.full_name} se registró exitosamente en el evento {ev.title}",
        "registration_id": str(reg.id)
    }

@router.delete("/{event_id}/unregister/{user_id}")
def unregister_user_from_event(
    event_id: UUID,
    user_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["organizer", "admin"]:
        raise HTTPException(status_code=403, detail="No tiene permiso para eliminar usuarios de eventos")

    registration = session.query(Registration).filter(
        Registration.event_id == event_id,
        Registration.user_id == user_id
    ).first()

    user = session.query(User).filter(User.id == registration.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if not registration:
        raise HTTPException(status_code=404, detail="El usuario no está registrado en este evento")

    session.delete(registration)
    session.commit()

    return {
        "ok": True,
        "message": f"{user.full_name} eliminado del evento {event_id}"
    }

@router.get("/my-registrations", response_model=List[EventRead])
def get_my_registrations(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    registrations = (
        session.query(Registration)
        .filter(Registration.user_id == current_user.id)
        .all()
    )

    events = [reg.event for reg in registrations]

    return events

@router.get("/my-registrations/{event_id}", response_model=EventRead)
def get_event_by_id(
    event_id: UUID,
    session: Session = Depends(get_session)
):
    event = session.exec(select(Event).where(Event.id == event_id)).first()

    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    return event
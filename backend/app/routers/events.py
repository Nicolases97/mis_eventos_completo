from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from sqlmodel import Session
from typing import List, Optional
from ..schemas import EventCreate, EventRead, EventUpdate
from ..models import Event
from ..db import get_session
from ..deps import get_current_user

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/", response_model=List[EventRead])
def list_events(
    q: Optional[str] = Query(None),
    page: int = 1,
    per_page: int = 10,
    session: Session = Depends(get_session)):
    stmt = session.query(Event)
    if q:
        stmt = stmt.filter(Event.title.ilike(f"%{q}%"))
    events = stmt.offset((page-1)*per_page).limit(per_page).all()
    return events

@router.get("/search", response_model=List[EventRead])
def search_events(
    title: str,
    page: int = 1,
    per_page: int = 10,
    session: Session = Depends(get_session)
):
    stmt = session.query(Event).filter(Event.title.ilike(f"%{title}%"))
    events = stmt.offset((page - 1) * per_page).limit(per_page).all()

    if not events:
        raise HTTPException(status_code=404, detail="No se encontraron eventos con ese nombre")

    return events

@router.post("/", response_model=EventRead)
def create_event(event_in: EventCreate, session: Session = Depends(get_session),
                 current_user=Depends(get_current_user)):
    if current_user.role not in ["organizer", "admin"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para crear eventos")

    if event_in.start_date and event_in.end_date and event_in.start_date >= event_in.end_date:
        raise HTTPException(status_code=400, detail="Fecha de inicio debe ser menor a fecha de cierre")
    ev = Event(**event_in.dict(), created_by=current_user.id)
    session.add(ev)
    session.commit()
    session.refresh(ev)
    return ev

@router.put("/{event_id}", response_model=EventRead)
def update_event(
    event_id: UUID,
    event_in: EventUpdate,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
    ev = session.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    if current_user.role not in ["organizer", "admin"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para actualizar eventos")

    if event_in.start_date and event_in.end_date and event_in.start_date >= event_in.end_date:
        raise HTTPException(status_code=400, detail="Fecha de inicio debe ser menor a fecha de cierre")
    if event_in.capacity is not None and event_in.capacity <= 0:
        raise HTTPException(status_code=400, detail="La capacidad debe ser mayor a 0")
    if ev.status == "cancelled":
        raise HTTPException(status_code=400, detail="No se puede actualizar un evento cancelado")


    for field, value in event_in.dict(exclude_unset=True).items():
        setattr(ev, field, value)

    session.commit()
    session.refresh(ev)
    return ev

@router.delete("/{event_id}")
def delete_event(
    event_id: UUID,
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user)
):
    ev = session.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    if ev.created_by != current_user.id and current_user.role != ["organizer", "admin"]:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar este evento")

    session.delete(ev)
    session.commit()
    return {"ok": True, "message": f"Evento {event_id} eliminado correctamente"}
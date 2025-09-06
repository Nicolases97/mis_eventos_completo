# Mis Eventos — Prueba Técnica

Este proyecto contiene el **backend (FastAPI + PostgreSQL)** para la prueba técnica.

## Requisitos

- Python 3.10+
- Docker + docker-compose (recomendado para PostgreSQL y backend)
- Git

## Estructura

```
mis_eventos/
├──backend/
│ ├── app/                 # Código principal del backend: routers (Auth, Events, Registrations, etc.) 
│ ├── .env/                # Variables de entorno (configuración de DB, SECRET_KEY, etc.)
│ ├── docker-composse.yml/ # Orquestación de servicios (PostgreSQL + Backend con FastAPI)
│ ├── Dockerfile           # Imagen del backend para despliegue
│ ├── pyproject.toml       # Dependencias y configuración del proyecto (Poetry)
│ └── README.MD            # Documentación
```

## Configuración Backend

1. Ir al directorio `backend`:
   ```bash
   cd backend
   ```

2. Ejecutar con Docker:
   ```bash
   docker-compose up --build
   ```

   Esto levantará:
   - `db`: contenedor de PostgreSQL (puerto 5432)
   - `backend`: API en http://localhost:8000


3. Documentación expuesta de la API en los siguientes puertos:
   - Docs: http://localhost:8000/docs
   - Redoc: http://localhost:8000/redoc


### Tests

En `backend/`:
```bash
pytest
```

## Roles

- Actualmente se soporta en el campo `role` en `User` (`attendee`, `organizer`, `admin`).

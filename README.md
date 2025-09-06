# Mis Eventos — Prueba Técnica

Este proyecto contiene el **backend (FastAPI + PostgreSQL)** para la prueba técnica.

## Requisitos

- Python 3.10+
- Node.js 18+
- npm o yarn
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

## Estructura Frontend

```
mis_eventos/
├──frontend/
│ ├── src/                 # Código principal del frontend (componentes, páginas, hooks, rutas, etc.) 
│ ├── .env/                # Variables de entorno (ej: VITE_API_URL)
│ ├── docker-composse.yml/ # Orquestación de servicios del frontend (opcional en desarrollo)
│ ├── Dockerfile           # Imagen del frontend para despliegue en producción
│ ├── index.html           # Archivo raíz HTML del proyecto
│ ├── package.config.js    # Dependencias y scripts del proyecto
│ ├── postcss.config.js    # Configuración de PostCSS (para Tailwind CSS)
│ ├── README.MD            # Documentación
│ ├── tailwind.config.js   # Configuración de Tailwind CSS
│ └── vite.config.js       # Configuración de Vite
```

## Configuración Frontend

1. Ir al directorio `frontend`:
   ```bash
   cd frontend
   ```

2. Ejecutar con Docker:
   ```bash
   docker-compose up --build
   ```

   Esto levantará:
   - `db`: contenedor de PostgreSQL (puerto 5432)
   - `frontend`: API en http://localhost:5173


## Flujo de uso

1. Login o Registro de usuario.
2. Listar eventos disponibles.
3. Crear eventos (solo organizadores/admin).
4. Publicar evento → visible para otros usuarios.
5. Registrarse en evento publicado.
6. Revisar en perfil los eventos inscritos.

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


Vista del login
<img width="1350" height="914" alt="image" src="https://github.com/user-attachments/assets/efaff3b0-40c5-4c06-b7b5-ca0e36255bcf" />

Vista de registro 
<img width="1354" height="915" alt="image" src="https://github.com/user-attachments/assets/344461d1-c9f2-48c7-a9c6-0024b6e043fc" />

Vista del listado de los eventos disponibles
<img width="1371" height="899" alt="image" src="https://github.com/user-attachments/assets/565be7a0-c4dc-45e8-8a22-71b4862b1ce2" />

Vista creación de eventos
<img width="1374" height="928" alt="image" src="https://github.com/user-attachments/assets/c82b0d50-7416-4346-be10-15ce47ebfdfc" />

Vista de busqueda de eventos
<img width="1425" height="883" alt="image" src="https://github.com/user-attachments/assets/7bd533f7-9175-4ecd-8368-86c404ab888f" />

Vista inscripción de eventos disponibles
<img width="1452" height="623" alt="image" src="https://github.com/user-attachments/assets/efd6f24f-020f-4d6a-85c9-3f57701f5056" />

Vista inscripción de evento
<img width="1387" height="751" alt="image" src="https://github.com/user-attachments/assets/a8c2b20e-f8a7-4d70-b6e0-bf83935b57d6" />

Vista de mis eventos inscritos
<img width="1314" height="681" alt="image" src="https://github.com/user-attachments/assets/7fd6a27d-02c6-4806-90f3-f97bfd4678d8" />

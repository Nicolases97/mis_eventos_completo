# Mis Eventos — Prueba Técnica
[README.md](README.md)
Este proyecto contiene el **frontend (React)** para la prueba técnica.

## Requisitos

- Node.js 18+
- npm o yarn
- Docker + docker-compose
- Git

## Estructura

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

1. Ejecutar con Docker:
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


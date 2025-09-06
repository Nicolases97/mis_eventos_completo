FROM python:3.10-slim
WORKDIR /usr/src/app
COPY pyproject.toml poetry.lock* /usr/src/app/
RUN pip install "poetry" && \
    poetry config virtualenvs.create false && \
    poetry install --no-root --no-interaction --no-ansi
COPY . /usr/src/app
EXPOSE 8000
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build || cat /root/.npm/_logs/*-debug-*.log

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


FROM python:3.10-slim
WORKDIR /usr/src/app
COPY pyproject.toml poetry.lock* /usr/src/app/
RUN pip install "poetry" && \
    poetry config virtualenvs.create false && \
    poetry install --no-root --no-interaction --no-ansi
COPY . /usr/src/app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

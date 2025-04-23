FROM python:3.10.12
ENV PYTHONBUFFERED=1

COPY . /app
WORKDIR /app/services/content-service

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

ENV HOST="0.0.0.0"
ENV PORT="8000"
ENV DJANGO_ALLOWED_HOSTS="*"

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver $HOST:$PORT"]
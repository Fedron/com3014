FROM python:3.13.2
ENV PYTHONUNBUFFERED=1

COPY . /app
WORKDIR /app/services/community-service

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

ENV HOST="0.0.0.0"
ENV PORT="8000"
ENV DJANGO_ALLOWED_HOSTS="*"

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver $HOST:$PORT"]
# 1. Python 3.14 slim image
FROM python:3.14.0a6

# 2. Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy your requirements file into the container
COPY requirements.txt /app/

# 5. Upgrade pip and install Python dependencies from requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# 6. Copy the rest of your project into the app directory
COPY . /app/

# 7. Expose the port that Django will run on
EXPOSE 8000

# 8. Run migrations and start the development server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

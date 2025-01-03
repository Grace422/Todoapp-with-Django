FROM python:3.12

WORKDIR /taskapp

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8001

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]
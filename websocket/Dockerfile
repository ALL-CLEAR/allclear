FROM python:3.9
WORKDIR /data
COPY ./requirements.txt /data/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /data/requirements.txt
COPY . /data
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3023"]
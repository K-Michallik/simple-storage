FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY src/app /app

# Make port 51600 available to the world outside this container
EXPOSE 51600

# Run server.py when the container launches
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "51600"]
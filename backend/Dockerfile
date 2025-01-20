# Use a base image with Java
FROM openjdk:11-slim

# Set the working directory
WORKDIR /app

# Copy your source code into the container
COPY src /app/src

# Copy the libs directory to include external libraries
COPY libs /app/libs

# Compile your Java code (if needed)
RUN javac -d bin -cp "libs/*" src/*.java

# Expose the port your application will run on
EXPOSE 8080

# Command to run your Java application
CMD ["java", "-cp", "bin:libs/*", "Main"]

FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar /app

EXPOSE 3025

CMD ["java", "-jar", "/app/farm-service-0.0.1-SNAPSHOT.jar"]
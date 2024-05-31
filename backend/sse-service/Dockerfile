FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar /app

EXPOSE 3022

CMD ["java", "-jar", "/app/sse-service-0.0.1-SNAPSHOT.jar"]
FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar /app

EXPOSE 3024

CMD ["java", "-jar", "/app/state-service-0.0.1-SNAPSHOT.jar"]
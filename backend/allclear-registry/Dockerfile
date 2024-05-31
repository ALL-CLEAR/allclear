FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar /app

EXPOSE 3020

CMD ["java", "-jar", "/app/allclear-registry-0.0.1-SNAPSHOT.jar"]
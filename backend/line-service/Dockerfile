FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar /app

EXPOSE 3027

CMD ["java", "-jar", "/app/line-service-0.0.1-SNAPSHOT.jar"]
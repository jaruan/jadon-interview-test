FROM openjdk:11-jre-slim

VOLUME tmp
WORKDIR .
COPY ./target/*.jar app.jar

CMD ["java", "-jar", "/app.jar"]

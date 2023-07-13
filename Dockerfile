FROM gradle:8.1.1-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:17-jdk-alpine
EXPOSE 8083
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/snippet-service.jar
ENTRYPOINT ["java", "-jar","/app/snippet-ui.jar"]
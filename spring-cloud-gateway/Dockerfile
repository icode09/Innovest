FROM openjdk:11-jre-slim

ADD ./target/gateway-1.0.0.jar /usr/src/gateway-1.0.0.jar

WORKDIR usr/src

ENTRYPOINT ["java","-jar", "gateway-1.0.0.jar"]

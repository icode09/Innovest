FROM openjdk:11

EXPOSE 8105

ADD ./target/searchService-0.0.1-SNAPSHOT.jar searchService-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar", "/searchService-0.0.1-SNAPSHOT.jar"]

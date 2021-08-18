package com.stackroute.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                //mention all the routes of all the services
        		.route(r -> r.path("/innovest/challenge/**")
                        .uri("http://localhost:8085/"))
                       // .id("challenge_create_service_Module"))

                .route(r -> r.path("/api/v1/register/**")
                        .uri("http://localhost:8082/"))
                        //.id("SignupModule"))
                
                .route(r -> r.path("/login")
                        .uri("http://localhost:8090/"))
                        //.id("LoginModule"))
                .route(r -> r.path("/solutions/**")
                        .uri("http://localhost:8100/"))
                        //.id("SignupModule"))
                .route(r -> r.path("/post")
                        .uri("http://localhost:8110/"))
                        //.id("FileuploadModule"))
                .route(r -> r.path("/api/challenge/**")
                        .uri("http://localhost:8105/"))
                
                .route(r -> r.path("/api/v1/feedback/**")
                        .uri("http://localhost:8070/"))
                
                .build();
    }
}
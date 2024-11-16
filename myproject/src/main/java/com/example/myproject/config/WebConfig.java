package com.example.myproject.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("http://127.0.0.1:3000", "http://localhost:3000") // Allow specific origins
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS") // Allow specific HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (cookies, authorization headers)
    }
}

package com.example.myproject.config;

import com.example.myproject.jwt.AuthEntryPointJwt;
import com.example.myproject.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.sql.DataSource;
import java.util.Arrays;

@Configuration
@EnableWebMvc
public class SecurityConfig {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }


//    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(authorizeRequests ->
//                authorizeRequests.requestMatchers("/signin").permitAll()
//                        .anyRequest().authenticated());
//        http.sessionManagement(
//                        session ->
//                                session.sessionCreationPolicy(
//                                        SessionCreationPolicy.STATELESS)
//                )
//                .httpBasic();
//        http.csrf(csrf -> csrf.disable());
//
//        http.addFilterBefore(authenticationJwtTokenFilter(),
//                UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
@Bean
public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    // Enable CORS support
    http.cors().and()
            .authorizeHttpRequests(authorizeRequests ->
                    authorizeRequests
                            .requestMatchers("/signin").permitAll() // Allow the /signin endpoint without authentication
                            .anyRequest().authenticated()) // Other requests require authentication
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session for JWT
            .httpBasic().disable(); // Disable HTTP Basic Authentication if using JWT

    // Disable CSRF for stateless APIs
    http.csrf(csrf -> csrf.disable());

    // Add JWT token filter
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
}


    @Bean
    public JdbcUserDetailsManager jdbcUserDetailsManager() {
        // This explicitly defines JdbcUserDetailsManager as a Spring Bean
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);




        // Check if the admin user exists, and create it if not
        if (!jdbcUserDetailsManager.userExists("admin")) {
            // Create user with 'enabled' field
            UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername("admin")
                    .password(passwordEncoder().encode("admin123"))
                    .roles("ADMIN")
                    .disabled(false) // Enable the admin user
                    .build();
            jdbcUserDetailsManager.createUser(userDetails);
//            jdbcUserDetailsManager.getJdbcTemplate().update(
//                    "INSERT INTO authorities (username, authority) VALUES (?, ?)",
//                    "admin", "ROLE_ADMIN"
//            );
        }

        return jdbcUserDetailsManager;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://127.0.0.1:3000", "http://localhost:3000")); // Add your frontend URLs
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allow methods
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Allowed headers
        config.setAllowCredentials(true); // Allow credentials (cookies)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Apply to all endpoints
        return source;
    }


}

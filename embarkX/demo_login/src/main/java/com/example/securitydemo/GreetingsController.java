package com.example.securitydemo;
import com.example.securitydemo.jwt.JwtUtils;



import com.example.securitydemo.jwt.JwtUtils;
import com.example.securitydemo.jwt.LoginRequest;
import com.example.securitydemo.jwt.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
public class GreetingsController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/hello")
    public String sayHello(){
        return "Hello";
    }

//    @GetMapping("/courses")
//    public String sendCourses(){
//        return "Courses";
//    }

//    @GetMapping("/courses")
//    @ResponseBody
//    public List<Course> sendCourses(@RequestHeader("Authorization") String token) {
//        // Dummy token validation (replace with actual validation logic)
//        if (!"valid_token".equals(token)) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
//        }
//
//        // Create a dummy course list
//        List<Course> courses = new ArrayList<>();
//        courses.add(new Course(1, "Mathematics 101", "Dr. Smith", null, true));
//        courses.add(new Course(2, "Physics 101", "Dr. Johnson", "Mathematics 101", false));
//        courses.add(new Course(3, "Chemistry 101", "Dr. Brown", null, true));
//
//        return courses; // This dummy list will be automatically converted to JSON
//    }

//    @GetMapping("/courses")
//    @ResponseBody
//    public List<Course> sendCourses(@RequestHeader("Authorization") String token) {
//        // Log the token for debugging purposes
//        System.out.println("Received token: " + token);

//        // Dummy token validation (replace with actual validation logic)
//        if (!"valid_token".equals(token)) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
//        }

//        // Create a dummy course list
//        List<Course> courses = new ArrayList<>();
//        courses.add(new Course(1, "Mathematics 101", "Dr. Smith", null, true));
//        courses.add(new Course(2, "Physics 101", "Dr. Johnson", "Mathematics 101", false));
//        courses.add(new Course(3, "Chemistry 101", "Dr. Brown", null, true));

//        return courses; // This dummy list will be automatically converted to JSON
//    }

    @GetMapping("/courses")
    @ResponseBody
    public List<Course> sendCourses(HttpServletRequest request) {

        List<Course> courses = new ArrayList<>();
        courses.add(new Course(1, "Mathematics 101", "Dr. Smith", null, true));
        courses.add(new Course(2, "Physics 101", "Dr. Johnson", "Mathematics 101", false));
        courses.add(new Course(3, "Chemistry 101", "Dr. Brown", null, true));

        return courses; // This dummy list will be automatically converted to JSON
    }


    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public String userEndpoint(){
        return "Hello, User!";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminEndpoint(){
        return "Hello, Admin!";
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        LoginResponse response = new LoginResponse(userDetails.getUsername(), roles, jwtToken);

        return ResponseEntity.ok(response);
    }
}

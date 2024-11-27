package com.example.myproject.controller;

import com.example.myproject.dto.AvailableCourseDTO;
import com.example.myproject.dto.CourseEnrollmentRequest;
import com.example.myproject.dto.StudentCoursesDTO;
import com.example.myproject.service.CourseService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;


    @GetMapping("/available")
    public ResponseEntity<List<AvailableCourseDTO>> getAvailableCourses(
//            @RequestParam String rollno,
            @RequestParam String term,
            HttpServletRequest request) {
        List<AvailableCourseDTO> courseDetails = courseService.getAvailableCourses(request, term);
        return ResponseEntity.ok(courseDetails);
    }

    @PostMapping("/enroll")
    public ResponseEntity<Map<String, String>> enrollStudent(@RequestBody CourseEnrollmentRequest request, HttpServletRequest httpServletRequest) {
        Map<String, String> response = courseService.enrollStudent(request,httpServletRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}


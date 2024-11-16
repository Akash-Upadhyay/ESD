package com.example.myproject.controller;

import com.example.myproject.dto.CourseDTO;
import com.example.myproject.dto.CoursePrerequisiteDTO;
import com.example.myproject.dto.StudentCoursesDTO;
import com.example.myproject.dto.StudentDTO;
import com.example.myproject.entity.Course;
import com.example.myproject.entity.CoursePrerequisite;
import com.example.myproject.entity.Student;
import com.example.myproject.entity.StudentCourses;
import com.example.myproject.repo.CoursePrerequisiteRepository;
import com.example.myproject.repo.CourseRepository;
import com.example.myproject.repo.StudentCoursesRepository;
import com.example.myproject.repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import com.example.myproject.mapper.CoursePrerequisiteMapper;


import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {


    @Autowired
    private StudentCoursesRepository studentCoursesRepository;

    @Autowired
    private JdbcUserDetailsManager jdbcUserDetailsManager;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CoursePrerequisiteRepository coursePrerequisiteRepository;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (!jdbcUserDetailsManager.userExists(username)) {
            UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(username)
                    .password(passwordEncoder.encode(password))
                    .roles("STUDENT")
                    .disabled(false) // Enable the admin user
                    .build();
            jdbcUserDetailsManager.createUser(userDetails);
        }
        return ResponseEntity.ok("User created successfully");
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        jdbcUserDetailsManager.deleteUser(username);  // Delete user using JdbcUserDetailsManager
        return ResponseEntity.ok("User deleted successfully");
    }


    @PostMapping("/createstudent")
    public ResponseEntity<String> createStudent(@RequestBody StudentDTO studentDTO) {
        // Convert StudentDTO to Student entity
        Student student = new Student();
        student.setRollNo(studentDTO.getRollNo());
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        student.setPathForPhoto(studentDTO.getPathForPhoto());
        student.setCgpa(studentDTO.getCgpa());
        student.setTotalCredits(studentDTO.getTotalCredits());
        student.setGraduationYear(studentDTO.getGraduationYear());

        // Save the student to the database
        studentRepository.save(student);

        return ResponseEntity.status(HttpStatus.CREATED).body("Student created successfully");
    }


    @PostMapping("/createcourse")
    public ResponseEntity<String> createCourse(@RequestBody CourseDTO courseDTO) {
        // Convert CourseDTO to Course entity
        Course course = new Course();
        course.setCourseCode(courseDTO.getCourseCode());
        course.setName(courseDTO.getName());
        course.setDescription(courseDTO.getDescription());
        course.setYear(courseDTO.getYear());
        course.setTerm(courseDTO.getTerm());
        course.setFaculty(courseDTO.getFaculty());
        course.setCredit(courseDTO.getCredit());
        course.setCapacity(courseDTO.getCapacity());

        // Save the course to the database
        courseRepository.save(course);

        return ResponseEntity.status(HttpStatus.CREATED).body("Course created successfully");
    }


    @PostMapping("/createpre")
    public ResponseEntity<String> createPrerequisite(@RequestBody CoursePrerequisiteDTO coursePrerequisiteDTO) {
        // Find the course and prerequisite course entities by their course codes
        Course course = courseRepository.findByCourseCode(coursePrerequisiteDTO.getCourseCode())
                .orElseThrow(() -> new IllegalArgumentException("Course not found with code: " + coursePrerequisiteDTO.getCourseCode()));

        Course prerequisite = courseRepository.findByCourseCode(coursePrerequisiteDTO.getPrerequisiteCode())
                .orElseThrow(() -> new IllegalArgumentException("Prerequisite course not found with code: " + coursePrerequisiteDTO.getPrerequisiteCode()));

        // Create and populate the CoursePrerequisite entity
        CoursePrerequisite coursePrerequisite = new CoursePrerequisite();
        coursePrerequisite.setCourse(course);
        coursePrerequisite.setPrerequisite(prerequisite);

        // Save the prerequisite to the database
        coursePrerequisiteRepository.save(coursePrerequisite);

        return ResponseEntity.status(HttpStatus.CREATED).body("Course prerequisite created successfully");
    }

    @PostMapping("/studentcourse")
    public ResponseEntity<String> enrollStudentInCourse(@RequestBody StudentCoursesDTO studentCoursesDTO) {
        // Find the student by roll number
        var student = studentRepository.findByRollNo(studentCoursesDTO.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found with roll number: " + studentCoursesDTO.getStudentId()));

        // Find the course by course code
        var course = courseRepository.findByCourseCode(studentCoursesDTO.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course not found with code: " + studentCoursesDTO.getCourseId()));

        // Create and populate the StudentCourses entity
        StudentCourses studentCourses = new StudentCourses();
        studentCourses.setStudent(student);
        studentCourses.setCourse(course);
        studentCourses.setGradeId(studentCoursesDTO.getGradeId());

        // Save the enrollment to the database
        studentCoursesRepository.save(studentCourses);

        // Return success response
        return ResponseEntity.status(HttpStatus.CREATED).body("Student enrolled in course successfully");
    }


}

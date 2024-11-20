package com.example.myproject.controller;


import com.example.myproject.dto.AvailableCourseDTO;
import com.example.myproject.dto.CourseDTO;
import com.example.myproject.dto.CourseEnrollmentRequest;
import com.example.myproject.dto.StudentCoursesDTO;
import com.example.myproject.entity.Course;
import com.example.myproject.entity.CoursePrerequisite;
import com.example.myproject.entity.StudentCourses;
import com.example.myproject.repo.CoursePrerequisiteRepository;
import com.example.myproject.repo.CourseRepository;
import com.example.myproject.repo.StudentCoursesRepository;
import com.example.myproject.repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentCoursesRepository studentCoursesRepository;

    @Autowired
    private CoursePrerequisiteRepository coursePrerequisiteRepository;

    @Autowired
    private StudentRepository studentRepository;

//    @GetMapping("/available")
//    public ResponseEntity<List<CourseDTO>> getAvailableCourses(
//            @RequestParam String rollno,
//            @RequestParam String term) {
//
//        // Fetch courses for the specified term
//        List<Course> coursesInTerm = courseRepository.findByTerm(term);
//
////         Fetch student courses based on the roll number
//        List<StudentCourses> studentCourses = studentCoursesRepository.findByStudent_RollNo(rollno);
//
//        // Print the courses in the specified term
//        System.out.println("Courses available in the term " + term + ":");
//        coursesInTerm.forEach(course -> {
//            System.out.println("Course Code: " + course.getCourseCode() + ", Course Name: " + course.getName());
//        });
//
//        // Print the courses completed by the student (if any)
//        System.out.println("Courses completed by student with rollno " + rollno + ":");
//        studentCourses.forEach(studentCourse -> {
//            System.out.println("Course Code: " + studentCourse.getCourse().getCourseCode() +
//                    ", Course Name: " + studentCourse.getCourse().getName() +
//                    ", Grade: " + studentCourse.getGradeId());
//        });
//
//        for (Course course : coursesInTerm) {
//            // Fetch prerequisites for the current course
//            List<CoursePrerequisite> prerequisites = coursePrerequisiteRepository.findByCourse_CourseCode(course.getCourseCode());
//
//            // Print the current course details
//            System.out.println("Checking course: " + course.getCourseCode() + " - " + course.getName());
//
//            // Print prerequisites for the current course
//            System.out.println("Prerequisites for " + course.getCourseCode() + ":");
//            prerequisites.forEach(prerequisite -> {
//                System.out.println("  Prerequisite Course Code: " + prerequisite.getPrerequisite().getCourseCode() +
//                        ", Course Name: " + prerequisite.getPrerequisite().getName());
//            });
//        }
//
//        List<Course> availableCourses = new ArrayList<>();
//        for (Course course : coursesInTerm) {
//            // Check if the course is completed by the student
//            boolean isCompleted = false;
//            for (StudentCourses studentCourse : studentCourses) {
//                if (studentCourse.getCourse().getCourseCode().equals(course.getCourseCode())) {
//                    isCompleted = true;
//                    break;
//                }
//            }
//
//            // If the course is not completed, add it to the available list
//            if (!isCompleted) {
//                availableCourses.add(course);
//            }
//        }
//
//        // Print available courses that the student has not completed
//        System.out.println("Available courses for student " + rollno + " in the term " + term + ":");
//        availableCourses.forEach(course -> {
//            System.out.println("Course Code: " + course.getCourseCode() + ", Course Name: " + course.getName());
//        });
//
//        // Return a placeholder response for now (you can modify this later to return the actual available courses)
//        return ResponseEntity.ok(null);
//    }
        // Placeholder response for now


    //working with the two api logic --

//    @GetMapping("/available")
//    public ResponseEntity<List<AvailableCourseDTO>> getAvailableCourses(
//            @RequestParam String rollno,
//            @RequestParam String term) {

//        // Fetch courses for the specified term
//        List<Course> coursesInTerm = courseRepository.findByTerm(term);

//        //Fetch student courses based on the roll number
//        List<StudentCourses> studentCourses = studentCoursesRepository.findByStudent_RollNo(rollno);

//        // Extract the course codes of completed courses
//        List<String> completedCourseCodes = studentCourses.stream()
//                .map(sc -> sc.getCourse().getCourseCode())
//                .toList();

//        // Step 3: Filter out courses that the student has already completed
//        List<Course> availableCourses = coursesInTerm.stream()
//                .filter(course -> !completedCourseCodes.contains(course.getCourseCode()))
//                .toList();

//        // Step 4: Build the response with course details and prerequisites
//        List<AvailableCourseDTO> courseDetails = new ArrayList<>();

//        for (Course course : availableCourses) {
//            // Fetch prerequisites for the current course
//            List<CoursePrerequisite> prerequisites = coursePrerequisiteRepository.findByCourse_CourseCode(course.getCourseCode());

//            // Extract prerequisite course codes
//            List<String> prerequisiteCodes = prerequisites.stream()
//                    .map(prerequisite -> prerequisite.getPrerequisite().getCourseCode())
//                    .collect(Collectors.toList());

//            // Create an AvailableCourseDTO object
//            AvailableCourseDTO courseDTO = new AvailableCourseDTO();
//            courseDTO.setName(course.getName());
//            courseDTO.setCourseCode(course.getCourseCode());
//            courseDTO.setProfessor(course.getFaculty());
//            courseDTO.setCredits(course.getCredit());
//            courseDTO.setPrerequisites(prerequisiteCodes);

//            // Add to the response list
//            courseDetails.add(courseDTO);
//        }

//        // Step 5: Return the response
//        return ResponseEntity.ok(courseDetails);

//    }


//    @GetMapping("/completed")
//    public ResponseEntity<List<String>> getCompletedCourses(
//            @RequestParam String rollno) {

//        // Fetch courses completed by the student
//        List<StudentCourses> studentCourses = studentCoursesRepository.findByStudent_RollNo(rollno);

//        // Extract the course codes of completed courses
//        List<String> completedCourseCodes = studentCourses.stream()
//                .map(studentCourse -> studentCourse.getCourse().getCourseCode())
//                .collect(Collectors.toList());

//        // Return the list of completed course codes
//        return ResponseEntity.ok(completedCourseCodes);
//    }


    @GetMapping("/available")
    public ResponseEntity<List<AvailableCourseDTO>> getAvailableCourses(
            @RequestParam String rollno,
            @RequestParam String term) {
        // Fetch courses for the specified term
        List<Course> coursesInTerm = courseRepository.findByTerm(term);

        // Fetch student courses based on the roll number
        List<StudentCourses> studentCourses = studentCoursesRepository.findByStudent_RollNo(rollno);

        // Extract the course codes of completed courses
        List<String> completedCourseCodes = studentCourses.stream()
                .map(sc -> sc.getCourse().getCourseCode())
                .toList();

        // Step 3: Filter courses based on prerequisite satisfaction
        List<AvailableCourseDTO> courseDetails = new ArrayList<>();

        for (Course course : coursesInTerm) {
            // Fetch prerequisites for the current course

            if (completedCourseCodes.contains(course.getCourseCode())) {
                continue;
            }
            
            List<CoursePrerequisite> prerequisites = coursePrerequisiteRepository.findByCourse_CourseCode(course.getCourseCode());

            // Extract prerequisite course codes
            List<String> prerequisiteCodes = prerequisites.stream()
                    .map(prerequisite -> prerequisite.getPrerequisite().getCourseCode())
                    .toList();

            // Check if all prerequisites are met
            boolean prerequisitesMet = prerequisiteCodes.isEmpty() || completedCourseCodes.containsAll(prerequisiteCodes);

            if (prerequisitesMet) {
                // Create an AvailableCourseDTO object
                AvailableCourseDTO courseDTO = new AvailableCourseDTO();
                courseDTO.setName(course.getName());
                courseDTO.setCourseCode(course.getCourseCode());
                courseDTO.setProfessor(course.getFaculty());
                courseDTO.setCredits(course.getCredit());
                courseDTO.setPrerequisites(prerequisiteCodes);

                // Add to the response list
                courseDetails.add(courseDTO);
            }
        }

        // Step 4: Return the response
        return ResponseEntity.ok(courseDetails);
    }



    @PostMapping("/enroll")
    public ResponseEntity<String> enrollStudent(@RequestBody CourseEnrollmentRequest request) {
        // Extract  and selected courses
        System.out.println("Received request: " + request);

        String rollno = request.getRollno();
        List<String> selectedCourses = request.getSelectedCourses();


        if (selectedCourses == null || selectedCourses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No courses selected for enrollment.");
        }

        for (String courseId : selectedCourses) {
            // Create a new StudentCoursesDTO for each course
            StudentCoursesDTO studentCoursesDTO = new StudentCoursesDTO();
            studentCoursesDTO.setStudentId(rollno); // Student ID from the request
            studentCoursesDTO.setCourseId(courseId); // Current course ID from the list
            studentCoursesDTO.setGradeId("Enrolled"); // Assuming a default grade, modify if needed

            // Call the existing enrollStudentInCourse method
            enrollStudentInCourse_Student(studentCoursesDTO);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Student enrollment initiated for all courses.");
    }


    public ResponseEntity<String> enrollStudentInCourse_Student(@RequestBody StudentCoursesDTO studentCoursesDTO) {
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


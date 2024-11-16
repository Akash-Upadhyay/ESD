//package com.example.myproject.service;
//
//import com.example.myproject.dto.CourseDTO;
//import com.example.myproject.entity.Course;
//import com.example.myproject.entity.Student;
//import com.example.myproject.repo.CourseRepository;
//import com.example.myproject.repo.StudentCoursesRepository;
//import com.example.myproject.repo.StudentRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class CourseService {
//
//    @Autowired
//    private CourseRepository courseRepository;
//
//    @Autowired
//    private StudentRepository studentRepository;
//
//    @Autowired
//    private StudentCoursesRepository studentCoursesRepository;
//
//    // Method to fetch courses by term excluding those already taken by the student
//    public List<CourseDTO> getCoursesByTermExcludingTaken(String rollNo, String term) {
//        // Fetch student details by roll number
//        Student student = studentRepository.findByRollNo(rollNo)
//                .orElseThrow(() -> new RuntimeException("Student not found with roll number: " + rollNo));
//
//        // Fetch IDs of courses the student has already taken
//        List<Long> takenCourseIds = studentCoursesRepository.findCourseIdsByStudentId(student.getId());
//
//        // Fetch courses offered in the specified term (Winter)
//        List<Course> courses = courseRepository.findByTerm(term);
//
//        // Filter out courses the student has already taken
//        List<Course> availableCourses = courses.stream()
//                .filter(course -> !takenCourseIds.contains(course.getCourseId()))
//                .collect(Collectors.toList());
//
//        // Map the remaining courses to DTOs
//        return availableCourses.stream()
//                .map(course -> {
//                    CourseDTO dto = new CourseDTO();
//                    dto.setCourseId(course.getCourseId());
//                    dto.setCourseCode(course.getCourseCode());
//                    dto.setName(course.getName());
//                    dto.setDescription(course.getDescription());
//                    dto.setYear(course.getYear());
//                    dto.setTerm(course.getTerm());
//                    dto.setFaculty(course.getFaculty());
//                    dto.setCredit(course.getCredit());
//                    dto.setCapacity(course.getCapacity());
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }
//}
//

package com.example.myproject.service;

import com.example.myproject.dto.AvailableCourseDTO;
import com.example.myproject.dto.CourseEnrollmentRequest;
import com.example.myproject.dto.StudentCoursesDTO;
import com.example.myproject.entity.Course;
import com.example.myproject.entity.CoursePrerequisite;
import com.example.myproject.entity.StudentCourses;
import com.example.myproject.jwt.JwtUtils;
import com.example.myproject.repo.CoursePrerequisiteRepository;
import com.example.myproject.repo.CourseRepository;
import com.example.myproject.repo.StudentCoursesRepository;
import com.example.myproject.repo.StudentRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentCoursesRepository studentCoursesRepository;

    @Autowired
    private CoursePrerequisiteRepository coursePrerequisiteRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtUtils jwtUtils;


    public String getRollNumber(HttpServletRequest req) {
        String auth = req.getHeader("Authorization");

        String token = auth !=null && auth.startsWith("Bearer ") ? auth.substring(7) : null;

        return (token != null) ? jwtUtils.getUserNameFromJwtToken(token) : null;
    }
    public List<AvailableCourseDTO> getAvailableCourses(HttpServletRequest request, String term) {
        String rollno = getRollNumber(request);
        List<Course> coursesInTerm = courseRepository.findByTerm(term);
        List<StudentCourses> studentCourses = studentCoursesRepository.findByStudent_RollNo(rollno);
        List<String> completedCourseCodes = studentCourses.stream()
                .map(sc -> sc.getCourse().getCourseCode())
                .toList();

        List<AvailableCourseDTO> courseDetails = new ArrayList<>();
        for (Course course : coursesInTerm) {
            if (completedCourseCodes.contains(course.getCourseCode())) {
                continue; // Skip completed courses
            }

            List<CoursePrerequisite> prerequisites = coursePrerequisiteRepository.findByCourse_CourseCode(course.getCourseCode());
            List<String> prerequisiteCodes = prerequisites.stream()
                    .map(prerequisite -> prerequisite.getPrerequisite().getCourseCode())
                    .toList();

            boolean prerequisitesMet = prerequisiteCodes.isEmpty() || completedCourseCodes.containsAll(prerequisiteCodes);

            AvailableCourseDTO courseDTO = new AvailableCourseDTO();
            courseDTO.setName(course.getName());
            courseDTO.setCourseCode(course.getCourseCode());
            courseDTO.setProfessor(course.getFaculty());
            courseDTO.setCredits(course.getCredit());
            courseDTO.setPrerequisites(prerequisiteCodes);
            courseDTO.setEligible(prerequisitesMet);

            courseDetails.add(courseDTO);
        }
        return courseDetails;
    }



    public Map<String, String> enrollStudent(CourseEnrollmentRequest request, HttpServletRequest httpServletRequest) {
        String rollno = getRollNumber(httpServletRequest);
        List<String> selectedCourses = request.getSelectedCourses();

        // Check if selected courses count is within the allowed range (4-6)
        if (selectedCourses == null || selectedCourses.isEmpty() || selectedCourses.size() < 4 || selectedCourses.size() > 6) {
            return Map.of("message", "You must select between 4 and 6 courses for enrollment.");
        }

        // Check if all course codes in the list are unique
        if (selectedCourses.size() != selectedCourses.stream().distinct().count()) {
            return Map.of("message", "Duplicate course codes are not allowed. All selected courses must be unique.");
        }

        // Fetch completed courses for the student
        List<StudentCourses> studentCourses = studentCoursesRepository.findByStudent_RollNo(rollno);
        List<String> completedCourseCodes = studentCourses.stream()
                .map(sc -> sc.getCourse().getCourseCode())
                .toList();

        // Check prerequisites for all selected courses
        for (String courseId : selectedCourses) {
            // Check if the course is already completed
            if (completedCourseCodes.contains(courseId)) {
                return Map.of("message", "Course " + courseId + " has already been completed by the student.");
            }

            List<CoursePrerequisite> prerequisites = coursePrerequisiteRepository.findByCourse_CourseCode(courseId);
            List<String> prerequisiteCodes = prerequisites.stream()
                    .map(prerequisite -> prerequisite.getPrerequisite().getCourseCode())
                    .toList();

            // Validate that all prerequisites are completed
            if (!completedCourseCodes.containsAll(prerequisiteCodes)) {
                return Map.of("message", "Prerequisites for course " + courseId + " are not completed.");
            }
        }

        // Proceed with enrollment if all checks pass
        for (String courseId : selectedCourses) {
            StudentCoursesDTO studentCoursesDTO = new StudentCoursesDTO();
            studentCoursesDTO.setStudentId(rollno);
            studentCoursesDTO.setCourseId(courseId);
            studentCoursesDTO.setGradeId("Enrolled");
            enrollStudentInCourse(studentCoursesDTO);
        }

        // Return success message after successful enrollment
        return Map.of("message", "Enrollment successful! All selected courses have been added.");
    }


    public void enrollStudentInCourse(StudentCoursesDTO studentCoursesDTO) {
        var student = studentRepository.findByRollNo(studentCoursesDTO.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found with roll number: " + studentCoursesDTO.getStudentId()));

        var course = courseRepository.findByCourseCode(studentCoursesDTO.getCourseId())
                .orElseThrow(() -> new IllegalArgumentException("Course not found with code: " + studentCoursesDTO.getCourseId()));

        StudentCourses studentCourses = new StudentCourses();
        studentCourses.setStudent(student);
        studentCourses.setCourse(course);
        studentCourses.setGradeId(studentCoursesDTO.getGradeId());
        studentCoursesRepository.save(studentCourses);
    }
}

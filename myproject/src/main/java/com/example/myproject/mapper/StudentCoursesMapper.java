
package com.example.myproject.mapper;

import com.example.myproject.entity.StudentCourses;
import com.example.myproject.dto.StudentCoursesDTO;
import com.example.myproject.entity.Student;
import com.example.myproject.entity.Course;

public class StudentCoursesMapper {

    // Convert Entity to DTO
    public static StudentCoursesDTO toDTO(StudentCourses studentCourses) {
        StudentCoursesDTO dto = new StudentCoursesDTO();
        dto.setId(studentCourses.getId());
        dto.setStudentId(studentCourses.getStudent().getRollNo());  // Getting rollno from Student entity
        dto.setCourseId(studentCourses.getCourse().getCourseCode());  // Getting courseCode from Course entity
        dto.setGradeId(studentCourses.getGradeId());
        return dto;
    }

    // Convert DTO to Entity
    public static StudentCourses toEntity(StudentCoursesDTO studentCoursesDTO, Student student, Course course) {
        StudentCourses studentCourses = new StudentCourses();
        studentCourses.setId(studentCoursesDTO.getId());
        studentCourses.setStudent(student);  // Assuming student is already fetched by rollno
        studentCourses.setCourse(course);    // Assuming course is already fetched by courseCode
        studentCourses.setGradeId(studentCoursesDTO.getGradeId());
        return studentCourses;
    }
}


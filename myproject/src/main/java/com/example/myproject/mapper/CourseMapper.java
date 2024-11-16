package com.example.myproject.mapper;

import com.example.myproject.dto.CourseDTO;
import com.example.myproject.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    // Convert Course entity to CourseDTO
    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        CourseDTO dto = new CourseDTO();
        dto.setCourseId(course.getCourseId());
        dto.setCourseCode(course.getCourseCode());
        dto.setName(course.getName());
        dto.setDescription(course.getDescription());
        dto.setYear(course.getYear());
        dto.setTerm(course.getTerm());
        dto.setFaculty(course.getFaculty());
        dto.setCredit(course.getCredit());
        dto.setCapacity(course.getCapacity());
        return dto;
    }

    // Convert CourseDTO to Course entity
    public Course toEntity(CourseDTO dto) {
        if (dto == null) {
            return null;
        }
        Course course = new Course();
        course.setCourseId(dto.getCourseId());
        course.setCourseCode(dto.getCourseCode());
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setYear(dto.getYear());
        course.setTerm(dto.getTerm());
        course.setFaculty(dto.getFaculty());
        course.setCredit(dto.getCredit());
        course.setCapacity(dto.getCapacity());
        return course;
    }
}

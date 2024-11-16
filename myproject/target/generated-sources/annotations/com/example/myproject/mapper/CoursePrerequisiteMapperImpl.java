package com.example.myproject.mapper;

import com.example.myproject.dto.CoursePrerequisiteDTO;
import com.example.myproject.entity.Course;
import com.example.myproject.entity.CoursePrerequisite;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-15T23:59:02+0530",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
)
@Component
public class CoursePrerequisiteMapperImpl implements CoursePrerequisiteMapper {

    @Override
    public CoursePrerequisite mapToEntity(CoursePrerequisiteDTO dto) {
        if ( dto == null ) {
            return null;
        }

        CoursePrerequisite coursePrerequisite = new CoursePrerequisite();

        coursePrerequisite.setCourse( coursePrerequisiteDTOToCourse( dto ) );
        coursePrerequisite.setPrerequisite( coursePrerequisiteDTOToCourse1( dto ) );

        return coursePrerequisite;
    }

    protected Course coursePrerequisiteDTOToCourse(CoursePrerequisiteDTO coursePrerequisiteDTO) {
        if ( coursePrerequisiteDTO == null ) {
            return null;
        }

        Course course = new Course();

        course.setCourseCode( coursePrerequisiteDTO.getCourseCode() );

        return course;
    }

    protected Course coursePrerequisiteDTOToCourse1(CoursePrerequisiteDTO coursePrerequisiteDTO) {
        if ( coursePrerequisiteDTO == null ) {
            return null;
        }

        Course course = new Course();

        course.setCourseCode( coursePrerequisiteDTO.getPrerequisiteCode() );

        return course;
    }
}

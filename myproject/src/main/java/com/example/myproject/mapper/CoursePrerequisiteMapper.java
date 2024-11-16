package com.example.myproject.mapper;

//import com.example.myproject.dto.CoursePrerequisiteDTO;
//import com.example.myproject.entity.Course;
//import com.example.myproject.entity.CoursePrerequisite;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import com.example.myproject.repo.CourseRepository;

import com.example.myproject.dto.CoursePrerequisiteDTO;
import com.example.myproject.entity.CoursePrerequisite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CoursePrerequisiteMapper {

    @Mapping(source = "courseCode", target = "course.courseCode")
    @Mapping(source = "prerequisiteCode", target = "prerequisite.courseCode")
    CoursePrerequisite mapToEntity(CoursePrerequisiteDTO dto);
}

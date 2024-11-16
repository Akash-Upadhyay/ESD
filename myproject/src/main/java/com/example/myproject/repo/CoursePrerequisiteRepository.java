package com.example.myproject.repo;

import com.example.myproject.entity.CoursePrerequisite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CoursePrerequisiteRepository extends JpaRepository<CoursePrerequisite, Long> {

    // Fetch prerequisites for a given course code
    List<CoursePrerequisite> findByCourse_CourseCode(String courseCode);

    // Fetch courses for which a given course is a prerequisite based on course_code
    List<CoursePrerequisite> findByPrerequisite_CourseCode(String prerequisiteCode);


}

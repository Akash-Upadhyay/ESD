
package com.example.myproject.repo;

import com.example.myproject.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // Custom query to fetch courses by term (e.g., Winter, Spring)
    List<Course> findByTerm(String term);

    // Find a course by its courseCode
    Optional<Course> findByCourseCode(String courseCode);
}


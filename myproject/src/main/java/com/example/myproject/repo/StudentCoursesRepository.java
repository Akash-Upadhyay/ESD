package com.example.myproject.repo;

import com.example.myproject.entity.StudentCourses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentCoursesRepository extends JpaRepository<StudentCourses, Long> {

    // Fetch course IDs the student has already taken
//    @Query("SELECT sc.course.id FROM StudentCourses sc WHERE sc.student.id = :studentId")
//    List<Long> findCourseIdsByStudentId(@Param("studentId") Long studentId);

//    List<StudentCourses> findByStudentId(String studentId);

    List<StudentCourses> findByStudent_RollNo(String rollNo);
}



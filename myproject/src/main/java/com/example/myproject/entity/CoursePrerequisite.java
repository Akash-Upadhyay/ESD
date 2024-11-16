package com.example.myproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "course_prerequisite")  // This is the 'course_prerequisite' table in the database
public class CoursePrerequisite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_code")  // Join on 'course_code' in 'course' table
    private Course course;  // References the 'course' table via 'course_code'

    @ManyToOne
    @JoinColumn(name = "prerequisite_id", referencedColumnName = "course_code")  // Join on 'course_code' in 'course' table
    private Course prerequisite;  // References the 'course' table via 'course_code'

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Course getPrerequisite() {
        return prerequisite;
    }

    public void setPrerequisite(Course prerequisite) {
        this.prerequisite = prerequisite;
    }
}




















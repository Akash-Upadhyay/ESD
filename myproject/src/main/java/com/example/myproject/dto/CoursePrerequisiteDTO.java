package com.example.myproject.dto;

public class CoursePrerequisiteDTO {

    private String courseCode; // The course code of the main course
    private String prerequisiteCode; // The course code of the prerequisite course

    // Getters and Setters
    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getPrerequisiteCode() {
        return prerequisiteCode;
    }

    public void setPrerequisiteCode(String prerequisiteCode) {
        this.prerequisiteCode = prerequisiteCode;
    }
}


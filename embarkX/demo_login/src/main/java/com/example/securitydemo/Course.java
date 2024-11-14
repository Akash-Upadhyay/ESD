package com.example.securitydemo;

public class Course {
    private int id;
    private String name;
    private String professor;
    private String prerequisite;
    private boolean isPrerequisiteMet;

    // Constructor
    public Course(int id, String name, String professor, String prerequisite, boolean isPrerequisiteMet) {
        this.id = id;
        this.name = name;
        this.professor = professor;
        this.prerequisite = prerequisite;
        this.isPrerequisiteMet = isPrerequisiteMet;
    }

    // Getters and Setters (for JSON serialization)
    public int getId() { return id; }
    public String getName() { return name; }
    public String getProfessor() { return professor; }
    public String getPrerequisite() { return prerequisite; }
    public boolean isPrerequisiteMet() { return isPrerequisiteMet; }
}


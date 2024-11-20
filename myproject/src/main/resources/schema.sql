--
-- -- Users Table
-- CREATE TABLE IF NOT EXISTS users (
--                                      username VARCHAR(50) NOT NULL PRIMARY KEY,
--     password VARCHAR(100) NOT NULL,
--     enabled BOOLEAN NOT NULL
--     );
--
-- -- Authorities Table
-- CREATE TABLE IF NOT EXISTS authorities (
--                                            username VARCHAR(50) NOT NULL,
--     authority VARCHAR(50) NOT NULL
--     );
--
-- -- Domains Table
-- CREATE TABLE IF NOT EXISTS domains (
--                                        domain_id BIGINT NOT NULL AUTO_INCREMENT,
--                                        batch VARCHAR(255) DEFAULT NULL,
--     capacity INT DEFAULT NULL,
--     program VARCHAR(255) DEFAULT NULL,
--     qualification VARCHAR(255) DEFAULT NULL,
--     PRIMARY KEY (domain_id)
--     );
--
-- -- Specializations Table
-- CREATE TABLE IF NOT EXISTS specializations (
--                                                specialization_id BIGINT NOT NULL AUTO_INCREMENT,
--                                                code VARCHAR(255) DEFAULT NULL,
--     credit_required INT DEFAULT NULL,
--     description VARCHAR(255) DEFAULT NULL,
--     name VARCHAR(255) DEFAULT NULL,
--     year INT DEFAULT NULL,
--     PRIMARY KEY (specialization_id)
--     );
--
-- -- Course Table
-- CREATE TABLE IF NOT EXISTS course (
--                                       course_id BIGINT NOT NULL AUTO_INCREMENT,
--                                       capacity INT DEFAULT NULL,
--                                       course_code VARCHAR(255) NOT NULL UNIQUE,
--     credit INT DEFAULT NULL,
--     description VARCHAR(1000) DEFAULT NULL,
--     faculty VARCHAR(255) DEFAULT NULL,
--     name VARCHAR(255) DEFAULT NULL,
--     term VARCHAR(255) DEFAULT NULL,
--     year INT DEFAULT NULL,
--     PRIMARY KEY (course_id)
--     );
--
-- -- Course Prerequisite Table
-- CREATE TABLE IF NOT EXISTS course_prerequisite (
--                                                    id BIGINT NOT NULL AUTO_INCREMENT,
--                                                    course_id VARCHAR(255) DEFAULT NULL,
--     prerequisite_id VARCHAR(255) DEFAULT NULL,
--     PRIMARY KEY (id),
--     INDEX idx_course_id (course_id),
--     INDEX idx_prerequisite_id (prerequisite_id)
--     );
--
-- -- Placement Students Table
-- -- Placement Students Table
-- CREATE TABLE IF NOT EXISTS placement_students (
--                                                   id BIGINT NOT NULL AUTO_INCREMENT,
--                                                   about VARCHAR(500) DEFAULT NULL,
--     acceptance BIT(1) DEFAULT NULL,
--     comment VARCHAR(1000) DEFAULT NULL,
--     cv_application LONGBLOB DEFAULT NULL,
--     date DATE DEFAULT NULL,
--     placement_id BIGINT NOT NULL UNIQUE,
--     student_id BIGINT DEFAULT NULL, -- Add student_id column
--     PRIMARY KEY (id)
--     );
--
--
-- -- Students Table
-- CREATE TABLE IF NOT EXISTS student (
--                                        id BIGINT NOT NULL AUTO_INCREMENT,
--                                        cgpa DOUBLE DEFAULT NULL,
--                                        email VARCHAR(255) NOT NULL UNIQUE,
--     first_name VARCHAR(255) DEFAULT NULL,
--     graduation_year INT DEFAULT NULL,
--     last_name VARCHAR(255) DEFAULT NULL,
--     path_for_photo VARCHAR(255) DEFAULT NULL,
--     roll_no VARCHAR(255) NOT NULL UNIQUE,
--     total_credits INT DEFAULT NULL,
--     domain_id BIGINT DEFAULT NULL,
--     placement_id BIGINT DEFAULT NULL,
--     specialization_id BIGINT DEFAULT NULL,
--     PRIMARY KEY (id)
--     );
--
-- -- Student Courses Table
-- CREATE TABLE IF NOT EXISTS student_courses (
--                                                id BIGINT NOT NULL AUTO_INCREMENT,
--                                                grade_id VARCHAR(255) DEFAULT NULL,
--     course_id VARCHAR(255) DEFAULT NULL,
--     student_id VARCHAR(255) DEFAULT NULL,
--     PRIMARY KEY (id)
--     );
--
--
-- -- Authorities Table: Add foreign key for username
-- ALTER TABLE authorities
--     ADD CONSTRAINT fk_authorities_username FOREIGN KEY (username)
--         REFERENCES users (username) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- -- Course Prerequisite Table: Add foreign keys for course_id and prerequisite_id
-- ALTER TABLE course_prerequisite
--     ADD CONSTRAINT fk_course_prerequisite_course_id FOREIGN KEY (course_id)
--         REFERENCES course (course_code) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- ALTER TABLE course_prerequisite
--     ADD CONSTRAINT fk_course_prerequisite_prerequisite_id FOREIGN KEY (prerequisite_id)
--         REFERENCES course (course_code) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- -- Students Table: Add foreign keys for domain_id, placement_id, specialization_id
-- ALTER TABLE student
--     ADD CONSTRAINT fk_student_domain_id FOREIGN KEY (domain_id)
--         REFERENCES domains (domain_id) ON DELETE SET NULL ON UPDATE CASCADE;
--
-- ALTER TABLE student
--     ADD CONSTRAINT fk_student_placement_id FOREIGN KEY (placement_id)
--         REFERENCES placement_students (placement_id) ON DELETE SET NULL ON UPDATE CASCADE;
--
-- ALTER TABLE student
--     ADD CONSTRAINT fk_student_specialization_id FOREIGN KEY (specialization_id)
--         REFERENCES specializations (specialization_id) ON DELETE SET NULL ON UPDATE CASCADE;
--
-- -- Student Courses Table: Add foreign keys for course_id and student_id
-- ALTER TABLE student_courses
--     ADD CONSTRAINT fk_student_courses_course_id FOREIGN KEY (course_id)
--         REFERENCES course (course_code) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- ALTER TABLE student_courses
--     ADD CONSTRAINT fk_student_courses_student_id FOREIGN KEY (student_id)
--         REFERENCES student (roll_no) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- -- Placement Students Table: Add foreign key for student_id
-- ALTER TABLE placement_students
--     ADD CONSTRAINT fk_placement_students_student_id FOREIGN KEY (student_id)
--         REFERENCES student (id) ON DELETE SET NULL ON UPDATE CASCADE;


-- Users Table
CREATE TABLE IF NOT EXISTS users (
                                     username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    enabled BOOLEAN NOT NULL
    );

-- Authorities Table
CREATE TABLE IF NOT EXISTS authorities (
                                           username VARCHAR(50) NOT NULL,
    authority VARCHAR(50) NOT NULL,
    PRIMARY KEY (username, authority),
    CONSTRAINT fk_authorities_username FOREIGN KEY (username)
    REFERENCES users (username) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Domains Table
CREATE TABLE IF NOT EXISTS domains (
                                       domain_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       batch VARCHAR(255) DEFAULT NULL,
    capacity INT DEFAULT NULL,
    program VARCHAR(255) DEFAULT NULL,
    qualification VARCHAR(255) DEFAULT NULL
    );

-- Specializations Table
CREATE TABLE IF NOT EXISTS specializations (
                                               specialization_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                               code VARCHAR(255) DEFAULT NULL,
    credit_required INT DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL,
    year INT DEFAULT NULL
    );

-- Course Table
CREATE TABLE IF NOT EXISTS course (
                                      course_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                      capacity INT DEFAULT NULL,
                                      course_code VARCHAR(255) NOT NULL UNIQUE,
    credit INT DEFAULT NULL,
    description VARCHAR(1000) DEFAULT NULL,
    faculty VARCHAR(255) DEFAULT NULL,
    name VARCHAR(255) DEFAULT NULL,
    term VARCHAR(255) DEFAULT NULL,
    year INT DEFAULT NULL
    );

-- Course Prerequisite Table
CREATE TABLE IF NOT EXISTS course_prerequisite (
                                                   id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                                   course_id VARCHAR(255) DEFAULT NULL,
    prerequisite_id VARCHAR(255) DEFAULT NULL,
    INDEX idx_course_id (course_id),
    INDEX idx_prerequisite_id (prerequisite_id),
    CONSTRAINT fk_course_prerequisite_course_id FOREIGN KEY (course_id)
    REFERENCES course (course_code) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_course_prerequisite_prerequisite_id FOREIGN KEY (prerequisite_id)
    REFERENCES course (course_code) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- Placement Students Table
CREATE TABLE IF NOT EXISTS placement_students (
                                                  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                                  about VARCHAR(500) DEFAULT NULL,
    acceptance BIT(1) DEFAULT NULL,
    comment VARCHAR(1000) DEFAULT NULL,
    cv_application LONGBLOB DEFAULT NULL,
    date DATE DEFAULT NULL,
    placement_id BIGINT NOT NULL UNIQUE,
    student_id BIGINT DEFAULT NULL
--     CONSTRAINT fk_placement_students_student_id FOREIGN KEY (student_id)
--     REFERENCES student (id) ON DELETE SET NULL ON UPDATE CASCADE
    );

-- Students Table
CREATE TABLE IF NOT EXISTS student (
                                       id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                       cgpa DOUBLE DEFAULT NULL,
                                       email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) DEFAULT NULL,
    graduation_year INT DEFAULT NULL,
    last_name VARCHAR(255) DEFAULT NULL,
    path_for_photo VARCHAR(255) DEFAULT NULL,
    roll_no VARCHAR(255) NOT NULL UNIQUE,
    total_credits INT DEFAULT NULL,
    domain_id BIGINT DEFAULT NULL,
    placement_id BIGINT DEFAULT NULL,
    specialization_id BIGINT DEFAULT NULL,
    CONSTRAINT fk_student_domain_id FOREIGN KEY (domain_id)
    REFERENCES domains (domain_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_student_placement_id FOREIGN KEY (placement_id)
    REFERENCES placement_students (placement_id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_student_specialization_id FOREIGN KEY (specialization_id)
    REFERENCES specializations (specialization_id) ON DELETE SET NULL ON UPDATE CASCADE
    );

-- Student Courses Table
CREATE TABLE IF NOT EXISTS student_courses (
                                               id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                               grade_id VARCHAR(255) DEFAULT NULL,
    course_id VARCHAR(255) DEFAULT NULL,
    student_id VARCHAR(255) DEFAULT NULL,
    CONSTRAINT fk_student_courses_course_id FOREIGN KEY (course_id)
    REFERENCES course (course_code) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_student_courses_student_id FOREIGN KEY (student_id)
    REFERENCES student (roll_no) ON DELETE CASCADE ON UPDATE CASCADE
    );

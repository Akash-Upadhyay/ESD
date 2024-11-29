# *Course Registration Application*

## *Overview*
This project is a *Course Management System* built with a *React* frontend and a *Spring Boot* backend. It provides a platform where students, administrators, and faculty can manage courses efficiently. The backend is secured using *JWT (JSON Web Tokens)* for authentication and role-based access control.

---

## *Technologies Used*

### *Frontend:*
- *React*: For building a responsive and dynamic user interface.
- *Axios*: For handling HTTP requests to the backend.
- *CSS*: For styling components and pages.

### *Backend:*
- *Spring Boot*: A Java framework used to create RESTful APIs.
- *Spring Security with JWT*: For secure authentication and role-based authorization.
- *JPA/Hibernate*: For database interaction.
- *MySQL*: The database management system for data persistence.

---

## *Features*

### *Frontend*
- *User Authentication*: Login functionality with JWT integration.
- *Course Management*: Allows users to view, enroll, and manage courses.
- *Dynamic Navigation*: Based on user roles (Admin, Student).
- *Responsive Design*: Works on desktop and mobile devices.

### *Backend*
- *JWT Authentication*: Secures API endpoints.
- *Role-Based Access Control*: Differentiates between administrators and students.
- *RESTful APIs*: For CRUD operations on courses, students, and enrollments.
- *Database Management*: Persistent data storage using MySQL and Hibernate.

---

## *Installation and Setup*

### *Frontend Setup*
1. Clone the repository and navigate to the frontend directory:
   bash
   git clone <repository_url>
   cd MYAPP
   
2. Install dependencies:
   bash
   npm install
   
3. Start the React application:
   bash
   npm start
   
   The frontend will run on http://localhost:3000/.

### *Backend Setup*
1. Navigate to the backend directory:
   bash
   cd myproject
   
2. Configure the application.properties file:
   properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   
3. Build and run the Spring Boot application:
   bash
   mvn spring-boot:run
   
   The backend will run on http://localhost:8080/.

---

## *API Endpoints*

### *Authentication*
- *POST* /api/auth/login: Authenticates users and generates a JWT.

### *Courses*
- *POST* /api/v1/courses/add: Adds a new course.
- *GET* /api/v1/courses/getAll: Fetches all courses.
- *GET* /api/v1/courses/{courseId}: Retrieves a course by its ID.
- *PUT* /api/v1/courses/update/{courseId}: Updates an existing course.
- *DELETE* /api/v1/courses/delete/{courseId}: Deletes a course.

---

## *Security*

### *JWT Authentication Flow:*
1. *Login*: Users provide credentials to receive a JWT.
2. *Token Validation*: Secured endpoints require a valid JWT in the Authorization header.
3. *Role-Based Access*: Permissions are enforced based on the user’s role (Admin, Student).

---

## *Usage Instructions*

1. *Admin Users*:
   - Add, update, or delete courses.
   - Manage student enrollments.
2. *Students*:
   - View available courses.
   - Enroll in courses.
   - Check enrolled courses.

---

## *Project Structure*

### *Frontend (React)*
- *components*: Contains React components like Login, Courses, and Home.
- *App.js*: Main application file for routing and layout.
- *Axios*: API communication setup.
  
### *Backend (Spring Boot)*
- *config*: Contains security configurations.
- *controller*: Defines endpoints for authentication and course management.
- *dto*: Data Transfer Objects for API payloads.
- *entity*: Database entities.
- *repo*: Interfaces for database interaction.
- *service*: Business logic for managing courses and users.
- *jwt*: JWT utility classes for authentication.

---

## *Database Schema*

- *Students Table*: Stores student details and enrollment status.
- *Courses Table*: Stores course details like title, description, and prerequisites.
- *Enrollments Table*: Tracks student-course relationships.

---

## *Future Enhancements*
- *Email Notifications*: Notify students upon enrollment.
- *Role-Based Dashboard*: Separate views for admins and students.
- *Audit Logging*: Track changes made by administrators.

---

## *Contributing*
1. Fork the repository.
2. Create a feature branch:
   bash
   git checkout -b feature/new-feature
   
3. Commit changes:
   bash
   git commit -m "Add new feature"
   
4. Push to the branch:
   bash
   git push origin feature/new-feature
   
5. Create a pull request.

---

## *License*
© 2024 Akash Upadhyay, IIITB. All Rights Reserved

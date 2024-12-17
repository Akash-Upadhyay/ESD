// Endpoint for enrollment
const loginAPI = "http://localhost:8080/signin"; // Login API
const availableCoursesAPI = "http://localhost:8080/courses/available"; // Available courses API
const completedCoursesAPI = "http://localhost:8080/courses/completed"; // Completed courses API
const enrollmentAPI = "http://localhost:8080/courses/enroll"; // Enrollment API

let completedCourses = []; // Store completed courses locally
let availableCourses = []; // Store available courses locally

// Attach event listener to the login form
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch(loginAPI, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const jwtToken = data.jwtToken;
                    localStorage.setItem("jwtToken", jwtToken);
                    window.location.href = "courses1.html";
                } else {
                    document.getElementById("error").style.display = "block";
                }
            } catch (error) {
                console.error("Login error:", error);
            }
        });
    } else if (window.location.pathname.endsWith("courses1.html")) {
        fetchCourses();
    }
});

// Fetch available and completed courses
async function fetchCourses() {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        alert("Unauthorized access. Redirecting to login.");
        window.location.href = "index.html";
        return;
    }

    try {
        const rollno = "MT2024001"; // Replace with dynamic rollno if needed

        // Fetch available courses
        const availableCoursesResponse = await fetch(`${availableCoursesAPI}?rollno=${rollno}&term=Fall`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!availableCoursesResponse.ok) {
            throw new Error(`Failed to fetch available courses: ${availableCoursesResponse.statusText}`);
        }

        availableCourses = await availableCoursesResponse.json();
        console.log("Available Courses:", availableCourses); // Debugging line to check the response

        // Fetch completed courses
        const completedCoursesResponse = await fetch(`${completedCoursesAPI}?rollno=${rollno}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!completedCoursesResponse.ok) {
            throw new Error(`Failed to fetch completed courses: ${completedCoursesResponse.statusText}`);
        }

        completedCourses = await completedCoursesResponse.json();
        console.log("Completed Courses:", completedCourses); // Debugging line to check the response

        // Now display available courses
        displayCourses();
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Function to display all available courses
function displayCourses() {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = ""; // Clear any existing content

    if (availableCourses.length === 0) {
        courseList.innerHTML = "<p>No available courses to display.</p>";
        return;
    }

    availableCourses.forEach((course) => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <div class="course-info">
                <strong>${course.name} (${course.courseCode})</strong><br>
                Professor: ${course.professor}<br>
                Credits: ${course.credits}<br>
                Prerequisites: ${course.prerequisites.length ? course.prerequisites.join(", ") : "None"}
            </div>
            <div class="course-select">
                <input type="checkbox" id="${course.courseCode}" ${completedCourses.includes(course.courseCode) ? "checked" : ""}>
                <label for="${course.courseCode}">Select</label>
            </div>
        `;

        // Add event listener to handle checkbox change
        const checkbox = courseItem.querySelector(`#${course.courseCode}`);
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                addToCompleted(course.courseCode);
            } else {
                removeFromCompleted(course.courseCode);
            }
            enableDisableCourses();
        });

        courseList.appendChild(courseItem);
    });
}

// Function to enable or disable checkboxes based on prerequisites
function enableDisableCourses() {
    availableCourses.forEach((course) => {
        const checkbox = document.getElementById(course.courseCode);
        const prerequisitesMet = course.prerequisites.length === 0 || course.prerequisites.every((prereq) =>
            completedCourses.includes(prereq)
        );

        if (checkbox) {
            checkbox.disabled = !prerequisitesMet;
        }
    });
}

// Function to add course to completed list
function addToCompleted(courseCode) {
    if (!completedCourses.includes(courseCode)) {
        completedCourses.push(courseCode);
        console.log(`${courseCode} added to completed courses.`);
    }
}

// Function to remove course from completed list
function removeFromCompleted(courseCode) {
    const index = completedCourses.indexOf(courseCode);
    if (index !== -1) {
        completedCourses.splice(index, 1);
        console.log(`${courseCode} removed from completed courses.`);
    }
}

// Function to submit selected courses for enrollment
async function submitEnrollment() {
    const selectedCourses = availableCourses
        .filter((course) => document.getElementById(course.courseCode).checked)
        .map((course) => course.courseCode);

    if (selectedCourses.length === 0) {
        alert("No courses selected for enrollment.");
        return;
    }

    try {
        const jwtToken = localStorage.getItem("jwtToken");
        const rollno = "MT2024001";  // Replace with dynamic rollno if needed
        console.log(selectedCourses);
        const response = await fetch(enrollmentAPI, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rollno, selectedCourses: selectedCourses }),
        });

        if (response.ok) {
            alert("Enrollment successful!");
        } else {
            const errorData = await response.json();
            console.error("Enrollment failed:", errorData);
            alert("Enrollment failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during enrollment:", error);
        alert("An error occurred. Please try again.");
    }
}

// Submit button handler
document.getElementById("submitBtn").addEventListener("click", async function () {
    console.log("Submit button clicked!");
    await submitEnrollment();
});

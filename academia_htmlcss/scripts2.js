// Endpoint for login
const loginAPI = "http://localhost:8080/signin"; // Login API
const availableCoursesAPI = "http://localhost:8080/courses/available"; // Available courses API
const completedCoursesAPI = "http://localhost:8080/courses/completed"; // Completed courses API

let completedCourses = []; // Store completed courses locally

// Attach event listener to the login form
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Get form data
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            console.log("Form submitted with:", username, password);

            try {
                // Send POST request to login endpoint
                const response = await fetch(loginAPI, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                // Check if login was successful
                if (response.ok) {
                    const data = await response.json();
                    const jwtToken = data.jwtToken; // Adjust based on API response

                    console.log("Login successful. JWT Token:", jwtToken);

                    // Save token for later use
                    localStorage.setItem("jwtToken", jwtToken);

                    // Redirect to courses.html
                    window.location.href = "courses.html";
                } else {
                    console.error("Login failed with status:", response.status);
                    document.getElementById("error").style.display = "block";
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        });
    } else if (window.location.pathname.endsWith("courses.html")) {
        // Fetch courses if on courses.html
        fetchCourses();
    }
});

async function fetchCourses() {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        alert("Unauthorized access. Redirecting to login.");
        window.location.href = "index.html";
        return;
    }

    try {
        const rollno = "MT2024001"; // Replace with dynamic rollno if needed
        const term = "Fall"; // Replace with the selected term

        // Fetch available courses
        const availableCoursesResponse = await fetch(`${availableCoursesAPI}?rollno=${rollno}&term=${term}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Available Courses Response:", availableCoursesResponse);
        if (!availableCoursesResponse.ok) {
            throw new Error(`Failed to fetch available courses: ${availableCoursesResponse.statusText}`);
        }

        const availableCourses = await availableCoursesResponse.json();
        console.log("Available Courses Data:", availableCourses);

        // Fetch completed courses
        const completedCoursesResponse = await fetch(`${completedCoursesAPI}?rollno=${rollno}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Completed Courses Response:", completedCoursesResponse);
        if (!completedCoursesResponse.ok) {
            throw new Error(`Failed to fetch completed courses: ${completedCoursesResponse.statusText}`);
        }

        completedCourses = await completedCoursesResponse.json(); // Store the completed courses
        console.log("Completed Courses Data:", completedCourses);

        // Display all available courses (ignoring prerequisites for now)
        displayCourses(availableCourses);

        // Enable or disable checkboxes based on prerequisites
        enableDisableCourses(availableCourses, completedCourses);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Function to display all available courses
function displayCourses(availableCourses) {
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
            enableDisableCourses(availableCourses, completedCourses);
        });

        courseList.appendChild(courseItem);
    });
}

// Function to enable or disable checkboxes based on prerequisites
function enableDisableCourses(availableCourses, completedCourses) {
    availableCourses.forEach((course) => {
        const checkbox = document.getElementById(course.courseCode);

        // Check if all prerequisites are met for this course
        const prerequisitesMet = course.prerequisites.length === 0 || course.prerequisites.every((prereq) =>
            completedCourses.includes(prereq)
        );

        console.log(`Checking prerequisites for ${course.courseCode}:`, course.prerequisites);
        console.log(`Prerequisites met: ${prerequisitesMet}`);

        // Enable or disable checkbox based on prerequisites
        if (checkbox) {
            checkbox.disabled = !prerequisitesMet;
        }
    });
}

// Function to add course to completed list
function addToCompleted(courseCode) {
    if (!completedCourses.includes(courseCode)) {
        completedCourses.push(courseCode); // Add the course to the completed list
        console.log(`${courseCode} added to completed courses.`);
    }
}

// Function to remove course from completed list
function removeFromCompleted(courseCode) {
    const index = completedCourses.indexOf(courseCode);
    if (index !== -1) {
        completedCourses.splice(index, 1); // Remove the course from the completed list
        console.log(`${courseCode} removed from completed courses.`);
    }
}

async function fetchCourses() {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        alert("Unauthorized access. Redirecting to login.");
        window.location.href = "index.html";
        return;
    }

    try {
        const rollno = "MT2024001"; // Replace with dynamic rollno if needed
        const term = "Fall"; // Replace with the selected term

        // Fetch available courses
        const availableCoursesResponse = await fetch(`${availableCoursesAPI}?rollno=${rollno}&term=${term}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Available Courses Response:", availableCoursesResponse);
        if (!availableCoursesResponse.ok) {
            throw new Error(`Failed to fetch available courses: ${availableCoursesResponse.statusText}`);
        }

        const availableCourses = await availableCoursesResponse.json();
        console.log("Available Courses Data:", availableCourses);

        // Fetch completed courses
        const completedCoursesResponse = await fetch(`${completedCoursesAPI}?rollno=${rollno}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Completed Courses Response:", completedCoursesResponse);
        if (!completedCoursesResponse.ok) {
            throw new Error(`Failed to fetch completed courses: ${completedCoursesResponse.statusText}`);
        }

        completedCourses = await completedCoursesResponse.json(); // Store the completed courses
        console.log("Completed Courses Data:", completedCourses);

        // Display all available courses (ignoring prerequisites for now)
        displayCourses(availableCourses);

        // Enable or disable checkboxes based on prerequisites
        enableDisableCourses(availableCourses, completedCourses);
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
}

// Function to display all available courses
function displayCourses(availableCourses) {
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
            enableDisableCourses(availableCourses, completedCourses);
        });

        courseList.appendChild(courseItem);
    });
}

// Function to enable or disable checkboxes based on prerequisites
function enableDisableCourses(availableCourses, completedCourses) {
    availableCourses.forEach((course) => {
        const checkbox = document.getElementById(course.courseCode);

        // Check if all prerequisites are met for this course
        const prerequisitesMet = course.prerequisites.length === 0 || course.prerequisites.every((prereq) =>
            completedCourses.includes(prereq)
        );

        console.log(`Checking prerequisites for ${course.courseCode}:`, course.prerequisites);
        console.log(`Prerequisites met: ${prerequisitesMet}`);

        // Enable or disable checkbox based on prerequisites
        if (checkbox) {
            checkbox.disabled = !prerequisitesMet;
        }
    });
}

// Function to add course to completed list
function addToCompleted(courseCode) {
    if (!completedCourses.includes(courseCode)) {
        completedCourses.push(courseCode); // Add the course to the completed list
        console.log(`${courseCode} added to completed courses.`);
    }
}

// Function to remove course from completed list
function removeFromCompleted(courseCode) {
    const index = completedCourses.indexOf(courseCode);
    if (index !== -1) {
        completedCourses.splice(index, 1); // Remove the course from the completed list
        console.log(`${courseCode} removed from completed courses.`);
    }
}

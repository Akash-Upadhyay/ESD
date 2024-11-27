import React from 'react'
import Navbar from '../components/Navbar'
import CourseTable from '../components/CourseTable'

function EnrolledCourses() {
  return (
    <>
    <Navbar />
    <div className='container'>
      <CourseTable  whichCourses={"enrolled_courses"} />
    </div>
    </>
  )
}

export default EnrolledCourses
import React from 'react'
import Navbar from '../components/Navbar'
import CourseTable from '../components/CourseTable'

function Enroll() {
  return (
    <>
    <Navbar />
    <div className='container'>
      <CourseTable whichCourses={"show_courses"}/>
    </div>
    </>
  )
}

export default Enroll
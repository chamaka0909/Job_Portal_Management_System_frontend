import React, { useState, useEffect } from 'react';
import RecruiterView from './Recruiter/RecruiterView';
import JobSeekerView from './JobSeeker/JobSeekerView';

export default function ViewInterviews() {

    useEffect(()=>{
        document.title = "Interviews";
    }, []);

  return (
    <div>
        
        <JobSeekerView />
    </div>
  )
}

import React from 'react'
import AddNewInterviee from './_components/AddNewInterview'

function Dashboard() {
  return (
    <div className='p-10'>
      
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start Your Mock AI Interview</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterviee/>
      </div>
      </div>
  )
}

export default Dashboard
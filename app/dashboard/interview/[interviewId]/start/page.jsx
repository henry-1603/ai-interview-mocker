"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from './_components/RecordAnsSection';

function StartInterview() {
    const params = useParams();
      const [interviewData, setInterviewData] = useState();
      const [mockInterviewQuestion , setMockInterviewQuestion] = useState();
      const [activeQuestionIndex , setActiveQuestionIndex] = useState(0);
    
     useEffect(() => {
        const GetInterviewDetails = async () => {
          if (!params.interviewId) return; // Ensure interviewId exists
    
          const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));
    
          console.log(result);

          const jsonMockResp = JSON.parse(result[0].jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
          console.log(jsonMockResp);
          setInterviewData(result[0]);
        };
    
        GetInterviewDetails();
      }, [params.interviewId]);


  return (
    <div className='flex'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5 items-start'>
            {/* <Question/> */}

            <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex} />

            {/* Answer Section */}
        <RecordAnsSection/>
        </div>

    </div>
  )
}

export default StartInterview
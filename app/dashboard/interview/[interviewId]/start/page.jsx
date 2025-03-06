"use client";

import dynamic from "next/dynamic";

// Dynamically import the RecordAnsSection component (client-side only)
const RecordAnsSection = dynamic(() => import("./_components/RecordAnsSection"), {
  ssr: false, // Disable server-side rendering
});



import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
// import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";

function StartInterview() {
  const params = useParams();
  const router = useRouter();
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

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

  const handleFeedback = () => {
    router.push(`/dashboard/interview/${interviewData.mockId}/feedback`);
  };

  return (
    <>
      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5 items-start">
          {/* <Question/> */}

          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex = {setActiveQuestionIndex}
          />

          {/* Answer Section */}
          <div>
            <RecordAnsSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
            />

            <div className="flex w-full justify-end gap-2 my-5">
              {activeQuestionIndex > 0 && (
                <Button onClick={() => {
                  setActiveQuestionIndex(activeQuestionIndex - 1);
                }} className="w-[32.3%] bg-[#2f436e] hover:bg-gray-400 transition-all hover:text-black hover:font-bold">
                  Prev Question
                </Button>
              )}
              {activeQuestionIndex != interviewData?.length - 1 && (
                <Button
                  onClick={() => {
                    setActiveQuestionIndex(activeQuestionIndex + 1);
                  }}
                  className="w-[32.3%] bg-[#2f436e] hover:bg-gray-400 transition-all hover:text-black hover:font-bold"
                >
                  Next Question
                </Button>
              )}
              {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
                <Button onClick={handleFeedback} className="w-[32.3%] bg-[#2f436e] hover:bg-gray-400 transition-all hover:text-black hover:font-bold">
                  End Interview
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartInterview;

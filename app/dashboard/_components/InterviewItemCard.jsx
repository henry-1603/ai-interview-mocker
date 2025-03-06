import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
    const router = useRouter();

    const handleFeedback = () => {
        router.push(`/dashboard/interview/${interview.mockId}/feedback`);
      };

      const handleStart = () => {
        router.push(`/dashboard/interview/${interview.mockId}/start`);
      };

      

  return (
    <div className="border shadow-sm rounded-lg p-3 gap-2">
      <h2 className="font-bold text-[#2f436e]">
        <strong>Job Position : </strong>
        {interview?.jobPosition}
      </h2>
      <h2 className="text-sm text-gray-500">
        <strong>Job Experience : </strong>
        {interview?.jobExperience}
      </h2>
      <h2 className="text-xs text-gray-500">
        <strong>Created At :</strong>{" "}
        {new Date(interview.createdAt).toLocaleString()}
      </h2>

      <div className="flex justify-between mt-2 gap-5">
        <Button onClick={()=>{handleFeedback()}} size="sm" variant="outline" className="w-[40%]" >Feedback</Button>
        <Button onClick={()=>{handleStart()}} size="sm" className="w-[40%] bg-[#2f436e]">Start</Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;

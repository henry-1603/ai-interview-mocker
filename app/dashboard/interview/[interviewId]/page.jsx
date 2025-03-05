"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const router = useRouter();

  const handleStart = () => {
    localStorage.setItem("webCamEnabled", webCamEnabled);
    router.push(`/dashboard/interview/${params.interviewId}/start`);
  };

  useEffect(() => {
    const GetInterviewDetails = async () => {
      if (!params.interviewId) return; // Ensure interviewId exists

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      console.log(result);
      setInterviewData(result[0]);
    };

    GetInterviewDetails();
  }, [params.interviewId]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position : </strong>
              {interviewData?.jobPosition}{" "}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description / Tech Stack : </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience : </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center my-2 text-yellow-600">
              <Lightbulb />
              <strong>
                <u>Information</u>
              </strong>
            </h2>
            <h2 className="text-yellow-600">
              {process.env.NEXT_PUBLIC_INFORMATOIN}
            </h2>
          </div>
        </div>

        <div className="my-5">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                width: 500,
                height: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded-lg border" />
              <Button
                className="w-full mt-7 cursor-pointer text-[#2f436e] bg-gray-100 shadow-md font-bold hover:bg-gray-300"
                onClick={() => setWebCamEnabled(true)}
                variant="ghost"
              >
                Enable Webcam
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex w-full justify-end items-end">
        <Button onClick={handleStart} className="bg-[#2f436e] cursor-pointer w-full">
          {" "}
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;

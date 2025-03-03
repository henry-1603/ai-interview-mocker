"use client";
import { Button } from "@/components/ui/button";
import { MockInterview } from "@/utils/schema";
import { WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetials();
  });

  const GetInterviewDetials = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 flex items-center justify-center flex-col">
      <h2 className="font-bold text-2xl">Let's Get Started!</h2>

      <div>
        {webCamEnabled ? (
          <Webcam 
          onUserMedia={()=> setWebCamEnabled(true)}
          onUserMediaError={()=>setWebCamEnabled(false)} 
          style={{
            width:300,
            height:300,
          }}/>
        ) : (
          <>
          <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded-lg border" />
          <Button className="bg-[#2f436e] w-full mt-7 font-bold" onClick={()=>setWebCamEnabled(true)}>Enable Webcam</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Interview;

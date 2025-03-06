"use client";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { db } from "@/utils/db";

function InterviewList() {
  const user = useUser();

  console.log(user.user?.primaryEmailAddress?.emailAddress);

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user.isLoaded && user.user) {
      GetInterviewDetails();
    }
  }, [user]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(
          MockInterview.createdBy,
          user.user?.primaryEmailAddress?.emailAddress
        )
      )
      .orderBy(desc(MockInterview.id));

    console.log(result);
    setInterviewList(result);
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.length > 0 ? (
          interviewList.map((item, index) => {
            console.log("Rendering InterviewItemCard with item:", item);
            return <InterviewItemCard interview={item} key={index} />;
          })
        ) : (
          <p>No interviews found.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewList;

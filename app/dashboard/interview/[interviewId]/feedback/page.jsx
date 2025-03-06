"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function Feedback() {
  const params = useParams();
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const handleHome = () => {
    router.push(`/dashboard`);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    if (result.length > 0) {
      const totalRating = result.reduce(
        (sum, item) => sum + (item.rating || 0),
        0
      );
      setAverageRating((totalRating / result.length / 10).toFixed(0)); // Keep 1 decimal place
    } else {
      setAverageRating(0);
    }
  };
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations 🎉</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback...</h2>

      {feedbackList.length == 0 ? (
        <h2>No Feedback for this Interview Found!!</h2>
      ) : (
        <>
          <h2 className="text-[#2f436e] text-lg my-3">
            Your overall rating: <strong>{averageRating}/10</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below inteview questions with correct answer , your answer and
            feedback
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="p-2 bg-gray-300 rounded-lg my-2 text-left flex justify-between gap-7 items-center">
                  {item.question}
                  <ChevronsUpDownIcon className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 rounded-lg border ">
                      <strong>Rating :</strong> {item.rating}
                    </h2>
                    <h2 className="p-2 rounded-lg border bg-red-100 text-sm text-red-900">
                      <strong>Your Answer :</strong> {item.userAns}
                    </h2>
                    <h2 className="p-2 rounded-lg border bg-green-100 text-sm text-green-900">
                      <strong>Correct Answer :</strong> {item.correctAns}
                    </h2>
                    <h2 className="p-2 rounded-lg border bg-blue-100 text-sm text-blue-900">
                      <strong>Feedback :</strong> {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

          <Button
            onClick={() => {
              handleHome();
            }}
            className="bg-[#2f436e] font-bold cursor-pointer"
          >
            Go Home
          </Button>
        </>
      )}
    </div>
  );
}

export default Feedback;

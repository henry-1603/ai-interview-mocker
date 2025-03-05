"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, StopCircle, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

function RecordAnsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [camEnabled, setCamEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setIsLoading] = useState(false);
  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    setCamEnabled(localStorage.getItem("webCamEnabled") === "true"); // Convert string to boolean
  }, []);

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result.transcript);
    });
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  // ✅ Use useEffect to wait for `userAnswer` to update before processing
  useEffect(() => {
    if (!isRecording && userAnswer.length > 0) {
      setIsLoading(true);
      console.log("Final Answer:", userAnswer);
      console.log("Answer Length:", userAnswer.length);

      if (userAnswer.length < 5) {
        setIsLoading(false);

        toast("Error while saving your answer, please record again!");
        return;
      }

      const feedbackPrompt =
        "Question : " +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        " Answer : " +
        userAnswer +
        " Depends on question and user answer for this question, please give us a rating for answer and feedback as area of improvement provide it in JSON format with 2 fields rating and feedback.";

      fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: feedbackPrompt }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          const jsonMatch = data.response.match(/```json([\s\S]*?)```/);
          const cleanedResponse = jsonMatch
            ? jsonMatch[1].trim()
            : data.response.trim();
          const parsedData = JSON.parse(cleanedResponse);
          console.log(parsedData);

          const resp = await db.insert(UserAnswer).values({
            mockIdRef: interviewData.mockId,
            question: mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns: userAnswer,
            feedback: parsedData?.feedback,
            rating: parsedData?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date(),
          });

          console.log("re " , resp)

          if (resp) {
            setIsLoading(false);
            toast("User Answer Recorded successfully!");
          }
        })

        .catch((err) => {
          setIsLoading(true);
          console.error("API Error:", err);
        });
    }
  }, [isRecording]); // ✅ Runs when `isRecording` changes

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      <div>
        {camEnabled ? (
          <Webcam
            mirrored={true}
            style={{
              height: 300,
              width: "100%",
              zIndex: 1000,
              position: "relative",
              marginTop: 45,
              marginRight: 50,
            }}
          />
        ) : (
          <WebcamIcon
            height={400}
            className="h-100 w-full p-20 bg-gray-300 rounded-lg border top-[12%]"
          />
        )}
      </div>
      <Button
        className="mt-5 w-full flex text-center items-end justify-center text-[#2f436e] bg-gray-100 shadow-md font-bold hover:bg-gray-300"
        onClick={() => {
          localStorage.setItem("webCamEnabled", (!camEnabled).toString());
          setCamEnabled(!camEnabled);
        }}
      >
        {camEnabled ? "Disable Camera" : "Enable Camera"}
      </Button>

      <Button
        disabled={loading}
        onClick={saveUserAnswer}
        className="mt-5 w-full flex justify-center items-center text-[#2f436e] bg-gray-100 shadow-md font-bold hover:bg-gray-300 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Processing...</span>
          </span>
        ) : isRecording ? (
          <span className="flex items-center gap-2 text-red-600">
            <StopCircle />
            <span>Stop Recording</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Mic />
            <span>Start Recording</span>
          </span>
        )}
      </Button>

      <Button className="w-full mt-5 bg-[#2f436e]">Show User Answer</Button>
      {userAnswer}
    </div>
  );
}

export default RecordAnsSection;

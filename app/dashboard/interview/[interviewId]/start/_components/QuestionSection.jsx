import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  // Show a loader if mockInterviewQuestion is empty or null
  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="p-5 border rounded-lg flex justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-500 animate-pulse">
          Loading interview questions...
        </h2>
      </div>
    );
  }
  
  const textToSpeech = (text) => {
    if("speechSynthesis" in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
  } else {
    alert("Text to speech is not supported in this browser");
  }
}

  return (
    <div className="p-5 border rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full bg-gray-300 text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index
                ? "!bg-[#2f436e] text-white font-bold"
                : ""
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>
      <Volume2 className="cursor-pointer" onClick={()=> {textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}}/>

      <div className="border rounded-lg p-5 bg-blue-100 mt-[30%]">
        <h2 className="flex gap-2 items-center text-[#2f436e]">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <h2>{process.env.NEXT_PUBLIC_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionSection;

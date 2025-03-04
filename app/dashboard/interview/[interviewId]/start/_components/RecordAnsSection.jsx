import { Button } from "@/components/ui/button";
import { WebcamIcon } from "lucide-react";
import React from "react";
import Webcam from "react-webcam";

function RecordAnsSection() {
  return (
    <div>
      
        <div><WebcamIcon height={400}  className="absolute h-100 w-[30%] p-20 bg-[#14203b] rounded-lg border top-[12%]" />
        
        <Webcam
          style={{
            height: 300,
            width:"79%",
            zIndex: 1000,
            position: "relative",
            marginTop:45,
            marginRight:50
          }}
        />
</div>
<Button >Record Answer</Button>

      </div>
    
  );
}

export default RecordAnsSection;

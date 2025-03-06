"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import coverImage from '../public/cover.png'
import './globals.css'

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <Image 
        src={coverImage}
        alt="AI Interview Mocker" 
        layout="fill" 
        objectFit="cover" 
        className="absolute inset-0 w-full !brightness-75 h-full coverImage"
      />
      
      {/* Black Translucent Overlay */}
      <div className="absolute inset-0  flex flex-col items-center justify-center text-white text-center p-6">
        <h1 className="text-6xl font-bold mb-4 textColor">AI Interview Mocker</h1>
        <p className="text-xl font-bold max-w-xl">
          Ace your interviews with AI-powered mock interview sessions tailored to your needs.
        </p>
        
        {/* Go to Dashboard Button */}
        <Button 
          className="mt-6 bg-[#2f436e] hover:bg-[#1d2d4d] text-white px-6 py-3 text-lg font-bold rounded-lg"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
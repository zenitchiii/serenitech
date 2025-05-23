"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

const AiPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  const [currentCallId, setCurrentCallId] = useState<Id<"calls"> | null>(null);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Convex mutations
  const startCallMutation = useMutation(api.calls.startCall);
  const endCallMutation = useMutation(api.calls.endCall);

  // Redirect to sign-in if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // auto scroll message
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ended
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  // Helper function to start call tracking
  const startCallTracking = async () => {
    if (!user?.id) return;
    
    try {
      const callId = await startCallMutation({
        userId: user.id,
        type: "ai_therapy_session",
      });
      setCurrentCallId(callId);
      setCallStartTime(Date.now());
      console.log("Call tracking started:", callId);
    } catch (error) {
      console.error("Failed to start call tracking:", error);
    }
  };

  // Helper function to end call tracking
  const endCallTracking = async () => {
    if (!currentCallId) return;
    
    try {
      const result = await endCallMutation({
        callId: currentCallId,
      });
      console.log("Call tracking ended:", result);
      
      setCurrentCallId(null);
      setCallStartTime(null);
    } catch (error) {
      console.error("Failed to end call tracking:", error);
    }
  };

  // setup vapi event handlers
  useEffect(() => {
    const handleCallStart = async () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
      
      // Start call tracking in Convex
      await startCallTracking();
    };

    const handleCallEnd = async () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
      
      // End call tracking in Convex
      await endCallTracking();
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = async (error: any) => {
      console.log("Vapi Error: ", error);
      setConnecting(false);
      setCallActive(false);
      
      // End call tracking if there was an error
      if (currentCallId) {
        await endCallTracking();
      }
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, [messages, user, currentCallId]);

  // Cleanup function to handle page unload/navigation
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (currentCallId && callActive) {
        await endCallTracking();
      }
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden' && currentCallId && callActive) {
        // User is navigating away or closing tab during active call
        await endCallTracking();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentCallId, callActive]);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
      // Call tracking will be handled in the handleCallEnd event
    } else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);

        const firstName = user?.firstName ? `${user.firstName}` : "There";

        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
          variableValues: {
            first_name: firstName,
          },
          clientMessages: [],
          serverMessages: [],
        });
        // Call tracking will be handled in the handleCallStart event
      } catch (error) {
        console.log("Failed to start call: ", error);
        setConnecting(false);
      }
    }
  };

  // Format call duration for display
  const formatCallDuration = () => {
    if (!callStartTime) return "00:00";
    
    const now = Date.now();
    const duration = now - callStartTime;
    const minutes = Math.floor(duration / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Real-time duration update
  const [displayDuration, setDisplayDuration] = useState("00:00");
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callActive && callStartTime) {
      interval = setInterval(() => {
        setDisplayDuration(formatCallDuration());
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callActive, callStartTime]);

  if (!isLoaded || !isSignedIn) {
    // Optionally show a loading or fallback UI before redirect
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-sans">
            <span>Talk to </span>
            <span className="text-primary uppercase">Dr. House</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Have a conversation with Dr. House and get personalized mental health advice.
          </p>
          
          {/* Call Duration Display */}
          {callActive && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono text-primary">
                Session Duration: {displayDuration}
              </span>
            </div>
          )}
        </div>

        {/* Video Call Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI Card */}
          <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* Animation for AI */}
              <div
                className={`absolute inset-0 ${
                  isSpeaking ? "opacity-30" : "opacity-0"
                } transition-opacity duration-300`}
              >
                {/* Voice wave animation when speaking */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                        isSpeaking ? "animate-sound-wave" : ""
                      }`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Avatar */}
              <div className="relative size-32 mb-4">
                <div
                  className={`absolute inset-0 bg-primary rounded-full blur-lg ${
                    isSpeaking ? "animate-pulse" : ""
                  }`}
                />
                <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10"></div>
                  <img
                    src="/avatar.jpg"
                    alt="Dr. House"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">Dr. House</h2>
              <p className="text-sm text-muted-foreground mt-1">AI Therapist</p>

              {/* Speaking Indicator */}
              <div
                className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                  isSpeaking ? "border-primary" : ""
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                    ? "Listening..."
                    : callEnded
                    ? "Session completed!"
                    : "Waiting"}
                </span>
              </div>
            </div>
          </Card>
          
          {/* USER CARD */}
          <Card className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative`}>
            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* User Image */}
              <div className="relative size-32 mb-4">
                <img
                  src={user?.imageUrl}
                  alt="User"
                  className="size-full object-cover rounded-full"
                />
              </div>

              <h2 className="text-xl font-bold text-foreground">You</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
              </p>

              {/* User Status */}
              <div className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}>
                <div className={`w-2 h-2 rounded-full ${
                  callActive ? "bg-green-500 animate-pulse" : "bg-muted"
                }`} />
                <span className="text-xs text-muted-foreground">
                  {callActive ? "In Session" : "Ready"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Message Container */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
          >
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-muted-foreground mb-1">
                    {msg.role === "assistant" ? "Dr. House" : "You"}:
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              ))}

              {callEnded && (
                <div className="message-item animate-fadeIn">
                  <div className="font-semibold text-xs text-primary mb-1">System:</div>
                  <p className="text-foreground">
                    Session completed and saved to your profile! Redirecting...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call Controls */}
        <div className="w-full flex justify-center gap-4">
          <Button
            className={`w-40 text-xl rounded-3xl ${
              callActive
                ? "bg-destructive hover:bg-destructive/90"
                : callEnded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            } text-white relative`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
            )}

            <span>
              {callActive
                ? "End Session"
                : connecting
                ? "Connecting..."
                : callEnded
                ? "View Profile"
                : "Start Session"}
            </span>
          </Button>
        </div>

        {/* Session Info */}
        {currentCallId && (
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Session ID: {currentCallId} • Your progress is being tracked
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiPage;
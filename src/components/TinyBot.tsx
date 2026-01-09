import { useState, useRef, useEffect } from "react";
import { MessageCircle, Mic, Volume2, Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://heybabyy-api.onrender.com";

const TinyBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👶 I'm TinyBot, your baby care assistant. Ask me anything about feeding, sleep, milestones, or general baby care!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [tinySpeaksEnabled, setTinySpeaksEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "What's a good feeding schedule?",
    "How to establish sleep routines?", 
    "Vaccination timeline?",
    "Baby development milestones?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (text: string) => {
    if (tinySpeaksEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };


  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-10)
        })
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.reply };
      setMessages(prev => [...prev, assistantMessage]);
      speakText(data.reply);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm having trouble connecting to my brain right now! 🙈 Please check if the backend server is running, or try again in a moment."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">🤖</div>
        <div>
          <h2 className="text-2xl font-bold text-primary">TinyBot Assistant</h2>
          <p className="text-muted-foreground text-sm">
            Your AI companion for baby care guidance
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="h-[300px] mb-4 pr-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestion Chips */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {suggestionChips.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about baby care..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="button" variant="outline" size="icon" disabled>
          <Mic className="h-4 w-4" />
        </Button>
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* TinySpeaks Toggle */}
      <div className="flex justify-end">
        <Badge 
          variant={tinySpeaksEnabled ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => setTinySpeaksEnabled(!tinySpeaksEnabled)}
        >
          <Volume2 className="h-3 w-3 mr-1" />
          TinySpeaks {tinySpeaksEnabled ? "ON" : "OFF"}
        </Badge>
      </div>
    </Card>
  );
};

export default TinyBot;

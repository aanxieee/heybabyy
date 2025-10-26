import { useState } from "react";
import { MessageCircle, Mic, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const TinyBot = () => {
  const [input, setInput] = useState("");
  const [tinySpeaksEnabled, setTinySpeaksEnabled] = useState(false);

  const suggestionChips = [
    "What's a good feeding schedule?",
    "How to establish sleep routines?", 
    "Vaccination timeline?",
    "Baby development milestones?"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is UI only - no actual processing
    console.log("TinyBot query:", input);
  };

  return (
    <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="flex items-center mb-6">
        <div className="text-4xl mr-4">🤖</div>
        <div>
          <h2 className="text-2xl font-bold text-primary">TinyBot Assistant</h2>
          <p className="text-muted-foreground">
            Your AI companion for baby care guidance and support
          </p>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Popular questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestionChips.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about baby care..."
          className="flex-1"
        />
        <Button type="button" variant="outline" size="icon">
          <Mic className="h-4 w-4" />
        </Button>
        <Button type="submit">
          <MessageCircle className="h-4 w-4 mr-2" />
          Send
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
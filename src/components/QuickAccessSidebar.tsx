import { HelpCircle, Lightbulb, ShieldX, Utensils, Droplets, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickAccessSidebar = () => {
  const quickLinks = [
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
    { id: 'myths', label: 'Myth Breaker', icon: ShieldX },
    { id: 'food', label: 'Food Guide', icon: Utensils },
    { id: 'hygiene', label: 'Hygiene Tips', icon: Droplets },
    { id: 'who', label: 'WHO Guidelines', icon: Globe },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-background border-r z-10">
      <Card className="m-4 p-4">
        <h3 className="font-semibold text-primary mb-4">Quick Access</h3>
        <div className="space-y-2">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Button
                key={link.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => scrollToSection(link.id)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {link.label}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default QuickAccessSidebar;
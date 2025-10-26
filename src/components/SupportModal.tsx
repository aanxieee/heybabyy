import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SupportModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save locally only
    localStorage.setItem('supportRequest', JSON.stringify(formData));
    toast({
      title: "Request Submitted",
      description: "We'll help connect you with available milk donors in your area.",
    });
    
    // Reset form
    setFormData({ name: "", phone: "", area: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
          Find milk support
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Find Milk Support</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="area">Area/Location</Label>
            <Input
              id="area"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Request Support
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
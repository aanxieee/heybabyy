import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const DonorModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    consent: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms to continue.",
        variant: "destructive"
      });
      return;
    }
    
    // Save locally only
    localStorage.setItem('donorInfo', JSON.stringify(formData));
    toast({
      title: "Registration Submitted",
      description: "Thank you for registering as a milk donor. We'll contact you soon.",
    });
    
    // Reset form
    setFormData({ name: "", phone: "", area: "", consent: false });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
          Become a donor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Become a Milk Donor</DialogTitle>
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
            />
            <Label htmlFor="consent" className="text-sm">
              I consent to medical screening and agree to the milk donation guidelines
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Register as Donor
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonorModal;
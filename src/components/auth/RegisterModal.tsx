import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/ApiAuthContext';
import { useToast } from '@/hooks/use-toast';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState<'parent' | 'baby'>('parent');
  const [isLoading, setIsLoading] = useState(false);
  
  const [parentDetails, setParentDetails] = useState({
    motherName: '',
    fatherName: '',
    motherEmail: '',
    fatherEmail: '',
    motherDob: '',
    fatherDob: '',
    motherHealthHistory: '',
    fatherHealthHistory: '',
    motherBloodGroup: '',
    fatherBloodGroup: '',
    mobileNumber: '',
    location: '',
    doctorPrescription: '',
  });

  const [babyDetails, setBabyDetails] = useState({
    name: '',
    dob: '',
    birthTime: '',
    height: '',
    weight: '',
    eyesight: '',
    bloodGroup: '',
    vaccinationRecord: '',
    gender: '' as 'male' | 'female' | 'other',
    siblingData: '',
  });

  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleParentSubmit = () => {
    if (!parentDetails.motherName || !parentDetails.fatherName || !parentDetails.mobileNumber) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    setStep('baby');
  };

  const handleRegister = async () => {
    if (!babyDetails.name || !babyDetails.dob || !babyDetails.gender) {
      toast({
        title: "Error",
        description: "Please fill all required baby details",
        variant: "destructive",
      });
      return;
    }

    if (!parentDetails.mobileNumber || parentDetails.mobileNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit mobile number in Parent Details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Use mobile-based email so login works directly in demo and API modes
    const email = `${parentDetails.mobileNumber}@demo.com`;
    const password = "demo123";
    const fullName = `${parentDetails.motherName} & ${parentDetails.fatherName}`.trim();

    const { error } = await signUp(email, password, fullName);
    if (!error) {
      toast({
        title: "Success",
        description: "Registration successful! You are now logged in.",
      });
      onClose();
      resetForm();
    } else {
      toast({
        title: "Error",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setStep('parent');
    setParentDetails({
      motherName: '',
      fatherName: '',
      motherEmail: '',
      fatherEmail: '',
      motherDob: '',
      fatherDob: '',
      motherHealthHistory: '',
      fatherHealthHistory: '',
      motherBloodGroup: '',
      fatherBloodGroup: '',
      mobileNumber: '',
      location: '',
      doctorPrescription: '',
    });
    setBabyDetails({
      name: '',
      dob: '',
      birthTime: '',
      height: '',
      weight: '',
      eyesight: '',
      bloodGroup: '',
      vaccinationRecord: '',
      gender: '' as 'male' | 'female' | 'other',
      siblingData: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center gradient-text">
            Register with HeyBabyy - {step === 'parent' ? 'Parent Details' : 'Baby Details'}
          </DialogTitle>
        </DialogHeader>
        
        {step === 'parent' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name *</Label>
                <Input
                  id="motherName"
                  value={parentDetails.motherName}
                  onChange={(e) => setParentDetails(prev => ({ ...prev, motherName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  value={parentDetails.fatherName}
                  onChange={(e) => setParentDetails(prev => ({ ...prev, fatherName: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherEmail">Mother's Email</Label>
                <Input
                  id="motherEmail"
                  type="email"
                  value={parentDetails.motherEmail}
                  onChange={(e) => setParentDetails(prev => ({ ...prev, motherEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherEmail">Father's Email</Label>
                <Input
                  id="fatherEmail"
                  type="email"
                  value={parentDetails.fatherEmail}
                  onChange={(e) => setParentDetails(prev => ({ ...prev, fatherEmail: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherDob">Mother's DOB</Label>
                <Input
                  id="motherDob"
                  type="date"
                  value={parentDetails.motherDob}
                  onChange={(e) => setParentDetails(prev => ({ ...prev, motherDob: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherDob">Father's DOB</Label>
                <Input
                  id="fatherDob"
                  type="date"
                  value={parentDetails.fatherDob}
                  onChange={(e) => setParentDetails(prev => ({ ...prev, fatherDob: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherBloodGroup">Mother's Blood Group</Label>
                <Select value={parentDetails.motherBloodGroup} onValueChange={(value) => setParentDetails(prev => ({ ...prev, motherBloodGroup: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherBloodGroup">Father's Blood Group</Label>
                <Select value={parentDetails.fatherBloodGroup} onValueChange={(value) => setParentDetails(prev => ({ ...prev, fatherBloodGroup: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                type="tel"
                value={parentDetails.mobileNumber}
                onChange={(e) => setParentDetails(prev => ({ ...prev, mobileNumber: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={parentDetails.location}
                onChange={(e) => setParentDetails(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <Button onClick={handleParentSubmit} className="w-full">
              Continue to Baby Details
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="text-primary hover:underline">
                  Login here
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="babyName">Baby's Name *</Label>
                <Input
                  id="babyName"
                  value={babyDetails.name}
                  onChange={(e) => setBabyDetails(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="babyDob">Date of Birth *</Label>
                <Input
                  id="babyDob"
                  type="date"
                  value={babyDetails.dob}
                  onChange={(e) => setBabyDetails(prev => ({ ...prev, dob: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthTime">Birth Time (Optional)</Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={babyDetails.birthTime}
                  onChange={(e) => setBabyDetails(prev => ({ ...prev, birthTime: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={babyDetails.gender} onValueChange={(value) => setBabyDetails(prev => ({ ...prev, gender: value as 'male' | 'female' | 'other' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  value={babyDetails.height}
                  onChange={(e) => setBabyDetails(prev => ({ ...prev, height: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  value={babyDetails.weight}
                  onChange={(e) => setBabyDetails(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="babyBloodGroup">Blood Group</Label>
                <Select value={babyDetails.bloodGroup} onValueChange={(value) => setBabyDetails(prev => ({ ...prev, bloodGroup: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep('parent')} className="w-full">
                Back to Parent Details
              </Button>
              <Button onClick={handleRegister} disabled={isLoading} className="w-full">
                {isLoading ? "Registering..." : "Complete Registration"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
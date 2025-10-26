import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/ApiAuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid mobile number (at least 10 digits)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Demo login - accept any mobile number
    const { error } = await signIn(`${mobileNumber}@demo.com`, "demo123");
    
    if (!error) {
      toast({
        title: "Success",
        description: "Logged in successfully! Welcome to HeyBabyy 🎉",
      });
      onClose();
      resetForm();
    } else {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setMobileNumber('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center gradient-text">Login to HeyBabyy</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Demo mode: Enter any 10-digit number</p>
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                onClick={onSwitchToRegister}
                className="text-primary hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
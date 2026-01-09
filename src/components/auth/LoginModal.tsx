import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/ApiAuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const { signIn } = useAuth();
  const { toast } = useToast();

  const DEMO_MOBILE = '9876543210';
  const DEMO_OTP = '123456';

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setIsDemoMode(true);
    
    // Use demo credentials
    const { error } = await signIn(`${DEMO_MOBILE}@demo.com`, "demo123");
    
    if (!error) {
      toast({
        title: "🎉 Demo Login Successful!",
        description: `Welcome to HeyBabyy Demo Mode! Demo OTP: ${DEMO_OTP}`,
      });
      onClose();
      resetForm();
    } else {
      console.error('Demo login error:', error);
      toast({
        title: "Demo Login Failed",
        description: error?.message || "Please make sure the backend is running or enable VITE_DEMO_AUTH=true in .env.local",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

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
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error?.message || "Please make sure the backend is running or enable VITE_DEMO_AUTH=true in .env.local",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setMobileNumber('');
    setIsDemoMode(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center gradient-text">
            Login to HeyBabyy
            {isDemoMode && (
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Demo Mode
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Demo Login Button */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-dashed border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">Quick Demo Login</span>
              </div>
              <Badge variant="outline" className="text-xs">No signup needed</Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Try HeyBabyy instantly without registration. Demo OTP: <strong>{DEMO_OTP}</strong>
            </p>
            <Button 
              onClick={handleDemoLogin} 
              disabled={isLoading}
              className="w-full"
              variant="secondary"
            >
              {isLoading ? "Logging in..." : "🎯 Try Demo Login"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or login with mobile</span>
            </div>
          </div>

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
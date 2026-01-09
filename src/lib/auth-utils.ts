import { useAuth } from '@/contexts/ApiAuthContext';
import { useToast } from '@/hooks/use-toast';

export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const requireAuth = (action: () => void, actionName: string = 'this action') => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: `Please login to ${actionName}`,
        variant: "destructive",
      });
      return false;
    }
    action();
    return true;
  };

  return { requireAuth, isAuthenticated };
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/ApiAuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';
import ProductsDropdown from '@/components/ProductsDropdown';
import LanguageBubbleSelector from '@/components/LanguageBubbleSelector';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeSection?: string;
  onNavClick?: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { isAuthenticated, signOut } = useAuth();
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();

  const navItems = [
    { id: 'products', label: 'Products', hasDropdown: true, route: '/products' },
    { id: 'services', label: 'Services', route: '/services' },
    { id: 'insights', label: 'Insights', route: '/insights' },
    { id: 'support', label: 'Support', route: '/support' },
    { id: 'sos', label: 'SOS', route: '/support#sos' },
    { id: 'mental-health', label: 'Mental Health', route: '/support#mental-health' },
    { id: 'about', label: 'About Us', route: '/about' }
  ];

  const handleNavClick = (sectionId: string) => {
    if (onNavClick) {
      onNavClick(sectionId);
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully'
    });
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-border shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold gradient-text">HeyBabyy</div>
                <div className="flex space-x-1">
                  <div className="w-6 h-8 bg-gradient-primary rounded-full rotate-12 opacity-80" />
                  <div className="w-6 h-8 bg-gradient-secondary rounded-full -rotate-12 opacity-80" />
                </div>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <Link
                        to={item.route}
                        onMouseEnter={() => setShowProductsDropdown(true)}
                        onMouseLeave={() => setShowProductsDropdown(false)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-foreground hover:bg-muted"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Link>
                      
                      {showProductsDropdown && (
                        <div
                          onMouseEnter={() => setShowProductsDropdown(true)}
                          onMouseLeave={() => setShowProductsDropdown(false)}
                        >
                          <ProductsDropdown />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.route}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-foreground hover:bg-muted"
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - Language, Login, Register */}
            <div className="flex items-center space-x-4">
              {/* Language Bubble Selector */}
              <LanguageBubbleSelector />

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowLoginModal(true)}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => setShowRegisterModal(true)}>
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.route}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left",
                    activeSection === item.id
                      ? "bg-gradient-primary text-white"
                      : "hover:bg-muted"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export { Navbar };
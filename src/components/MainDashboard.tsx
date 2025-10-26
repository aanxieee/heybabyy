import { useState } from "react";
import { MessageCircle, User, Menu, Heart, Baby, MapPin, BarChart3, BookOpen, LogOut, HelpCircle, Lightbulb, ShieldX, Utensils, Droplets, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/ApiAuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { RegisterModal } from "@/components/auth/RegisterModal";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface MainDashboardProps {
  selectedLanguage: Language;
}

const MainDashboard = ({ selectedLanguage }: MainDashboardProps) => {
  const [activeSection, setActiveSection] = useState<string>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  const { user, isAuthenticated, signOut } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const protectedNavItems = ['products', 'services'];

  const navItems = [
    { id: 'products', label: t('products'), icon: Heart, protected: true },
    { id: 'services', label: t('services'), icon: Baby, protected: true },
    { id: 'support', label: t('support'), icon: BookOpen, protected: false },
    { id: 'insights', label: t('insights'), icon: BarChart3, protected: false },
    { id: 'about', label: t('aboutUs'), icon: User, protected: false },
  ];

  const quickActions = [
    { id: 'faqs', label: t('faqs'), icon: HelpCircle },
    { id: 'tips', label: t('tips'), icon: Lightbulb },
    { id: 'myths', label: t('mythBreaker'), icon: ShieldX },
    { id: 'food', label: t('foodGuide'), icon: Utensils },
    { id: 'hygiene', label: t('hygieneTips'), icon: Droplets },
    { id: 'who', label: t('whoGuidelines'), icon: Globe },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleNavClick = (item: any) => {
    if (item.protected && !isAuthenticated) {
      setShowLoginModal(true);
      toast({
        title: t('loginRequired'),
        description: `${t('pleaseLoginToAccess')} ${item.label}`,
        variant: "destructive",
      });
      return;
    }
    setActiveSection(item.id);
    toast({
      title: `${t('navigatingTo')} ${item.label}`,
      description: item.protected ? t('protectedContent') : t('publicPage'),
    });
  };

  const handleLogout = () => {
    signOut();
    setActiveSection('chat');
    toast({
      title: t('loggedOut'),
      description: t('loggedOutDesc'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-gradient">HeyBabyy</div>
                <div className="flex space-x-1">
                  <div className="w-6 h-8 bg-gradient-primary rounded-full rotate-12 opacity-80" />
                  <div className="w-6 h-8 bg-gradient-secondary rounded-full -rotate-12 opacity-80" />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                    activeSection === item.id
                      ? 'bg-gradient-primary text-white shadow-glow'
                      : 'text-foreground hover:bg-muted'
                  } ${item.protected && !isAuthenticated ? 'opacity-60' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.protected && !isAuthenticated && (
                    <span className="text-xs">🔒</span>
                  )}
                </button>
              ))}
            </nav>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {selectedLanguage.nativeName}
              </div>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium hidden sm:inline">
                      {user?.full_name || 'User'}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">{t('logout')}</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowLoginModal(true)}>
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">{t('login')}</span>
                  </Button>
                  <Button size="sm" onClick={() => setShowRegisterModal(true)} className="hidden sm:inline-flex">
                    {t('register')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Quick Actions */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md border-r border-border transition-transform duration-300 ease-in-out`}>
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('quickAccess')}</h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => scrollToSection(action.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    activeSection === action.id ? 'bg-primary/10 border-primary/20 border' : 'hover:bg-muted'
                  }`}
                >
                  <action.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8 max-w-4xl mx-auto">
            {/* TinyBot Assistant Card */}
            <div className="bubble p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Baby className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">{t('tinybotAssistant')}</h2>
                  <p className="text-muted-foreground">
                    {isAuthenticated 
                      ? `${t('hello')} ${user?.full_name || 'User'}! ${t('helpWithBaby')}`
                      : t('aiCompanion')
                    }
                  </p>
                </div>
              </div>
              
              {/* Welcome Message */}
              <div className="bg-gradient-subtle p-4 rounded-xl mb-6">
                <p className="text-foreground">
                  👋 {isAuthenticated ? `${t('welcomeBack')}!` : `${t('hello')}!`} {t('welcomeMessage')}
                </p>
              </div>

              {/* Quick Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[
                  t('feedingSchedule'),
                  t('sleepRoutines'),
                  t('vaccination'),
                  t('milestones')
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    className="p-3 text-left bg-white/50 rounded-lg border border-border hover:shadow-soft transition-all duration-200 text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder={t('chatPlaceholder')}
                  className="flex-1 p-3 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* FAQs Section */}
            <section id="faqs" className="bubble p-8 space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <HelpCircle className="w-6 h-6" />
                {t('faqs')}
              </h2>
              <div className="grid gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">How much should a newborn sleep?</h3>
                  <p className="text-muted-foreground">14–17 hours in 24h split into short naps. Wake for feeds if long stretches &gt;3–4h (first weeks).</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">How often to feed?</h3>
                  <p className="text-muted-foreground">On demand: typically 8–12 feeds/day. Watch hunger cues (rooting, hand-to-mouth).</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">When is the first pediatric visit?</h3>
                  <p className="text-muted-foreground">Within 48–72 hours after hospital discharge (or as advised), then per schedule.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Is spitting up normal?</h3>
                  <p className="text-muted-foreground">Small, effortless spit-ups are common. Red flags: forceful vomiting, blood, poor weight gain.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">How many wet diapers?</h3>
                  <p className="text-muted-foreground">Day 1: 1–2 → by Day 5+: 6+ wets/day; stools vary.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">What temperature counts as fever?</h3>
                  <p className="text-muted-foreground">Rectal ≥38°C (100.4°F). Emergency: contact doctor immediately for &lt;3 months.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Can my baby sleep on the side?</h3>
                  <p className="text-muted-foreground">No. Back to sleep on a firm, flat surface; no pillows/loose bedding.</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">When to start tummy time?</h3>
                  <p className="text-muted-foreground">From day 1 while awake; start 2–3 min sessions, several times a day.</p>
                </div>
              </div>
            </section>

            {/* Tips Section */}
            <section id="tips" className="bubble p-8 space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <Lightbulb className="w-6 h-6" />
                {t('tips')}
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Back to sleep</h3>
                    <p className="text-muted-foreground text-sm">Always supine on a firm mattress; use fitted sheet only.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Room-share, not bed-share</h3>
                    <p className="text-muted-foreground text-sm">For first 6 months (safer sleep).</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Feed on cues</h3>
                    <p className="text-muted-foreground text-sm">Early cues beat crying; ensure deep latch if breastfeeding.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Burp & hold upright</h3>
                    <p className="text-muted-foreground text-sm">10–15 min post-feed to reduce spit-ups.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Skin-to-skin daily</h3>
                    <p className="text-muted-foreground text-sm">Stabilizes temp/HR, helps bonding & milk.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Track basics</h3>
                    <p className="text-muted-foreground text-sm">Feeds, wets, sleep—use the app's Growth/Nutrition trackers.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Myth Breaker Section */}
            <section id="myths" className="bubble p-8 space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <ShieldX className="w-6 h-6" />
                {t('mythBreaker')}
              </h2>
              <div className="grid gap-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-800">"Water for newborns" → Myth</h3>
                  <p className="text-red-700 text-sm">Breastmilk/formula covers hydration; water can be unsafe before ~6 months (unless doctor says).</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-800">"Formula is harmful" → Myth</h3>
                  <p className="text-red-700 text-sm">Properly prepared formula is safe; choose with your pediatrician.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-800">"Oil massage cures colic" → Myth</h3>
                  <p className="text-red-700 text-sm">Massage can soothe but is not a cure; avoid vigorous belly pressure.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-800">"Fever after vaccine is dangerous" → Myth</h3>
                  <p className="text-red-700 text-sm">Mild fever/irritability is common; follow dosage/doctor advice.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-800">"Honey soothes cough" → Myth for &lt;1 yr</h3>
                  <p className="text-red-700 text-sm">Honey risk of botulism.</p>
                </div>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-800">"Side sleeping prevents choking" → Myth</h3>
                  <p className="text-red-700 text-sm">Back-sleeping is safest and reduces SIDS.</p>
                </div>
              </div>
            </section>

            {/* Food Guide Section */}
            <section id="food" className="bubble p-8 space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <Utensils className="w-6 h-6" />
                {t('foodGuide')}
              </h2>
              <div className="grid gap-4">
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-800">0–6 months</h3>
                  <p className="text-green-700 text-sm">Exclusive breastmilk or formula. No water/honey/juice. Vitamin D as advised.</p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-blue-800">6–8 months</h3>
                  <p className="text-blue-700 text-sm">Start iron-rich purees/soft foods once baby shows readiness (sits with support, good head control, interest). Offer 1–2 meals/day + breastmilk/formula.</p>
                </div>
                <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-purple-800">8–10 months</h3>
                  <p className="text-purple-700 text-sm">Increase textures (mashed/soft finger foods). 2–3 meals + snacks.</p>
                </div>
                <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-orange-800">10–12 months</h3>
                  <p className="text-orange-700 text-sm">Family foods (less salt/sugar), allergen introduction per guidance (peanut/egg in safe forms).</p>
                </div>
                <div className="p-4 bg-cyan-50 border-l-4 border-cyan-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-cyan-800">Fluids</h3>
                  <p className="text-cyan-700 text-sm">Water in small sips from ~6 months with meals. Avoid juices/fizzy drinks.</p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <h3 className="font-semibold mb-2 text-yellow-800">Allergy watch</h3>
                  <p className="text-yellow-700 text-sm">Introduce one new food at a time; observe 2–3 days for reactions.</p>
                </div>
              </div>
            </section>

            {/* Hygiene Tips Section */}
            <section id="hygiene" className="bubble p-8 space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <Droplets className="w-6 h-6" />
                {t('hygieneTips')}
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Cord care</h3>
                    <p className="text-muted-foreground text-sm">Keep dry & exposed to air; clean with dry cotton if needed. See doctor for redness/discharge/odor.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Bathing</h3>
                    <p className="text-muted-foreground text-sm">2–3 times/week is enough; lukewarm water, fragrance-free cleanser.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Hands & surfaces</h3>
                    <p className="text-muted-foreground text-sm">Wash before feeds and after diaper changes; sanitize high-touch areas.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Bottle care</h3>
                    <p className="text-muted-foreground text-sm">Sterilize initially; then hot soapy wash + proper drying; follow formula prep instructions exactly.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Laundry</h3>
                    <p className="text-muted-foreground text-sm">Mild, fragrance-free detergent; separate heavily soiled items.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Nails & skin</h3>
                    <p className="text-muted-foreground text-sm">Trim with baby clippers while asleep; moisturize dry patches.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO Guidelines Section */}
            <section id="who" className="bubble p-8 space-y-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <Globe className="w-6 h-6" />
                {t('whoGuidelines')}
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Exclusive breastfeeding</h3>
                    <p className="text-muted-foreground text-sm">0–6 months; continue breastfeeding to 2 years+ with complementary foods from ~6 months.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Immunization</h3>
                    <p className="text-muted-foreground text-sm">Per national schedule; don't delay routine vaccines without medical reason.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Responsive caregiving</h3>
                    <p className="text-muted-foreground text-sm">Talk, sing, cuddle; follow baby cues.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Safe sleep</h3>
                    <p className="text-muted-foreground text-sm">Back to sleep, smoke-free environment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Micronutrient adequacy</h3>
                    <p className="text-muted-foreground text-sm">Iron-rich complementary foods; consider supplements as recommended.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Seek care early</h3>
                    <p className="text-muted-foreground text-sm">For danger signs: poor feeding, lethargy, breathing difficulty, fever, convulsions, persistent vomiting/diarrhea.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bubble p-6 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ <strong>Disclaimer:</strong> This app offers general guidance and is not a medical diagnosis. For emergencies or concerns, contact your pediatrician or local emergency number.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Voice Assistant Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full bg-gradient-secondary shadow-hero hover:scale-105 transition-transform duration-200 p-4"
        >
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse-soft" />
            <span className="hidden sm:inline font-medium">{t('tinySpeaks')}</span>
          </div>
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Auth Modals */}
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
    </div>
  );
};

export default MainDashboard;
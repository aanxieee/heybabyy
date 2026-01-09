import React, { useState } from 'react';
import { 
  MapPin, 
  Camera, 
  Bell, 
  Utensils, 
  TrendingUp, 
  Phone, 
  Navigation,
  Upload,
  Plus,
  Check,
  BarChart,
  AlertTriangle,
  Droplets,
  Baby
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Navbar } from '@/components/Navbar';
import DonorModal from '@/components/DonorModal';
import SupportModal from '@/components/SupportModal';
import { 
  analyzeGrowth, 
  detectGrowthDrift, 
  generateGrowthSparkline, 
  sparklineToAscii,
  type Gender 
} from '@/lib/growthStandards';
import {
  parseFreeTextLog,
  generateDailySummary,
  getTipsForAge,
  createFeedingEntry,
  createDiaperEntry,
  type DailyLog,
  type FeedingEntry,
  type DiaperEntry,
  type FeedType
} from '@/lib/nutritionRules';

const nearbyCategories = [
  'Crèches', 'Play schools', 'Vaccination centres', 
  'Pediatricians', 'Lactation consultants', 'Blood banks'
];

const mockNearbyPlaces = [
  { name: 'Rainbow Pediatric Clinic', distance: '0.8 km', phone: '+91-9876543210' },
  { name: 'Little Angels Crèche', distance: '1.2 km', phone: '+91-9876543211' },
  { name: 'City Vaccination Center', distance: '2.1 km', phone: '+91-9876543212' },
];

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [showDiagnosisResult, setShowDiagnosisResult] = useState(false);
  const [reminders, setReminders] = useState([
    { id: 1, type: 'Vaccine', title: 'DPT-3 Vaccine', date: '2024-01-15', time: '10:30 AM', child: 'Emma', done: false },
    { id: 2, type: 'Doctor', title: 'Pediatric Checkup', date: '2024-01-20', time: '2:00 PM', child: 'Emma', done: false },
  ]);

  // Growth Tracker State
  const [babyAge, setBabyAge] = useState<number>(6);
  const [babyWeight, setBabyWeight] = useState<string>('');
  const [babyLength, setBabyLength] = useState<string>('');
  const [babyGender, setBabyGender] = useState<Gender>('boy');
  const [growthLogs, setGrowthLogs] = useState<Array<{ month: number; weight: number }>>([
    { month: 0, weight: 3.3 },
    { month: 2, weight: 5.2 },
    { month: 4, weight: 6.8 },
  ]);

  // Nutrition Tracker State
  const [freeTextInput, setFreeTextInput] = useState('');
  const [todayLog, setTodayLog] = useState<DailyLog>({
    date: new Date().toISOString().split('T')[0],
    feedings: [],
    diapers: [],
    freeTextLogs: [],
  });
  const [structuredFeedType, setStructuredFeedType] = useState<FeedType>('breast');
  const [structuredQuantity, setStructuredQuantity] = useState('');
  const [structuredDuration, setStructuredDuration] = useState('');

  // Growth Analysis
  const latestGrowth = growthLogs.length > 0 ? growthLogs[growthLogs.length - 1] : null;
  const growthAnalysis = latestGrowth 
    ? analyzeGrowth(babyGender, latestGrowth.month, latestGrowth.weight, babyLength ? Number(babyLength) : undefined)
    : null;
  const growthDrift = detectGrowthDrift(growthLogs, babyGender);
  const sparkline = generateGrowthSparkline(growthLogs, babyGender);

  // Nutrition Summary
  const nutritionSummary = generateDailySummary(todayLog, babyAge);
  const nutritionTips = getTipsForAge(babyAge);

  const handleAddGrowthEntry = () => {
    if (!babyWeight) return;
    const newEntry = { month: babyAge, weight: Number(babyWeight) };
    setGrowthLogs(prev => [...prev, newEntry].sort((a, b) => a.month - b.month));
    setBabyWeight('');
    setBabyLength('');
  };

  const handleFreeTextLog = () => {
    if (!freeTextInput.trim()) return;
    const parsed = parseFreeTextLog(freeTextInput, babyAge);
    
    const newFeedings: FeedingEntry[] = parsed.feedings.map(f => ({
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      type: f.type || 'other',
      quantity: f.quantity,
      duration: f.duration,
    }));

    const newDiapers: DiaperEntry[] = parsed.diapers.map(d => ({
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      wet: d.wet || false,
      stool: d.stool || false,
    }));

    setTodayLog(prev => ({
      ...prev,
      feedings: [...prev.feedings, ...newFeedings],
      diapers: [...prev.diapers, ...newDiapers],
      freeTextLogs: [...prev.freeTextLogs, freeTextInput],
    }));
    setFreeTextInput('');
  };

  const handleStructuredEntry = () => {
    const entry = createFeedingEntry(structuredFeedType, {
      quantity: structuredQuantity ? Number(structuredQuantity) : undefined,
      duration: structuredDuration ? Number(structuredDuration) : undefined,
    });
    setTodayLog(prev => ({
      ...prev,
      feedings: [...prev.feedings, entry],
    }));
    setStructuredQuantity('');
    setStructuredDuration('');
  };

  const handleAddDiaper = (wet: boolean, stool: boolean) => {
    const entry = createDiaperEntry(wet, stool);
    setTodayLog(prev => ({
      ...prev,
      diapers: [...prev.diapers, entry],
    }));
  };

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };

  const runDiagnosisDemo = () => {
    setShowDiagnosisResult(true);
  };

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, done: !r.done } : r
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navbar activeSection="services" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Baby Care Services</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive healthcare and support services for your baby
          </p>
        </div>

        {/* Services Tabs */}
        <Tabs defaultValue="nearby" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="diagnosis">Visual Diagnosis</TabsTrigger>
            <TabsTrigger value="reminders">Reminders & Records</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Tracker</TabsTrigger>
            <TabsTrigger value="growth">Growth Tracker</TabsTrigger>
          </TabsList>

          {/* Nearby Services */}
          <TabsContent value="nearby" className="space-y-6">
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Find Nearby Services
                </CardTitle>
                <CardDescription>
                  Locate essential baby care services and healthcare providers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {nearbyCategories.map(category => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {activeCategory && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* List */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Nearby {activeCategory}</h3>
                      {mockNearbyPlaces.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{place.name}</h4>
                                <p className="text-sm text-muted-foreground">{place.distance} away</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Phone className="h-4 w-4 mr-1" />
                                  Call
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Navigation className="h-4 w-4 mr-1" />
                                  Maps
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Maps & Places API will be added later; this is a demo layout.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lactation Support Section */}
                {activeCategory === 'Lactation consultants' && (
                  <div className="mt-8 p-6 bg-gradient-subtle rounded-lg">
                    <h3 className="font-semibold mb-4 text-primary">Milk Support Network</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mothers with surplus milk can help mothers with low supply. All donors are medically screened by partnered clinics before any donation.
                    </p>
                    <div className="flex gap-4">
                      <DonorModal />
                      <SupportModal />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visual Diagnosis */}
          <TabsContent value="diagnosis" className="space-y-6">
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Visual Health Check
                </CardTitle>
                <CardDescription>
                  Upload an image for a quick visual assessment (demo only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Upload Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to select an image
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm">Upload from device</Button>
                      <Button variant="outline" size="sm">Use camera</Button>
                      <Button variant="outline" size="sm">Pick from Drive</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">Image uploaded successfully</p>
                      <Button onClick={runDiagnosisDemo}>Run quick check (demo)</Button>
                    </div>

                    {showDiagnosisResult && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Quick Assessment Result</h4>
                        <p className="text-blue-700 text-sm mb-3">
                          The image appears to show normal skin condition. No immediate concerns detected.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <p className="text-yellow-800 text-xs font-medium">
                            ⚠️ This is not a medical diagnosis. Please consult your pediatrician for any health concerns.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reminders & Records */}
          <TabsContent value="reminders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reminders */}
              <Card className="bubble">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Upcoming Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reminders.map(reminder => (
                      <div key={reminder.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                        <Checkbox 
                          checked={reminder.done}
                          onCheckedChange={() => toggleReminder(reminder.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{reminder.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {reminder.date} at {reminder.time} • {reminder.child}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Health Records */}
              <Card className="bubble">
                <CardHeader>
                  <CardTitle>Health Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-medium">Pediatric Visit</p>
                      <p className="text-sm text-muted-foreground">Jan 10, 2024 • Growth check</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-medium">Vaccination Record</p>
                      <p className="text-sm text-muted-foreground">Jan 5, 2024 • DPT-2</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload Record
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Nutrition Tracker */}
          <TabsContent value="nutrition" className="space-y-6">
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Daily Nutrition Log
                </CardTitle>
                <CardDescription>
                  Baby Age: {babyAge} months
                  <Input 
                    type="number" 
                    className="w-20 inline-block ml-2" 
                    value={babyAge} 
                    onChange={(e) => setBabyAge(Number(e.target.value))}
                    min={0}
                    max={24}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{nutritionSummary.totalFeedings}</p>
                    <p className="text-sm text-muted-foreground">Feeds today</p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{nutritionSummary.totalFormulaMl}ml</p>
                    <p className="text-sm text-muted-foreground">Formula intake</p>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{nutritionSummary.wetDiapers}</p>
                    <p className="text-sm text-muted-foreground">Wet diapers</p>
                  </div>
                  <div className="bg-amber-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{nutritionSummary.stoolCount}</p>
                    <p className="text-sm text-muted-foreground">Stool count</p>
                  </div>
                </div>

                {/* Alerts */}
                {nutritionSummary.alerts.length > 0 && (
                  <div className="mb-6 space-y-2">
                    {nutritionSummary.alerts.map((alert, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-lg flex items-start gap-2 ${
                          alert.type === 'danger' ? 'bg-red-50 text-red-800' :
                          alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                          'bg-blue-50 text-blue-800'
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{alert.message}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Free-Text Input */}
                <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                  <Label className="mb-2 block font-medium">Quick Log (free text)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Example: "90ml formula, 6 wet diapers, 2 poops, breastfed 15 min"
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your log..."
                      value={freeTextInput}
                      onChange={(e) => setFreeTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleFreeTextLog()}
                    />
                    <Button onClick={handleFreeTextLog}>Add</Button>
                  </div>
                </div>

                {/* Structured Entry */}
                <div className="mb-6 p-4 border border-border rounded-lg">
                  <Label className="mb-3 block font-medium">Structured Entry</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {(['breast', 'formula', 'solid', 'water'] as FeedType[]).map(type => (
                      <Button
                        key={type}
                        variant={structuredFeedType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setStructuredFeedType(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {structuredFeedType === 'breast' ? (
                      <div>
                        <Label className="text-xs">Duration (min)</Label>
                        <Input 
                          type="number" 
                          placeholder="15"
                          value={structuredDuration}
                          onChange={(e) => setStructuredDuration(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        <Label className="text-xs">Quantity (ml/g)</Label>
                        <Input 
                          type="number" 
                          placeholder="90"
                          value={structuredQuantity}
                          onChange={(e) => setStructuredQuantity(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="flex items-end">
                      <Button onClick={handleStructuredEntry} className="w-full">
                        <Plus className="h-4 w-4 mr-1" /> Log Feed
                      </Button>
                    </div>
                  </div>
                  
                  {/* Diaper Quick Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" onClick={() => handleAddDiaper(true, false)}>
                      <Droplets className="h-4 w-4 mr-1" /> Wet Diaper
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAddDiaper(false, true)}>
                      <Baby className="h-4 w-4 mr-1" /> Stool
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAddDiaper(true, true)}>
                      Both
                    </Button>
                  </div>
                </div>

                {/* Today's Log */}
                <div className="space-y-3">
                  <h4 className="font-medium">Today's Entries</h4>
                  {todayLog.feedings.length === 0 && todayLog.diapers.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No entries yet. Start logging above!</p>
                  ) : (
                    <>
                      {todayLog.feedings.map((f, idx) => (
                        <div key={f.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium capitalize">{f.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {f.duration ? `${f.duration} min` : f.quantity ? `${f.quantity}ml` : ''} • {f.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Nutrition Tips */}
                {nutritionTips.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <h4 className="font-medium mb-3">Tips for {babyAge} month old</h4>
                    <div className="space-y-2">
                      {nutritionTips.slice(0, 2).map((tip, idx) => (
                        <div key={idx} className="p-3 bg-green-50 rounded-lg text-sm text-green-800">
                          💡 {tip.tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Growth Tracker */}
          <TabsContent value="growth" className="space-y-6">
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" placeholder="Enter height" />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input id="weight" placeholder="Enter weight" />
                  </div>
                  <div>
                    <Label htmlFor="head">Head Circumference (cm)</Label>
                    <Input id="head" placeholder="Optional" />
                  </div>
                </div>

                <Button className="w-full mb-6">Add Growth Entry</Button>

                <div className="bg-muted rounded-lg p-8 text-center">
                  <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Growth chart will appear here</p>
                  <p className="text-sm text-muted-foreground mt-2">Percentile tracking coming soon</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Open Child Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
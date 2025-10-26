import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, AlertTriangle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';

const helpTopics = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to use HeyBabyy for the first time',
    faqs: [
      {
        question: 'How do I create my baby profile?',
        answer: 'After registering, go to Settings > Baby Profile to add your little one\'s details including name, birth date, and basic information.'
      },
      {
        question: 'What services are available?',
        answer: 'We offer nearby healthcare provider searches, visual health checks, growth tracking, nutrition logging, and much more.'
      },
      {
        question: 'Is the app free to use?',
        answer: 'Basic features are free. Premium features require a subscription for advanced tracking and personalized insights.'
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Settings',
    description: 'Manage your account, privacy, and preferences',
    faqs: [
      {
        question: 'How do I change my password?',
        answer: 'Go to Settings > Account Security to update your password. You\'ll need to verify your current password first.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account from Settings > Account > Delete Account. This action is permanent and cannot be undone.'
      },
      {
        question: 'How do I change the app language?',
        answer: 'Use the language selector in the top navigation bar to switch between English and Hindi instantly.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Data & Privacy',
    description: 'Understand how we protect and use your data',
    faqs: [
      {
        question: 'What data do you collect?',
        answer: 'We collect baby health data, feeding schedules, growth metrics, and location data (with permission) to provide personalized recommendations.'
      },
      {
        question: 'Is my data secure?',
        answer: 'Yes, all data is encrypted and stored securely. We follow strict privacy guidelines and never share personal information with third parties.'
      },
      {
        question: 'Can I export my data?',
        answer: 'Yes, you can request a complete export of your data from Settings > Privacy > Export Data.'
      }
    ]
  }
];

export const Support: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string>('');

  const focusChatInput = () => {
    // Focus the main chat input (demo functionality)
    alert('Chat with Tiny feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar activeSection="support" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Support Center</h1>
          <p className="text-muted-foreground text-lg">
            Get help with HeyBabyy features, account management, and baby care questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Help Topics */}
            <Card className="bubble" id="mental-health">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help Topics
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about using HeyBabyy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion}>
                  {helpTopics.map(topic => (
                    <AccordionItem key={topic.id} value={topic.id}>
                      <AccordionTrigger className="text-left">
                        <div>
                          <h3 className="font-semibold">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground">{topic.description}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          {topic.faqs.map((faq, index) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-4">
                              <h4 className="font-medium mb-2">{faq.question}</h4>
                              <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact form removed per request: only phone and email as contact methods */}

            {/* Parental Mental Health & Motivation */}
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Parental Mental Health & Motivation
                </CardTitle>
                <CardDescription>
                  Practical tips for both parents to manage responsibilities, bond better, and stay mentally healthy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5" />
                  <p>
                    This guidance is educational and supportive. It does not replace professional medical advice. If you or your partner feel overwhelmed, please reach out to a qualified professional.
                  </p>
                </div>

                <Tabs defaultValue="mother">
                  <TabsList className="mb-4">
                    <TabsTrigger value="mother">For Mother</TabsTrigger>
                    <TabsTrigger value="father">For Father</TabsTrigger>
                  </TabsList>

                  <TabsContent value="mother" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Understanding Body & Mind Changes</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Hormonal shifts can affect mood, sleep and appetite — it’s normal to feel different.</li>
                        <li>Accept gradual body recovery; celebrate strength over appearance.</li>
                        <li>Set gentle routines: hydration, short walks, sunlight, and mindful breathing.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Post‑pregnancy Depression & Anxiety</h3>
                      <p className="text-sm text-muted-foreground">Watch for symptoms lasting 2+ weeks:</p>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Persistent sadness, guilt, or emptiness</li>
                        <li>Irritability, panic, racing thoughts, or feeling detached</li>
                        <li>Changes in sleep/appetite beyond typical newborn care</li>
                      </ul>
                      <div className="text-sm p-3 rounded-md bg-blue-50 border border-blue-200">
                        If symptoms are intense or worsening, please contact a mental health professional. You are not alone.
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Self‑care Micro‑wins</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Ask for help; accept support without guilt.</li>
                        <li>10‑minute rest windows while baby naps.</li>
                        <li>Journaling one gratitude and one small win daily.</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="father" className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Supporting Your Partner</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Listen first; validate feelings (“I hear you — it’s tough, and we’ll handle it together”).</li>
                        <li>Share responsibilities: diapers, burping, night shifts, and meal prep.</li>
                        <li>Protect rest time by handling visitors and chores.</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Managing New Responsibilities</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        <li>Create a simple weekly plan for chores, grocery, and appointments.</li>
                        <li>Schedule short bonding rituals: skin‑to‑skin time, lullaby, or evening walk.</li>
                        <li>Check your own stress — short workouts and deep breathing help.</li>
                      </ul>
                    </div>
                    <div className="text-sm p-3 rounded-md bg-green-50 border border-green-200">
                      A calm, present father helps the whole home settle. Small consistent actions matter more than perfection.
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* SOS & Emergency */}
            <Card className="bubble border-red-200" id="sos">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" /> SOS & Emergency
                </CardTitle>
                <CardDescription>
                  Immediate help for urgent situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <a href="tel:108">Call Emergency (108)</a>
                </Button>
                <Button asChild variant="destructive" className="w-full">
                  <a href="tel:112">Police / National Helpline (112)</a>
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>Maternal mental health helpline:</p>
                  <a className="text-primary underline" href="tel:9152987821">NIMHANS 9152987821</a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">24/7</Badge>
                  <Badge variant="outline">Confidential</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Chat with Tiny */}
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="text-lg">Need Instant Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with Tiny, our AI assistant, for immediate baby care guidance and app support.
                </p>
                <Button onClick={focusChatInput} className="w-full bg-gradient-primary hover:opacity-90">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Tiny
                </Button>
              </CardContent>
            </Card>

            {/* Quick Contact (minimal) */}
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="text-lg">Quick Contact</CardTitle>
                <CardDescription>Under AANXIEE AI Solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">aanya1310mittal@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Phone className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+91-7878502480</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="text-lg">Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">12:00 PM - 4:00 PM</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-muted-foreground">
                      <strong>Emergency support</strong> available 24/7 for critical baby health concerns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
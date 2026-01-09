import React from 'react';
import { Heart, Users, Shield, Globe, Mail, Phone, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';

const founders = [
  {
    name: 'Aanya Mittal | Divyam Kataria |Pavan Simhadri',
    role: 'Initiative Lead',
    bio: 'Turning this into a product soon.',
    image: '/placeholder.svg'
  }
];

// Medical Advisory section removed as per request

const stats = [
  { number: '50,000+', label: 'Families Served' },
  { number: '100+', label: 'Healthcare Partners' },
  { number: '15+', label: 'Languages Supported' },
  { number: '24/7', label: 'Support Available' }
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar activeSection="about" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">About HeyBabyy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated to supporting families through the most important first 1000 days of a baby's life
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Initiative by <span className="font-semibold text-foreground">Aanya Mittal</span>
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary">Initiative for new parents </Badge>
            <Badge variant="outline">Team heybabyy</Badge>
            <Badge>Turning into a product soon</Badge>
          </div>
        </div>

        {/* Mission Section */}
        <Card className="bubble mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              At HeyBabyy, we believe every baby deserves the best possible start in life. Our mission is to empower 
              parents with expert guidance, innovative tools, and a supportive community during the critical first 1000 days. 
              We combine cutting-edge technology with evidence-based medical knowledge to make quality baby care accessible 
              to every family, regardless of location or background.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Founders Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Initiative Lead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="bubble text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl">{founder.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {founder.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{founder.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Medical Advisory section removed */}

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bubble">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Compassionate Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We understand that every baby is unique and every parent's journey is different. 
                Our approach is built on empathy, understanding, and personalized support.
              </p>
            </CardContent>
          </Card>

          <Card className="bubble">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Evidence-Based
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All our recommendations are based on the latest medical research and WHO guidelines, 
                ensuring you receive accurate and reliable information.
              </p>
            </CardContent>
          </Card>

          <Card className="bubble">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Culturally Inclusive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We respect diverse cultural practices and family traditions while promoting 
                safe, healthy baby care practices across all communities.
              </p>
            </CardContent>
          </Card>

          <Card className="bubble">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Community Driven
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Building a supportive community where parents can share experiences, 
                learn from each other, and never feel alone in their journey.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bubble">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Under AANXIEE AI Solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>aanya1310mittal@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91-7878502480</span>
              </div>
              {/* Address intentionally removed for now as requested */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

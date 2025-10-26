import React, { useState } from 'react';
import { BookOpen, Play, Music, Search, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';

const articles = [
  {
    id: 1,
    title: 'First 100 Days: Essential Baby Care Tips',
    excerpt: 'Everything new parents need to know about caring for their newborn',
    readTime: '5 min read',
    date: 'Jan 15, 2024',
    category: 'Newborn Care',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Understanding Baby Sleep Patterns',
    excerpt: 'How to establish healthy sleep routines for better rest',
    readTime: '7 min read',
    date: 'Jan 12, 2024',
    category: 'Sleep',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Breastfeeding: A Complete Guide',
    excerpt: 'Tips, techniques, and solutions for successful breastfeeding',
    readTime: '12 min read',
    date: 'Jan 10, 2024',
    category: 'Feeding',
    image: '/placeholder.svg'
  }
];

const news = [
  {
    id: 1,
    title: 'New Vaccination Guidelines Released',
    excerpt: 'WHO updates recommendations for infant immunization',
    date: 'Jan 18, 2024',
    source: 'WHO Health News'
  },
  {
    id: 2,
    title: 'Study: Benefits of Skin-to-Skin Contact',
    excerpt: 'Research confirms importance of early bonding',
    date: 'Jan 16, 2024',
    source: 'Pediatric Journal'
  }
];

const videos = [
  {
    id: 1,
    title: 'Baby Massage Techniques',
    duration: '8:45',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Introducing Solid Foods',
    duration: '12:30',
    thumbnail: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Tummy Time Exercises',
    duration: '6:15',
    thumbnail: '/placeholder.svg'
  }
];

const lullabies = [
  { id: 1, title: 'Twinkle Twinkle Little Star', duration: '3:24' },
  { id: 2, title: 'Rock-a-Bye Baby', duration: '2:58' },
  { id: 3, title: 'Brahms Lullaby', duration: '4:12' },
  { id: 4, title: 'Hush Little Baby', duration: '3:36' },
  { id: 5, title: 'Golden Slumbers', duration: '3:45' },
  { id: 6, title: 'Sleep Baby Sleep', duration: '4:02' }
];

const ageFilters = ['All Ages', '0-6m', '6-12m', '12-24m'];

export const Insights: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAge, setSelectedAge] = useState('All Ages');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const playLullaby = (id: number) => {
    setCurrentlyPlaying(currentlyPlaying === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar activeSection="insights" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Baby Care Insights</h1>
          <p className="text-muted-foreground text-lg">
            Expert advice, latest research, and helpful resources for new parents
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 mb-8 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by age" />
                </SelectTrigger>
                <SelectContent>
                  {ageFilters.map(age => (
                    <SelectItem key={age} value={age}>{age}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="lullabies">Lullabies</TabsTrigger>
          </TabsList>

          {/* Articles */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <Card key={article.id} className="bubble hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* News */}
          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map(item => (
                <Card key={item.id} className="bubble hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.excerpt}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <p>{item.source}</p>
                        <p>{item.date}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Read Full Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <Card key={video.id} className="bubble hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 relative flex items-center justify-center cursor-pointer group">
                      <Play className="h-12 w-12 text-white bg-black/50 rounded-full p-3 group-hover:bg-black/70 transition-colors" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button size="sm" variant="outline" className="w-full">
                      <Play className="h-4 w-4 mr-1" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lullabies */}
          <TabsContent value="lullabies" className="space-y-6">
            <Card className="bubble">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  Soothing Lullabies
                </CardTitle>
                <CardDescription>
                  Gentle melodies to help your baby fall asleep peacefully
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lullabies.map(lullaby => (
                    <div
                      key={lullaby.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant={currentlyPlaying === lullaby.id ? "default" : "outline"}
                          onClick={() => playLullaby(lullaby.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <div>
                          <p className="font-medium">{lullaby.title}</p>
                          <p className="text-sm text-muted-foreground">{lullaby.duration}</p>
                        </div>
                      </div>
                      {currentlyPlaying === lullaby.id && (
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
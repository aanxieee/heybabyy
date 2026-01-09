import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { analyzeGrowth } from '@/lib/growthStandards';
import { ArrowUpRight, Scale } from 'lucide-react';

// Demo Initial Data
const INITIAL_DATA = [
  { month: 0, weight: 3.2 },
  { month: 2, weight: 5.1 },
  { month: 4, weight: 6.8 },
];

const GrowthTracker = () => {
  const [logs, setLogs] = useState(INITIAL_DATA);
  const [inputWeight, setInputWeight] = useState('');
  const [inputAge, setInputAge] = useState('');
  
  // Get latest analysis
  const latestLog = logs[logs.length - 1];
  const analysis = analyzeGrowth('boy', latestLog.month, latestLog.weight);

  const handleAddLog = () => {
    if (!inputWeight || !inputAge) return;
    const newLog = { month: Number(inputAge), weight: Number(inputWeight) };
    // Sort logs by month so chart looks right
    const newLogs = [...logs, newLog].sort((a, b) => a.month - b.month);
    setLogs(newLogs);
    setInputWeight('');
    setInputAge('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Growth Tracker</h1>
          <p className="text-gray-500">Monitor your baby's weight against WHO standards.</p>
        </div>

        {/* 1. KEY SIGNAL (The "MVP" Value) */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Status: {analysis.status}</h3>
              <p className={`text-sm font-medium ${analysis.color} mt-1`}>
                {analysis.message}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Based on WHO Child Growth Standards for boys.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 2. THE INPUT FORM */}
          <Card className="md:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Add Measurement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Age (Months)</Label>
                <Input 
                  type="number" 
                  placeholder="e.g. 5" 
                  value={inputAge}
                  onChange={(e) => setInputAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input 
                  type="number" 
                  placeholder="e.g. 7.2" 
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                />
              </div>
              <Button onClick={handleAddLog} className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowUpRight className="mr-2 h-4 w-4" /> Update
              </Button>
            </CardContent>
          </Card>

          {/* 3. THE CHART */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Growth Curve</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={logs} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    label={{ value: 'Age (Months)', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  {/* The Baby's Line */}
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;
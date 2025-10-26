import { Navbar } from "@/components/Navbar";
import QuickAccessSidebar from "@/components/QuickAccessSidebar";
import TinyBot from "@/components/TinyBot";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navbar />
        
        <div className="flex">
          <QuickAccessSidebar />
          
          <main className="flex-1 p-6 ml-64">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero Section */}
              <section className="text-center py-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="text-6xl">👶</div>
                  <h1 className="text-4xl font-bold text-primary ml-4">
                    Welcome to HeyBabyy
                  </h1>
                  <div className="text-6xl ml-4">🍼</div>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your trusted companion for the first 1000 days of your baby's journey. 
                  Get expert guidance, track growth, find quality products, and connect with healthcare professionals.
                </p>
              </section>

              {/* TinyBot Assistant */}
              <TinyBot />

              {/* Quick Access Content Sections */}
              <div className="space-y-12">
                <section id="faqs" className="scroll-mt-20">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">When should I start feeding my baby solids?</h3>
                          <p className="text-muted-foreground">Most babies are ready for solids around 6 months, when they can sit up and show interest in food.</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">How often should my newborn feed?</h3>
                          <p className="text-muted-foreground">Newborns typically feed 8-12 times per day, or every 2-3 hours.</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">When should I be concerned about crying?</h3>
                          <p className="text-muted-foreground">Contact your pediatrician if crying is inconsolable for hours, accompanied by fever, or seems unusual.</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">How much sleep does my baby need?</h3>
                          <p className="text-muted-foreground">Newborns sleep 14-17 hours daily, gradually reducing to 12-15 hours by 6 months.</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </section>

                <section id="tips" className="scroll-mt-20">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Essential Baby Care Tips</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl mb-3">🤱</div>
                        <h3 className="font-semibold mb-2">Feeding</h3>
                        <p className="text-sm text-muted-foreground">Follow baby's hunger cues and maintain a consistent routine</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">😴</div>
                        <h3 className="font-semibold mb-2">Sleep</h3>
                        <p className="text-sm text-muted-foreground">Create a calm environment and establish bedtime routines</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-3">🛁</div>
                        <h3 className="font-semibold mb-2">Hygiene</h3>
                        <p className="text-sm text-muted-foreground">Keep diaper area clean and dry, bath 2-3 times weekly</p>
                      </div>
                    </div>
                  </Card>
                </section>

                <section id="myths" className="scroll-mt-20">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Myth Breaker</h2>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">❌</div>
                        <div>
                          <h3 className="font-semibold mb-2">Myth: Crying babies are always hungry</h3>
                          <p className="text-muted-foreground">Babies cry for many reasons: tiredness, discomfort, need for attention, or overstimulation.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">❌</div>
                        <div>
                          <h3 className="font-semibold mb-2">Myth: You'll spoil a baby by holding them too much</h3>
                          <p className="text-muted-foreground">Physical contact and comfort are essential for healthy development and bonding.</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </section>

                <section id="food" className="scroll-mt-20">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Food Guide</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold mb-4 text-lg">First Foods (6+ months)</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Iron-fortified cereals</li>
                          <li>• Pureed fruits and vegetables</li>
                          <li>• Soft, mashed foods</li>
                          <li>• Single-ingredient foods first</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4 text-lg">Foods to Avoid</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Honey (under 12 months)</li>
                          <li>• Choking hazards (nuts, whole grapes)</li>
                          <li>• Added salt and sugar</li>
                          <li>• Unpasteurized products</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </section>

                <section id="hygiene" className="scroll-mt-20">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">Hygiene Tips</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Daily Care</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Clean face, neck, hands daily</li>
                          <li>• Change diapers promptly</li>
                          <li>• Keep umbilical cord dry</li>
                          <li>• Trim nails carefully</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Bathing</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Use warm (not hot) water</li>
                          <li>• Mild, baby-specific products</li>
                          <li>• Support head and neck always</li>
                          <li>• Keep room warm</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </section>

                <section id="who" className="scroll-mt-20">
                  <Card className="p-8">
                    <h2 className="text-2xl font-bold text-primary mb-6">WHO Guidelines</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Breastfeeding Recommendations</h3>
                        <p className="text-muted-foreground mb-2">
                          WHO recommends exclusive breastfeeding for the first 6 months, 
                          followed by continued breastfeeding with appropriate complementary foods up to 2 years.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Vaccination Schedule</h3>
                        <p className="text-muted-foreground">
                          Follow your country's immunization schedule. Most vaccines start at 6-8 weeks of age.
                          Consult your healthcare provider for the complete schedule.
                        </p>
                      </div>
                    </div>
                  </Card>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
};

export default Index;
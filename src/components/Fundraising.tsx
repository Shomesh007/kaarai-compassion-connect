import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";

const campaigns = [
  {
    title: "Emergency Food Relief",
    description: "Providing meals to 500 families affected by recent floods",
    raised: 125000,
    goal: 200000,
    supporters: 89,
  },
  {
    title: "Education Scholarships 2025",
    description: "Supporting 50 underprivileged students with books and fees",
    raised: 75000,
    goal: 150000,
    supporters: 45,
  },
  {
    title: "Community Health Camp",
    description: "Free medical check-ups and medicines for rural areas",
    raised: 40000,
    goal: 80000,
    supporters: 32,
  },
];

const Fundraising = () => {
  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Support: ${title}`,
        text: `Help us make a difference! Support our campaign: ${title}`,
        url: window.location.href,
      });
    }
  };

  return (
    <section id="fundraising" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-4 text-foreground">
          Active Campaigns
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Support our ongoing initiatives and help us reach those in need
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => {
            const progress = (campaign.raised / campaign.goal) * 100;
            
            return (
              <Card
                key={index}
                className="p-6 bg-[var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-border"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold font-['Poppins'] text-foreground">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {campaign.description}
                  </p>
                  
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-semibold">
                        ₹{campaign.raised.toLocaleString('en-IN')}
                      </span>
                      <span className="text-muted-foreground">
                        of ₹{campaign.goal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {campaign.supporters} supporters
                    </p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="donate" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.location.href = 'mailto:kaaraikarangal@gmail.com?subject=Campaign Support: ' + campaign.title}
                    >
                      Contribute
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(campaign.title)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Fundraising;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCampaigns, useSiteSettings } from "@/hooks/use-cms";

const Fundraising = () => {
  const { data: campaigns } = useCampaigns();
  const { data: settings } = useSiteSettings();

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
          {(campaigns ?? []).map((campaign) => {
            const progress = campaign.goal > 0 ? (campaign.raised / campaign.goal) * 100 : 0;
            
            return (
              <Card
                key={campaign.id}
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
                        ₹{Number(campaign.raised).toLocaleString('en-IN')}
                      </span>
                      <span className="text-muted-foreground">
                        of ₹{Number(campaign.goal).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {campaign.supporters} supporters
                    </p>
                  </div>
                  
                  <div className="flex pt-2">
                    <Button
                      variant="donate"
                      size="sm"
                      className="w-full"
                      onClick={() => window.open(`tel:${settings?.phone_tel ?? '+918220573306'}`)}
                    >
                      Call to Donate
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

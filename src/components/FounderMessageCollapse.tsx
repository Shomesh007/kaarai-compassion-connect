import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const messageParagraphs = [
  <p key="greet"><span className="font-bold text-primary">Vanakkam and warm greetings to all!</span></p>,
  <p key="dream">The story of Kaarai Karangal Social Service Organization began with a heartfelt dream — a dream to build a community where kindness flows freely and every helping hand becomes a source of hope. From humble beginnings, we have grown into a family bound by compassion, selflessness, and an unwavering commitment to serve humanity.</p>,
  <p key="inspiration">The inspiration behind Karai Karangal came from witnessing the silent struggles of people around us — those who needed help, comfort, and a sense of belonging. I realized that change begins not with wealth or power, but with a single thought: <span className="italic text-primary">“How can I make someone’s life better today?”</span> That thought became our mission.</p>,
  <p key="work">Over the years, we have worked passionately in areas such as blood donation, healthcare support, education assistance, environmental awareness, and community welfare. Each initiative reflects our belief that <span className="font-semibold text-primary">“service to others is the purest form of love.”</span> We are not just an organization — we are a movement of hearts determined to make the world a kinder place.</p>,
  <p key="reminder">Every drop of blood donated, every meal shared, and every smile restored reminds us why we started this journey. It’s not about recognition or rewards; it’s about humanity — about standing together when someone needs us the most.</p>,
  <p key="gratitude">As the founder, I feel deeply humbled and grateful for all our volunteers, supporters, and well-wishers who continue to strengthen this mission. You are the true pillars of Kaarai Karangal. Together, we can continue to light lives, spread hope, and prove that compassion still reigns in this world.</p>,
  <p key="spirit" className="font-semibold text-primary text-center pt-2">Let us join hands to keep this spirit alive — because when hearts unite in service, miracles happen.</p>,
];

export default function FounderMessageCollapse() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded ? (
        <div className="space-y-4">
          {messageParagraphs}
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-all"
            onClick={() => setExpanded(false)}
          >
            Show Less <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          {messageParagraphs.slice(0, 2)}
          <div className="flex justify-center mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-all"
              onClick={() => setExpanded(true)}
            >
              Read More <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
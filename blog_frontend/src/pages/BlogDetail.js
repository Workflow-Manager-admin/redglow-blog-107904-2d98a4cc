import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * BlogDetail page: displays a single blog post in detail.
 * Features:
 * - Title and featured image side-by-side (responsive)
 * - Subtitle/summary below title
 * - Author name and published date
 * - Blog content in article
 * - Comments section (list of name + comment)
 * - Social media sharing icons (visual only, no functionality)
 */

const BLOG_DATA = {
  1: {
    title: 'The Future of Artificial Intelligence: Trends to Watch',
    featuredImg: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80',
    summary: 'A deep dive into the most exciting AI advancements shaping industries and our daily lives, from automation to ethical considerations.',
    author: 'Alice',
    date: '2024-06-10',
    content: `In the rapidly evolving world of technology, few fields have captured the imagination of innovators, businesses, and consumers quite like Artificial Intelligence (AI). From self-driving cars to AI-generated art, it seems every week there’s a new breakthrough. But what’s next for AI? In this article, we’ll explore some of the most exciting trends and innovations that are shaping the future of AI, the industries they’re transforming, and the ethical questions they bring to the table.

1. AI in Healthcare: Revolutionizing Diagnostics and Treatment
One of the most promising applications of AI is in healthcare. Machine learning algorithms are already being used to diagnose diseases, predict patient outcomes, and even suggest personalized treatment plans. AI models trained on vast datasets of medical images are making strides in detecting conditions like cancer, diabetes, and heart disease with unprecedented accuracy.

In addition to diagnostic tools, AI-driven drug discovery is speeding up the process of identifying potential treatments, allowing scientists to test new compounds more efficiently and affordably.

What's Next?
We’re on the verge of AI systems that can not only assist in diagnosis but could eventually take over much of the clinical decision-making process. The dream of personalized, AI-guided healthcare is getting closer every day.

2. The Rise of Autonomous Vehicles
Self-driving cars have been a long-standing ambition for the tech industry. Major companies, including Tesla, Waymo, and Apple, are investing heavily in autonomous vehicle technology. Using machine learning, computer vision, and sensor fusion, these vehicles can navigate roads, make real-time decisions, and respond to changes in traffic or road conditions.

While the technology has made significant strides, the road to fully autonomous vehicles remains challenging due to regulatory, technical, and ethical hurdles. However, we’re already seeing semi-autonomous systems, such as Tesla's Autopilot and GM's Super Cruise, becoming mainstream.

What's Next?
In the near future, we may see AI driving technology integrated not only into personal vehicles but also public transportation, drones, and delivery services, further optimizing logistics and transportation systems worldwide.

3. AI in Creative Industries: The Rise of AI-Generated Content
AI has begun to make a significant impact on the creative world, especially in fields like music, art, and writing. Tools like OpenAI’s GPT-3 and DALL·E have demonstrated the potential of AI to generate human-like content, whether it’s writing articles, composing music, or creating stunning visual art.

While these technologies have sparked excitement, they’ve also raised important questions about originality, copyright, and the future of human creativity. Can an AI truly be creative, or is it simply mimicking patterns it’s been taught?

What's Next?
AI will continue to evolve in creative fields, perhaps leading to new forms of collaboration between humans and machines. Artists may increasingly use AI as a tool to enhance their work, generating new ideas, or even creating new genres and mediums of expression.

4. AI and Ethics: Balancing Innovation with Responsibility
As AI continues to become more integrated into our lives, ethical concerns have come to the forefront. The use of AI in decision-making processes—such as hiring, criminal justice, and loan approvals—raises questions about bias, fairness, and accountability. AI systems are only as good as the data they’re trained on, and biased data can result in biased outcomes.

Moreover, the increasing use of AI for surveillance, personal data collection, and facial recognition raises privacy concerns. Striking a balance between innovation and ethics will be crucial as AI becomes more pervasive in society.

What's Next?
We are likely to see more regulation and oversight surrounding AI in the coming years. Governments, organizations, and ethics boards will play an essential role in ensuring AI technologies are used in a responsible and fair manner, helping to mitigate risks and protect individual rights.

5. AI-Powered Automation: Transforming Industries and Jobs
AI’s role in automation is already reshaping industries like manufacturing, retail, and customer service. Robots powered by AI are handling repetitive tasks such as inventory management, order processing, and even customer interactions through chatbots. This automation is improving efficiency and reducing costs for companies, but it also raises concerns about the future of work.

While AI is expected to displace certain jobs, it will also create new roles that require human oversight, creativity, and problem-solving. The key will be in reskilling the workforce to adapt to these new demands.

What's Next?
In the coming decade, we’ll likely see a broader integration of AI across all sectors, from agriculture to entertainment, transforming both the job market and the way companies operate.

6. Quantum Computing and AI: A Game-Changer in Data Processing
Quantum computing, while still in its infancy, has the potential to revolutionize AI by enabling data processing at speeds unimaginable with classical computers. By harnessing the power of quantum bits (qubits), quantum computers could vastly accelerate machine learning algorithms, allowing for breakthroughs in fields like drug discovery, cryptography, and material science.

The combination of AI and quantum computing could solve problems that are currently out of reach, such as predicting weather patterns with greater accuracy or developing entirely new materials for technology.

What's Next?
We’re still several years away from practical, large-scale quantum computing, but its potential to transform AI research and applications is immense. In the long term, quantum AI could push the boundaries of what’s possible in fields ranging from medicine to environmental science.

7. AI in Cybersecurity: Protecting Against Evolving Threats
As cyber threats become more sophisticated, so too must our defense mechanisms. AI is increasingly being used in cybersecurity to detect patterns and anomalies in data that might indicate a cyber attack. By automating the identification of threats, AI can respond faster than human operators, preventing breaches before they happen.

Additionally, AI-driven systems can help in encryption and protecting user data by identifying vulnerabilities in real-time.

What's Next?
The role of AI in cybersecurity will continue to grow, with AI-powered systems becoming an essential part of global efforts to combat cybercrime. As cyber threats evolve, so too will the AI technologies that defend against them.

Conclusion: The Limitless Potential of AI
As we look ahead, the future of AI is incredibly exciting, with new applications emerging almost daily. From healthcare to transportation, creativity to cybersecurity, AI’s potential to improve our lives is enormous. However, it’s important to remember that with great power comes great responsibility. As AI continues to develop, we must ensure that it’s used ethically and responsibly, balancing innovation with the protection of individual rights and societal values.

The next few years will likely be some of the most transformative in the history of technology, and AI will undoubtedly be at the center of it all. Keep an eye on these trends—you won’t want to miss what’s coming next!`,
    comments: [
      { name: 'Jane', text: 'Great insights! Love this post.' },
      { name: 'Bob', text: 'Very informative and well-written.' }
    ]
  },
  2: {
    title: 'Camping Under the Stars: How to Make the Most of a Night Under the Open Sky',
    featuredImg: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80',
    summary: 'Discover the magic of camping beneath the stars and how to enhance your outdoor experience with tips on stargazing, campfire rituals, and connecting with nature',
    author: 'Bob',
    date: '2024-06-11',
    content: `1. The Ultimate Escape: Why Camping Under the Night Sky is Unmatched
There’s something inherently magical about lying on your back, staring up at a sky filled with stars, away from the distractions of modern life. Camping under a clear, open sky offers not just a chance to escape, but an opportunity to reconnect with nature in a way that few other activities can match. Whether you're surrounded by mountains, forests, or lakes, the night sky becomes your companion, offering a profound sense of peace and perspective.

What's Next?
As more people seek ways to disconnect, stargazing has become a form of meditation. You don’t need a telescope to enjoy the wonders of the cosmos. A simple blanket and a clear night are all you need to immerse yourself in the celestial beauty.

2. Setting the Stage: Choosing the Perfect Camping Spot
The first step in any great camping experience is choosing the right spot—and that’s especially important for stargazing. The more remote, the better. City lights and artificial pollution can obscure the night sky, making it hard to catch a glimpse of distant stars or constellations. To truly enjoy the night sky, try to find a campsite that’s far away from light sources.

Consider campsites at higher altitudes for an unobstructed view or areas near lakes for the added beauty of reflecting constellations. National parks and dark sky reserves are some of the best places to go for an authentic stargazing experience.

Pro Tip:
If you're not sure about light pollution in your area, apps like "Light Pollution Map" can help you find locations with the clearest views of the night sky.

3. Stargazing Essentials: What to Bring for the Perfect Night
While you may not need much to enjoy the stars, there are a few items that will enhance your experience:

Comfortable Blanket or Sleeping Bag: You’ll want something to lie on while you stare up at the sky. A warm, insulated blanket or sleeping bag is ideal, especially if the temperatures drop at night.

Binoculars or Telescope: While a naked eye is perfect for casual stargazing, a pair of binoculars or a portable telescope will let you get a closer look at the planets, constellations, and even deep-sky objects like galaxies and nebulae.

Star Maps or Apps: Star charts, whether paper or digital, will help you identify what’s in the sky. Apps like "SkySafari" and "Stellarium" are excellent tools for beginners.

Red Flashlight: A regular flashlight will ruin your night vision, so opt for a red light, which helps preserve your eyes' ability to see in the dark.

What's Next?
Bring along a journal to track the constellations you spot, or sketch out the beauty of the night sky. You’d be amazed how much you can learn by just paying attention to the stars.

4. Campfire Under the Stars: Creating the Perfect Atmosphere
What’s a camping trip without a warm, crackling fire? While stargazing is amazing, nothing beats the combination of watching the stars twinkle above while you’re seated by a campfire, listening to the crackling wood and feeling the warmth on your face. A campfire can serve as a gathering point for sharing stories, roasting marshmallows, or enjoying a cup of hot cocoa or tea.

Campfire Rituals to Try:

S’mores Night: It’s a classic for a reason. Roast marshmallows over the fire and assemble them with chocolate and graham crackers for the ultimate campfire treat.

Nighttime Storytelling: Gather around the fire and tell stories, whether spooky ghost tales or fond memories. The firelight and the stars above make for a perfect backdrop.

Star Songs: Why not create a star-inspired playlist? Imagine listening to the calming sounds of acoustic music or nature-inspired tunes while watching shooting stars.

Pro Tip:
Be sure to follow fire safety guidelines. Extinguish the fire before heading to bed to prevent any risks, especially in dry areas.

5. Celestial Wonders: Key Stargazing Events to Watch for
While every night sky holds its own wonders, there are certain celestial events you don’t want to miss:

Meteor Showers: These are the highlight of any stargazing trip. The Perseid Meteor Shower, typically in August, and the Geminid Meteor Shower in December are two of the most spectacular. If you’re lucky, you might witness several meteors streak across the sky in a single hour.

Eclipses: Whether it's a solar or lunar eclipse, these events are rare and unforgettable. Plan your camping trip to coincide with one of these phenomena for a once-in-a-lifetime experience.

Planet Sightings: Certain planets, like Venus, Mars, and Jupiter, are visible to the naked eye throughout the year. Apps can help you track when they’re best visible in your area.

What's Next?
If you're keen on a truly unforgettable experience, consider timing your trip to coincide with one of these celestial events for a stargazing adventure you’ll never forget.

6. Night Sky Photography: Capturing the Magic
For photography enthusiasts, camping under the stars offers the perfect opportunity to capture the night sky. Long-exposure shots can reveal constellations, the Milky Way, and even the trails of shooting stars. All you need is a DSLR or a mirrorless camera with manual settings, a tripod, and patience.

Long Exposure: Set your camera to a long exposure setting (usually 15-30 seconds), and use a tripod to keep the shot steady.

Wide Aperture: Open the aperture (around f/2.8 or lower) to let in as much light as possible.

Remote Shutter Release: This eliminates camera shake when you press the shutter button.

Pro Tip:
The "golden hour" before sunrise is a magical time for capturing both the night sky and the early morning light.

7. The Quiet of Nature: The Peacefulness of a Starry Night
One of the most profound aspects of camping under the stars is the sheer tranquility it offers. The quiet, the cool night air, and the vastness of the sky put everything into perspective. Take a few moments to simply breathe, let go of stress, and listen to the sounds of nature around you—crickets chirping, wind rustling through the trees, or the occasional hoot of an owl.

In today’s world, it’s easy to feel overwhelmed by noise and distraction. Camping offers the perfect chance to embrace silence and reconnect with yourself, nature, and the universe.

What's Next?
Use this time for mindfulness, meditation, or simply sitting in awe of the vastness above you. The stars have a way of reminding us of the bigger picture.

Conclusion: A Night to Remember
Camping under the stars is more than just an outdoor activity—it’s an experience that connects you with nature, yourself, and the universe. Whether you’re a seasoned camper or a first-timer, the beauty of the night sky has the power to leave you in awe. So next time you’re planning a camping trip, make sure to embrace the night sky. Prepare, stargaze, and take in the serene, celestial wonders that only nature can offer.

`,
    comments: [
      { name: 'Alice', text: 'Love the clarity in this write-up.' },
      { name: 'Elizabeth', text: "Helped me understand the topic better, thanks!" }
    ]
  },
  3: {
    title: 'Mastering Personal Finance: Simple Steps to Secure Your Financial Future',
    featuredImg: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    summary: 'Learn the fundamentals of personal finance, from budgeting and saving to investing and retirement planning, and take control of your financial destiny.',
    author: 'Elizabeth',
    date: '2024-06-12',
    content: `1. The Importance of Financial Literacy: Understanding the Basics
When it comes to achieving financial security, knowledge is power. Yet, many people feel overwhelmed by the world of finance, with its complex jargon and intricate systems. The first step in mastering personal finance is understanding the basics.

At its core, personal finance is about managing your income, expenses, savings, and investments in a way that allows you to achieve your financial goals, whether that’s buying a home, starting a business, or retiring comfortably.

What's Next?
Start by learning key concepts like budgeting, credit, debt management, and the importance of an emergency fund. Once you grasp these fundamentals, you’ll be in a much better position to take control of your finances.

2. Creating a Budget: The Blueprint to Financial Success
A budget is more than just a list of your expenses; it’s a financial roadmap that helps you allocate your income effectively and avoid overspending. Without a budget, it’s easy to lose track of where your money is going, leading to unnecessary debt or missed savings opportunities.

Steps to Create a Budget:

Track Your Income: List all sources of income, including your salary, freelance work, or any passive income.

List Your Expenses: Categorize your spending into fixed (rent, utilities) and variable (groceries, entertainment).

Set Savings Goals: Determine how much you want to save each month for emergencies, retirement, or big purchases.

Adjust and Prioritize: If your expenses exceed your income, consider cutting back on non-essential items and reallocate funds to savings.

Pro Tip:
Use budgeting apps like Mint or YNAB (You Need A Budget) to help you stay organized and track your spending automatically.

3. Building an Emergency Fund: Your Financial Safety Net
Life is unpredictable, and unexpected expenses can arise at any time—whether it’s a medical emergency, car repair, or job loss. An emergency fund is your safety net that helps you navigate these challenges without resorting to credit cards or loans.

How Much Should You Save?
Financial experts generally recommend saving 3 to 6 months' worth of living expenses in your emergency fund. This ensures that you have enough to cover essential costs in case of a financial setback.

How to Build an Emergency Fund:

Set a savings goal based on your monthly expenses.

Open a separate savings account to keep the fund easily accessible.

Automate monthly contributions to your emergency fund to make saving easier.

What's Next?
If you haven’t already, prioritize building this fund before diving into other financial goals, like investing. It provides peace of mind and allows you to focus on long-term financial success.

4. Paying Off Debt: Tackling the Elephant in the Room
Debt is one of the biggest financial burdens many people face, and it can hold you back from achieving your goals. Whether it’s credit card debt, student loans, or personal loans, paying off debt should be a priority in your financial plan.

Debt Payoff Strategies:

The Snowball Method: Pay off your smallest debts first, then move on to larger ones. The psychological boost from clearing smaller debts can keep you motivated.

The Avalanche Method: Focus on paying off high-interest debt first (usually credit cards), saving you money in the long run.

Pro Tip:
Consider consolidating or refinancing your debt to lower your interest rates. Many lenders offer options for consolidating credit card debt into a single, lower-interest loan.

What's Next?
Once your debt is under control, you can start focusing more on saving and investing, leading to a brighter financial future.

5. Investing 101: Growing Your Wealth for the Future
Investing is one of the most powerful ways to grow your wealth over time. While saving money in a savings account is important, the returns are typically low and don’t keep up with inflation. Investing, however, allows your money to work for you by earning higher returns in stocks, bonds, or real estate.

Types of Investments:

Stocks: Purchasing shares in a company. Stocks offer the potential for high returns but also come with higher risk.

Bonds: Lending money to a corporation or government in exchange for periodic interest payments and the return of the principal at maturity.

ETFs (Exchange-Traded Funds) and Mutual Funds: Pools of funds from many investors used to buy a diversified set of assets, providing less risk than individual stocks.

How to Start Investing:

Understand Your Risk Tolerance: Determine how much risk you’re comfortable with—your age, financial goals, and investment timeline will all play a role.

Start Small: Begin with index funds or ETFs that track the broader market. They provide diversification and are less risky for beginners.

Automate Investments: Set up automatic contributions to an investment account each month. Consistency is key to building wealth over time.

Pro Tip:
Take advantage of tax-advantaged accounts like IRAs and 401(k)s. These accounts allow you to invest without paying taxes on your returns, making them powerful tools for building wealth.

6. Planning for Retirement: Secure Your Future Now
Retirement might feel like something far off, but the earlier you start planning, the better off you’ll be when it’s time to retire. Social Security may not provide enough income to maintain your lifestyle, so it’s essential to take charge of your own retirement planning.

Retirement Accounts to Consider:

401(k): Employer-sponsored retirement plan, often with matching contributions.

IRA (Individual Retirement Account): Tax-advantaged account where you can save for retirement outside of an employer plan.

Roth IRA: A special type of IRA where your investments grow tax-free, but contributions are made with after-tax dollars.

What's Next?
Start contributing to a retirement account as early as possible, even if it’s just a small amount. The power of compound interest means the sooner you start, the more you’ll benefit in the long run.

7. Protecting Your Finances: Insurance and Estate Planning
Planning for the unexpected is just as important as saving and investing. Having the right insurance can protect you from catastrophic financial events, and estate planning ensures that your wealth is passed on according to your wishes.

Types of Insurance to Consider:

Health Insurance: Vital for covering medical expenses and preventing large, unexpected bills.

Life Insurance: Ensures that your family is financially protected in case of your death.

Disability Insurance: Provides income if you become unable to work due to illness or injury.

Estate Planning:

Will: A legal document outlining how your assets should be distributed after your death.

Trusts: Legal arrangements to pass assets to heirs while minimizing taxes and probate costs.

What's Next?
Review your insurance coverage and consider speaking with a financial planner to create an estate plan. Protecting your assets will give you peace of mind, knowing that your family and finances are taken care of.

Conclusion: Taking Control of Your Financial Future
Mastering personal finance is a journey, not a destination. By learning the basics, budgeting effectively, saving for emergencies, paying off debt, and investing for the future, you can set yourself up for a lifetime of financial security and freedom.

Don’t wait for the “perfect time” to start—take small, actionable steps today. Your future self will thank you!

`,
    comments: [
      { name: 'Charlie', text: "Another fantastic post. Keep it up!" }
    ]
  }
};

function formatDate(dateStr) {
  // Helper to format ISO date string to readable format (e.g., June 10, 2024)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_DATA[id];

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem' }}>
        <h2>Post not found</h2>
        <Link to="/">← Back to Blog List</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 840,
        margin: '2rem auto',
        padding: '1.7rem 1.2rem 3.5rem 1.2rem',
        background: 'var(--bg-primary)',
        borderRadius: 18,
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 24px rgba(44, 44, 53, 0.07)'
      }}
    >
      {/* Title and Featured Image */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.1rem',
          alignItems: 'center',
          marginBottom: '1.35rem'
        }}
      >
        <div style={{ flex: 2 }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#e63946',
              margin: 0,
              lineHeight: 1.14,
              wordBreak: 'break-word'
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              fontSize: '1.18rem',
              margin: '0.55rem 0 0.45rem 0',
              color: 'var(--text-primary)',
              fontWeight: 500,
              opacity: 0.88,
              letterSpacing: '0.01em'
            }}
          >
            {post.summary}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '1.2rem',
            marginTop: 12,
            fontSize: '1.05rem',
            color: 'var(--text-secondary)'
          }}>
            <span style={{
              fontWeight: 600,
              color: '#61dafb',
              textAlign: 'right',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
            }}>
              By {post.author}
            </span>
            <span style={{
              opacity: 0.84,
              fontWeight: 500,
              fontSize: '0.98rem'
            }}>
              {formatDate(post.date)}
            </span>
          </div>
        </div>
        <div style={{
          flex: 1.2,
          minWidth: 142,
          maxWidth: 260,
          minHeight: 100,
          alignSelf: 'flex-start',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 2px 15px rgba(38, 38, 44, 0.08)',
          background: '#ececec'
        }}>
          <img
            src={post.featuredImg}
            alt="Featured"
            style={{
              width: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius: 14,
              aspectRatio: '4/3'
            }}
          />
        </div>
      </section>
      {/* End Title/Image */}

      {/* CONTENT */}
      <article style={{ color: 'var(--text-primary)', fontSize: '1.17rem', lineHeight: 1.75, marginBottom: '2.3rem', marginTop: '1.05rem' }}>
        {post.content.split('\n').map((para, i) =>
          <p key={i} style={{margin: '0 0 1.3em 0', whiteSpace: 'pre-line'}}>{para}</p>
        )}
      </article>

      {/* COMMENT Section */}
      <section style={{margin: '2.2rem 0 2.2rem 0'}}>
        <h3 style={{
          fontSize: '1.28rem',
          fontWeight: 700,
          marginBottom: 14,
          color: '#e63946',
        }}>
          Comments
        </h3>
        {post.comments.length === 0 && (
          <div style={{color: 'var(--text-secondary)', opacity: 0.75}}>No comments yet.</div>
        )}
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {post.comments.map((c, idx) => (
            <li key={idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '0.9rem 1.3rem'
            }}>
              <span style={{fontWeight: 700, color: '#e63946', marginRight: 12}}>
                {c.name}
              </span>
              <span style={{color: 'var(--text-primary)'}}>
                {c.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SOCIAL MEDIA SHARE ICONS */}
      <section style={{margin: '2.5rem 0 1.4rem 0', textAlign: 'center'}}>
        <span style={{
          display: 'block',
          fontWeight: 600,
          fontSize: '1.09rem',
          marginBottom: 10,
          color: 'var(--text-primary)'
        }}>Share this post:</span>
        <div style={{display: 'flex', justifyContent: 'center', gap: 20}}>
          {/* Social icons as images from public folder.
              To ensure compatibility in all React deployments (dev/prod), use process.env.PUBLIC_URL as prefix.
              - '/facebook.png' becomes `${process.env.PUBLIC_URL}/facebook.png`
          */}
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            aria-label="Share on Facebook"
            style={iconStyle}
          >
            <img
              src="https://your-domain.com/facebook.png"
              alt="Facebook"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Instagram"
            aria-label="Share on Instagram"
            style={iconStyle}
          >
            <img
              src="https://your-domain.com/instagram.png"
              alt="Instagram"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Share on YouTube"
            aria-label="Share on YouTube"
            style={iconStyle}
          >
            <img
              src="https://your-domain.com/youtube.png"
              alt="YouTube"
              style={{ width: 27, height: 27, display: "block" }}
            />
          </a>
        </div>
      </section>
      {/* Back link */}
      <div style={{ marginTop: '2.2rem' }}>
        <Link
          to="/"
          style={{
            color: 'var(--text-secondary)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '1.09rem',
            letterSpacing: '.01em'
          }}
        >
          ← Back to Blog List
        </Link>
      </div>
      {/* Responsive Styles */}
      <style>
        {`
        @media (max-width: 860px) {
          div[role="main-detail"] > section:first-child {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .blog-detail-responsive {
            padding: 0.5rem 0.35rem 2.2rem 0.35rem !important;
          }
          .blogdetail-title {
            font-size: 1.7rem !important;
          }
          .blogdetail-summary {
            font-size: 1.06rem !important;
          }
        }
        `}
      </style>
    </div>
  );
}

const iconStyle = {
  background: '#e63946',
  color: '#fff',
  fontSize: 27,
  width: 44,
  height: 44,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  marginRight: 0,
  boxShadow: '0 2px 8px rgba(230,57,70,0.13)',
  cursor: 'pointer',
  userSelect: 'none'
};

export default BlogDetail;

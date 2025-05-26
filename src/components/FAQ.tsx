
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes BlueLink different from other crypto projects?",
      answer: "BlueLink combines three key innovations: a regulated exchange for crypto and tokenized stocks, a high-performance blockchain with 10,000+ TPS, and integrated banking services. Our dual-jurisdiction structure (Dubai + Cayman) ensures regulatory compliance while our utility token (BLINK) powers the entire ecosystem."
    },
    {
      question: "How does the tokenized stock trading work?",
      answer: "Our tokenized stocks are backed 1:1 by real shares held in custody by licensed broker-dealers. All tokenized stock purchases must be made using BlueLink Coin, creating a closed-loop ecosystem. Trades settle T+0 on our blockchain while the underlying shares settle T+1 traditionally."
    },
    {
      question: "What are the benefits of holding BLINK tokens?",
      answer: "BLINK holders receive: 1% reflections from all transactions, reduced trading fees on the exchange, exclusive access to tokenized stock markets, staking rewards up to 15% APY, governance voting rights, and priority access to new features and products."
    },
    {
      question: "Which countries are excluded from BlueLink services?",
      answer: "To ensure regulatory compliance, we exclude users from the United States, China, Japan, Canada, India, and Thailand. All other jurisdictions can access our full suite of services after completing KYC/AML verification."
    },
    {
      question: "When will the BlueLink Exchange launch?",
      answer: "According to our roadmap, the BlueLink Exchange is scheduled to launch in Q3 2025, alongside our blockchain mainnet. The tokenized stock exchange and migration from BLINK to BlueLink Coin will follow in Q4 2025."
    },
    {
      question: "How secure is the BlueLink ecosystem?",
      answer: "Security is our top priority. We employ multi-sig wallets, smart contract audits by top-tier firms, MPC bridge technology, encrypted mempools, and maintain insurance partnerships for tokenized securities. Our Dubai operations also benefit from VARA regulatory oversight."
    },
    {
      question: "What is the transaction tax and how is it used?",
      answer: "All on-chain transactions on the BlueLink Blockchain have a 3% tax: 1% goes to holders as reflections, 1.5% adds to liquidity pools for better trading, and 0.5% is permanently burned to reduce supply. This only applies to blockchain transactions, not exchange trades."
    },
    {
      question: "How can I participate in the presale?",
      answer: "The bonding curve pre-sale is currently active, offering 150M BLINK tokens at prices from $0.085 to $0.25. To participate, complete our KYC process, ensure you're not from an excluded jurisdiction, and follow the instructions on our presale portal."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about BlueLink, our tokenomics, 
            and how to participate in our ecosystem
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-50 rounded-lg px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-gray-700 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help. Reach out through our official channels for support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@bluelinkblockchain.com" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Email Support
              </a>
              <a 
                href="#" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

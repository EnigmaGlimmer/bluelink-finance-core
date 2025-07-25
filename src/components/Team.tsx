
import { Linkedin, Twitter, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import mykhailo from "../assets/member/Mykhailo.jpg";
import Demetri from "../assets/member/Demetrich.jpg";
import Vlad from "../assets/member/Vladyslav.jpg";
import Celeste from "../assets/member/Celeste.jpg";
import takao from "../assets/member/Takao.jpg";
import legal from "../assets/member/shahi.jpg";
import caleb from "../assets/member/rose.jpg";
import andrew from "../assets/member/Andrew.jpg";
import nikita from "../assets/member/Nikita.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Mykhailo Semeniuk",
      role: "Chief Executive Officer",
      image: mykhailo,
      // bio: "Former Goldman Sachs VP with 15+ years in blockchain and fintech",
      linkedin: "https://www.linkedin.com/in/mykhailo-semeniuk-aa6495340/",
      // twitter: "#"
    },
    {
      name: "Demetrich Stokes",
      role: "Co-Founder",
      image: Demetri,
      // bio: "Ex-Ethereum core developer and blockchain architecture expert",
      linkedin: "https://www.linkedin.com/in/demetrichstokes/",
      // github: "#"
    },
      {
      name: "Celeste Paras",
      role: "Chief Operating Officer & CMO",
      image: Celeste,
      // bio: "Regulatory expert with deep knowledge in global financial compliance",
      linkedin: "https://www.linkedin.com/in/celesteparas/",
      // twitter: "#"
    },
    {
      name: "Vladyslav Shevchenko",
      role: "Chief Financial Officer",
      image: Vlad,
      // bio: "Former JP Morgan Managing Director specializing in digital assets",
      linkedin: "https://www.linkedin.com/in/vladyslav-shevchenko-19851105dev/",
      // twitter: "#"
    },
  
    {
      name: "Takao Kato",
      role: "Chief Technology Officer",
      image: takao,
      // bio: "PhD in Cryptography, published researcher in blockchain scalability",
      linkedin: "https://www.linkedin.com/in/takao-kato-a23456306/",
      // github: "#"
    },
    {
      name: "Shahid Jamal",
      role: "Legal Advisor",
      image: legal,
      // bio: "Strategic partnerships expert with Fortune 500 client relationships",
      linkedin: "https://www.linkedin.com/in/cryptocurrencylawyer/",
      // twitter: "#"
    },
     {
      name: "Caleb Lin",
      role: "Product Manager",
      image: caleb,
      // bio: "Strategic partnerships expert with Fortune 500 client relationships",
      linkedin: "https://www.linkedin.com/in/caleb-zhiliang-lin-853420373/",
      // twitter: "#"
    },
        {
      name: "Nikita Dwivedi",
      role: "Business Development Manager",
      image: nikita,
      // bio: "Strategic partnerships expert with Fortune 500 client relationships",
      linkedin: "https://www.linkedin.com/in/nikita-dwivedi-2b2151171/",
      // twitter: "#"
    },
        {
      name: "Andrew D.",
      role: "Lead Blockchain Engineer",
      image: andrew,
      // bio: "Strategic partnerships expert with Fortune 500 client relationships",
      linkedin: "https://www.linkedin.com/in/andrew-dyer-b6484a358/",
      // twitter: "#"
    }
  ];

  return (
    <section id="team" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Leadership Team
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            World-class experts driving the future of blockchain finance with decades of combined experience 
            from leading financial institutions and technology companies.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-4 md:gap-x-8 md:gap-y-5 lg:gap-x-12 lg:gap-y-6 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={member.name} className="group rounded-xl hover:shadow-2xl transition-all duration-300 border-0 bg-sky-100 backdrop-blur-sm hover:bg-sky-100/80 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6 text-center">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-3xl mx-auto object-cover border-4 border-blue-200 group-hover:border-blue-300 transition-colors duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-sky-600 font-semibold mb-2">{member.role}</p>
                {/* <p className="text-slate-600 text-sm leading-relaxed mb-6">{member.bio}</p> */}

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {/* {member.twitter && (
                    <a
                      href={member.twitter}
                      className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )} */}
                  {/* {member.github && (
                    <a
                      href={member.github}
                      className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )} */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
       
      </div>
    </section>
  );
};

export default Team;

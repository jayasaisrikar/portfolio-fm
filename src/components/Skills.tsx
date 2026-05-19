import { motion } from 'motion/react';

const categories = [
  {
    title: "Languages & Frameworks",
    skills: ["TypeScript", "Python", "JavaScript", "Next.js", "React", "Django", "HTML", "CSS", "Streamlit", "React-Storybook"]
  },
  {
    title: "AI & ML",
    skills: ["GenAI", "LLMs", "Multi-Agent Systems", "Agentic Workflows", "MCP Servers", "NLP", "TensorFlow", "PyTorch"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS Lambda", "GCP", "Azure Portal", "Docker", "Kubernetes", "VMware", "CI/CD pipelines"]
  },
  {
    title: "Databases & Tools",
    skills: ["Neo4j", "MySQL", "PostgreSQL", "NoSQL", "Git", "JIRA", "RESTful APIs", "SQLite"]
  },
  {
    title: "Web3 & Blockchain",
    skills: ["Solidity", "Ethers.js", "Web3.js", "Smart Contracts", "DeFi", "Crypto Arbitrage", "Wallet Integration", "EVM", "Hardhat", "IPFS"]
  }
];

export default function Skills() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3"
        >
          <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase mb-4 block">Competencies</span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            Technical<br/>Arsenal
          </h2>
          <div className="h-[1px] w-24 bg-white/20 mb-8" />
          <p className="text-white/60 text-sm tracking-wide leading-relaxed">
            A comprehensive toolkit spanning full-stack development, cloud architecture, and cutting-edge artificial intelligence.
          </p>
        </motion.div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    staggerChildren: 0.05,
                    when: "beforeChildren"
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-6 pb-4 border-b border-white/10">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                    }}
                    className="px-3 py-1.5 border border-white/10 bg-white/[0.02] hover:bg-[#E0FF00] hover:text-black hover:border-[#E0FF00] transition-colors duration-300 text-[10px] font-medium tracking-widest uppercase cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

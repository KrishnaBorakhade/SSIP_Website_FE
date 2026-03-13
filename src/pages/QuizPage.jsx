import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, Clock, FileText, Target, 
  ChevronRight, PlayCircle, Sparkles, Award
} from 'lucide-react';

// --- MOCK DATA FOR QUIZ LISTINGS ---
const quizList = [
  { 
    id: "upsc-eco-1", title: "Indian Economy Mini Mock", category: "UPSC", 
    desc: "Test your knowledge on MSF, Repo Rates, and macro-economic trends.",
    questions: 10, duration: "15 Mins", marks: "13.3", level: "Moderate"
  },
  { 
    id: "upsc-pol-1", title: "Polity: Fundamental Rights", category: "UPSC", 
    desc: "Important PYQ-based questions on Articles 12-35.",
    questions: 15, duration: "20 Mins", marks: "20.0", level: "Hard"
  },
  { 
    id: "uppcs-up-1", title: "UP Special GK & Current Affairs", category: "UPPCS", 
    desc: "Strictly aligned with the new UPPCS Exam pattern and UP local news.",
    questions: 20, duration: "25 Mins", marks: "26.6", level: "Moderate"
  },
  { 
    id: "uppcs-his-1", title: "Modern History Quick Revision", category: "UPPCS", 
    desc: "Covering the Indian National Movement from 1857 to 1947.",
    questions: 10, duration: "12 Mins", marks: "13.3", level: "Easy"
  },
  { 
    id: "bpsc-sci-1", title: "General Science Mastery", category: "BPSC", 
    desc: "High-yield physics, chemistry, and biology questions for BPSC.",
    questions: 15, duration: "15 Mins", marks: "15.0", level: "Moderate"
  },
  { 
    id: "mppsc-mp-1", title: "MP Special Geography", category: "MPPSC", 
    desc: "Rivers, national parks, and geographical features of Madhya Pradesh.",
    questions: 10, duration: "10 Mins", marks: "20.0", level: "Easy"
  }
];

const categories = ["All", "UPSC", "UPPCS", "BPSC", "MPPSC"];

export default function QuizPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredQuizzes = activeCategory === "All" 
    ? quizList 
    : quizList.filter(quiz => quiz.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-32 md:pb-48 bg-slate-50 dark:bg-slate-950 font-sans relative overflow-x-hidden w-full">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="hidden md:block absolute top-[0%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] transform-gpu" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="hidden md:block absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] transform-gpu" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10 max-w-[1400px]">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-10 md:mb-14 pt-4 md:pt-8">
           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary dark:text-purple-400 font-bold text-xs md:text-sm mb-6 shadow-sm">
             <BrainCircuit size={16} className="text-purple-500" /> Daily Quiz Vault
           </motion.div>
           
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tighter leading-tight">
             Test Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Knowledge.</span>
           </motion.h1>
           
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
             Select your exam and challenge yourself with our highly curated, strictly syllabus-aligned mock quizzes.
           </motion.p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex justify-start sm:justify-center mb-10 md:mb-14 overflow-x-auto pb-4 scrollbar-hide relative z-20 px-2">
          <div className="flex p-1.5 md:p-2 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all whitespace-nowrap z-10 ${
                  activeCategory === cat ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div layoutId="quizFilter" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl shadow-md -z-10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- QUIZ GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <motion.div key={quiz.id} variants={cardVariants} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform-gpu hover:-translate-y-1">
                  
                  {/* Card Header (Topic / Badges) */}
                  <div className="p-6 md:p-8 pb-0 flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center border border-purple-100 dark:border-purple-800/50 group-hover:scale-110 transition-transform transform-gpu">
                      <Target size={24} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px] sm:text-xs rounded-lg border border-slate-200 dark:border-slate-700 tracking-wider uppercase">
                      {quiz.category}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="px-6 md:px-8 flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 line-clamp-2">
                      {quiz.desc}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6 border-y border-slate-100 dark:border-slate-800/50 py-4">
                      <div className="flex flex-col items-center text-center">
                        <FileText size={16} className="text-slate-400 mb-1" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{quiz.questions}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide">Ques</span>
                      </div>
                      <div className="flex flex-col items-center text-center border-x border-slate-100 dark:border-slate-800/50">
                        <Clock size={16} className="text-slate-400 mb-1" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{quiz.duration}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide">Time</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <Award size={16} className="text-slate-400 mb-1" />
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{quiz.marks}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wide">Marks</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    {/* Redirects to /quiz/attempt (where your actual questions logic lives) */}
                    <Link to="/quiz/attempt" className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-md group-hover:bg-primary dark:group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center gap-2 transform-gpu active:scale-95">
                      <PlayCircle size={18} className="group-hover:animate-pulse" /> Start Quiz
                    </Link>
                  </div>

                </motion.div>
              ))
            ) : (
              /* --- EMPTY STATE / COMING SOON --- */
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="col-span-full py-20 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-800">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">More Quizzes Coming Soon!</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">Our experts are currently crafting high-quality mock questions for the {activeCategory} category.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
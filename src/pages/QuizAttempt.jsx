import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, Bookmark, Flag, 
  CheckCircle2, XCircle, RotateCcw, Trophy, BrainCircuit 
} from 'lucide-react';

// --- 10 UPSC STYLE QUESTIONS ---
const quizQuestions = [
  {
    id: 1,
    category: "Indian Economy",
    question: "With reference to the Indian economy, what is the primary purpose of the 'Marginal Standing Facility' (MSF)?",
    options: [
      "To provide long-term loans to corporate sectors.",
      "To allow banks to borrow money from RBI overnight.",
      "To regulate the foreign exchange reserves.",
      "To manage the printing of currency notes."
    ],
    answerIndex: 1
  },
  {
    id: 2,
    category: "History",
    question: "The 'Harappan' civilization is closely associated with which of the following rivers?",
    options: [
      "Ganga and Yamuna",
      "Indus and Sarasvati",
      "Brahmaputra",
      "Narmada"
    ],
    answerIndex: 1
  },
  {
    id: 3,
    category: "Polity",
    question: "Which Article of the Indian Constitution safeguards one's right to marry the person of one's choice?",
    options: ["Article 19", "Article 21", "Article 25", "Article 29"],
    answerIndex: 2
  },
  {
    id: 4,
    category: "Geography",
    question: "Which of the following ocean currents is a cold current?",
    options: ["Kuroshio Current", "Gulf Stream", "Agulhas Current", "Canary Current"],
    answerIndex: 3
  },
  {
    id: 5,
    category: "Environment",
    question: "Which national park is famous for being the natural habitat of the 'Great Indian One-Horned Rhinoceros'?",
    options: ["Jim Corbett National Park", "Kanha National Park", "Gir National Park", "Ranthambore National Park"],
    answerIndex: 0
  },
  {
    id: 6,
    category: "Science & Tech",
    question: "What is the primary objective of NASA's 'James Webb Space Telescope'?",
    options: [
      "To study the surface of Mars.",
      "To observe the universe in infrared to see distant galaxies.",
      "To land a rover on Jupiter's moon Europa.",
      "To track near-Earth asteroids."
    ],
    answerIndex: 1
  },
  {
    id: 7,
    category: "Polity",
    question: "Who among the following administers the oath of office to the President of India?",
    options: ["Prime Minister", "Vice President", "Chief Justice of India", "Speaker of the Lok Sabha"],
    answerIndex: 2
  },
  {
    id: 8,
    category: "Modern History",
    question: "Who was the founder of the 'Ghadar Party' in San Francisco?",
    options: ["Lala Hardayal", "Bhagat Singh", "Subhash Chandra Bose", "Chandrashekhar Azad"],
    answerIndex: 0
  },
  {
    id: 9,
    category: "Economy",
    question: "Which of the following is NOT a function of the Reserve Bank of India (RBI)?",
    options: [
      "Regulating credit in the country.",
      "Acting as a banker to the government.",
      "Accepting deposits from the general public.",
      "Managing the foreign exchange reserves."
    ],
    answerIndex: 2
  },
  {
    id: 10,
    category: "Current Affairs",
    question: "The 'G20' summit hosted by India in 2023 inducted which new permanent member into the group?",
    options: ["ASEAN", "African Union", "SAARC", "BIMSTEC"],
    answerIndex: 1
  }
];

export default function QuizAttempt() {
  // State Management
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState({ total: 0, correct: 0, incorrect: 0, unattempted: 0 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIndex }));
  };

  const handleToggleReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentIdx)) newSet.delete(currentIdx);
      else newSet.add(currentIdx);
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleSubmit = () => {
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === undefined) {
        unattempted++;
      } else if (selectedAnswers[idx] === q.answerIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    // Calculation Logic: +1.33 for Correct, -0.66 for Incorrect
    const rawScore = (correct * 1.33) - (incorrect * 0.66);
    const finalScore = Math.max(0, parseFloat(rawScore.toFixed(2))); // Prevent negative total score if desired, or remove Math.max

    setScoreData({ total: finalScore, correct, incorrect, unattempted });
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setMarkedForReview(new Set());
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const question = quizQuestions[currentIdx];

  // ==========================================
  // VIEW: RESULT SCREEN
  // ==========================================
  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2rem] p-8 md:p-12 w-full max-w-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
          
          <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Quiz Completed!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Here is your performance breakdown.</p>

          <div className="flex justify-center items-center mb-10">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-3xl w-48 shadow-inner border border-slate-200 dark:border-slate-700 relative">
               <span className="text-[10px] uppercase font-bold text-slate-400 absolute top-3 left-0 right-0 text-center">Total Score</span>
               <span className="text-4xl font-black text-primary block mt-3">{scoreData.total}</span>
               <span className="text-xs text-slate-500 block mt-1">out of {(quizQuestions.length * 1.33).toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
             <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-4 rounded-2xl flex flex-col items-center">
               <CheckCircle2 className="text-emerald-500 mb-2" size={24} />
               <span className="text-xl font-bold text-slate-900 dark:text-white">{scoreData.correct}</span>
               <span className="text-[10px] md:text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">Correct</span>
               <span className="text-[10px] text-slate-400 mt-1">(+1.33 each)</span>
             </div>
             <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 p-4 rounded-2xl flex flex-col items-center">
               <XCircle className="text-red-500 mb-2" size={24} />
               <span className="text-xl font-bold text-slate-900 dark:text-white">{scoreData.incorrect}</span>
               <span className="text-[10px] md:text-xs text-red-600 dark:text-red-400 font-bold uppercase">Incorrect</span>
               <span className="text-[10px] text-slate-400 mt-1">(-0.66 each)</span>
             </div>
             <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex flex-col items-center">
               <Bookmark className="text-slate-400 mb-2" size={24} />
               <span className="text-xl font-bold text-slate-900 dark:text-white">{scoreData.unattempted}</span>
               <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Skipped</span>
               <span className="text-[10px] text-slate-400 mt-1">(0 marks)</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={resetQuiz} className="px-8 py-3.5 bg-primary hover:bg-purple-700 text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2">
              <RotateCcw size={18} /> Retake Quiz
            </button>
            <Link to="/" className="px-8 py-3.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-bold shadow-md transition-all flex items-center justify-center">
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE QUIZ SCREEN
  // ==========================================
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-20 bg-slate-50 dark:bg-slate-950 font-sans">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col lg:flex-row gap-8">
        
        {/* --- LEFT: MAIN QUESTION AREA --- */}
        <div className="flex-1 flex flex-col">
          
          {/* Header Info */}
          <div className="flex justify-between items-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
               <BrainCircuit size={14} /> {question.category}
            </div>
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
               Question {currentIdx + 1} of {quizQuestions.length}
            </div>
          </div>

          {/* Question Card */}
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-sm flex-1 mb-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed mb-8">
              <span className="text-primary mr-2">Q{currentIdx + 1}.</span> {question.question}
            </h2>

            <div className="flex flex-col gap-4">
              {question.options.map((opt, i) => {
                const isSelected = selectedAnswers[currentIdx] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={`text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      isSelected 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                       {isSelected && <div className="w-3 h-3 bg-primary rounded-full" />}
                    </div>
                    <span className={`text-sm md:text-base font-medium ${isSelected ? 'text-slate-900 dark:text-white font-semibold' : ''}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button 
              onClick={handlePrev} 
              disabled={currentIdx === 0}
              className="px-5 py-3 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <button 
              onClick={handleToggleReview}
              className={`px-5 py-3 rounded-xl font-bold text-sm border flex items-center gap-2 transition-colors ${
                markedForReview.has(currentIdx)
                  ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Flag size={16} className={markedForReview.has(currentIdx) ? 'fill-amber-500 text-amber-500' : ''} /> 
              {markedForReview.has(currentIdx) ? 'Marked' : 'Mark for Review'}
            </button>

            {currentIdx === quizQuestions.length - 1 ? (
              <button 
                onClick={handleSubmit} 
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md transition-all flex items-center gap-2 transform-gpu active:scale-95"
              >
                Submit Quiz <CheckCircle2 size={16} />
              </button>
            ) : (
              <button 
                onClick={handleNext} 
                className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md transition-all flex items-center gap-2 transform-gpu active:scale-95"
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* --- RIGHT: QUESTION PALETTE SIDEBAR --- */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm sticky top-32">
             <h3 className="font-black text-slate-900 dark:text-white mb-4">Question Palette</h3>
             
             <div className="grid grid-cols-5 gap-3 mb-6">
               {quizQuestions.map((_, i) => {
                 const isAnswered = selectedAnswers[i] !== undefined;
                 const isMarked = markedForReview.has(i);
                 const isCurrent = currentIdx === i;

                 let bgClass = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400";
                 if (isMarked && isAnswered) bgClass = "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700";
                 else if (isMarked) bgClass = "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700";
                 else if (isAnswered) bgClass = "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700";
                 
                 if (isCurrent) bgClass += " ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-primary border-primary";

                 return (
                   <button
                     key={i}
                     onClick={() => setCurrentIdx(i)}
                     className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm transition-all transform-gpu active:scale-90 ${bgClass}`}
                   >
                     {i + 1}
                   </button>
                 );
               })}
             </div>

             <div className="space-y-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
               <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 dark:bg-emerald-900/50 dark:border-emerald-700"></div> Answered</div>
               <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:border-slate-700"></div> Not Answered</div>
               <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-amber-100 border border-amber-300 dark:bg-amber-900/50 dark:border-amber-700"></div> Marked for Review</div>
               <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-purple-100 border border-purple-300 dark:bg-purple-900/50 dark:border-purple-700"></div> Answered & Marked</div>
             </div>

             <button onClick={handleSubmit} className="w-full mt-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-md hover:bg-primary dark:hover:bg-primary hover:text-white transition-colors">
               Submit Final Quiz
             </button>
           </div>
        </div>

      </div>
    </div>
  );
}
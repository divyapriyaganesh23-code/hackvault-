import React from 'react';
import { Layers, ShieldCheck, Github, ExternalLink, Award, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white font-sans tracking-tight">Hack<span className="text-blue-400">Vault</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student Hackathon Problem & Solution Discovery Platform. Discover how previous winning teams solved complex national and global challenges before writing your first line of code.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Public Sources & Working Repos</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Discovery</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('problems')} className="hover:text-white transition">
                  Browse Problem Statements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-white transition">
                  Winning Repositories & Demos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-white transition">
                  Project Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('similar')} className="hover:text-white transition">
                  Similar Problem Semantic Finder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved')} className="hover:text-white transition">
                  My Research Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Indexed Hackathons */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Indexed Sources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Smart India Hackathon (SIH 2022-2024)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>KAVACH National Cybersecurity Hackathon</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Google Solution Challenge (UN SDGs)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Devfolio / ETHIndia Web3 Hackathons</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Unstop & Devpost Collegiate Contests</span>
              </li>
            </ul>
          </div>

          {/* Student Commitment & Integrity */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Platform Integrity</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              HackVault does not generate fake repositories, hallucinated team claims, or fabricated statistics. Every external link is validated against public GitHub repositories and official hackathon records.
            </p>
            <div className="mt-3 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
              💡 <span className="font-semibold text-white">Student Tip:</span> Always inspect the "Limitations" tab of previous winners to find your team's winning advantage!
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HackVault. Built for student engineering teams and hackathon competitors.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>English & Tanglish Explanations Supported</span>
            </span>
            <button onClick={() => onNavigate('admin')} className="text-slate-400 hover:text-slate-300 underline">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

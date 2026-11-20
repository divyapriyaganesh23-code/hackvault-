import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Bookmark, 
  Scale, 
  Sparkles, 
  Compass, 
  FolderGit2, 
  Settings2, 
  Menu, 
  X,
  Database
} from 'lucide-react';

interface Props {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  bookmarkCount: number;
  compareCount: number;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onNavigate,
  bookmarkCount,
  compareCount,
  onOpenSettings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      onNavigate('problems', navSearch.trim());
      setNavSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'problems', label: 'Problem Statements', icon: Layers },
    { id: 'solutions', label: 'Existing Solutions', icon: FolderGit2 },
    { id: 'compare', label: 'Compare Projects', icon: Scale, badge: compareCount },
    { id: 'similar', label: 'Similar Finder', icon: Sparkles },
    { id: 'saved', label: 'My Saved', icon: Bookmark, badge: bookmarkCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-slate-900 font-sans">Hack<span className="text-blue-600">Vault</span></span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                Problem & Solution Discovery
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SIH problems, tech (YOLO, Flutter)..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400"
              />
            </form>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-blue-600 text-white leading-tight">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Admin, Settings, Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('admin')}
              title="Admin & Data Management"
              className={`p-2 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                currentTab === 'admin'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span className="hidden xl:inline">Admin</span>
            </button>

            <button
              onClick={onOpenSettings}
              title="AI & Settings"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems, hackathons..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full text-sm pl-9 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentTab === 'admin' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>Admin & Data Management</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

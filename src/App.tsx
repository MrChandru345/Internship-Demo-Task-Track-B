import { useState } from 'react'
import { 
  Sparkles, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Laptop, 
  BookOpen, 
  Palette, 
  Copy, 
  Check, 
  RotateCcw,
  ExternalLink,
  Cpu,
  Layers,
  Heart
} from 'lucide-react'

type ThemeKey = 'indigo' | 'emerald' | 'rose' | 'amber';

interface ThemeStyles {
  primary: string;
  bg: string;
  border: string;
  button: string;
  glow: string;
  badge: string;
  lightText: string;
}

const colorThemes: Record<ThemeKey, ThemeStyles> = {
  indigo: {
    primary: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    button: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 text-white',
    glow: 'from-indigo-500/15 via-purple-500/10 to-transparent',
    badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    lightText: 'text-indigo-200'
  },
  emerald: {
    primary: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    button: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 text-white',
    glow: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    lightText: 'text-emerald-200'
  },
  rose: {
    primary: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    button: 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20 text-white',
    glow: 'from-rose-500/15 via-pink-500/10 to-transparent',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    lightText: 'text-rose-200'
  },
  amber: {
    primary: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    button: 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20 text-white',
    glow: 'from-amber-500/15 via-orange-500/10 to-transparent',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    lightText: 'text-amber-200'
  }
};

function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('indigo');
  const [count, setCount] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Playground Card States
  const [cardPadding, setCardPadding] = useState<string>('p-6');
  const [cardRadius, setCardRadius] = useState<string>('rounded-2xl');
  const [cardShadow, setCardShadow] = useState<string>('shadow-lg');
  const [cardGlow, setCardGlow] = useState<boolean>(true);

  const theme = colorThemes[activeTheme];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generatedTailwindClasses = `bg-slate-900 ${cardPadding} ${cardRadius} ${cardShadow} border border-slate-800 ${
    cardGlow ? `relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr ${theme.glow} before:opacity-50 before:pointer-events-none` : ''
  }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-gradient pointer-events-none opacity-40 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.glow} blur-[120px] rounded-full`} />
      </div>

      <header className="relative z-10 border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${theme.bg} ${theme.border} border transition-all duration-500`}>
              <Sparkles className={`w-6 h-6 ${theme.primary} animate-pulse`} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight font-outfit bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Vite + React
              </h1>
              <p className="text-xs text-slate-500 font-medium">Tailwind CSS Dashboard Starter</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> Select Theme:
            </span>
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
              {(Object.keys(colorThemes) as ThemeKey[]).map((tName) => (
                <button
                  key={tName}
                  onClick={() => setActiveTheme(tName)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${
                    activeTheme === tName
                      ? 'bg-slate-800 text-white shadow-inner'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${
                    tName === 'indigo' ? 'bg-indigo-500' :
                    tName === 'emerald' ? 'bg-emerald-500' :
                    tName === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                  }`} />
                  {tName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Setup & Documentation (7 Columns) */}
        <section className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Welcome Card */}
          <div className="relative bg-slate-900/50 border border-slate-900 rounded-3xl p-8 overflow-hidden backdrop-blur-sm">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${theme.glow} blur-[60px] opacity-30 rounded-full -mr-20 -mt-20 pointer-events-none transition-all duration-500`} />
            
            <div className="relative z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.badge} transition-all duration-500 mb-4`}>
                <Cpu className="w-3 h-3 animate-spin" /> Setup Complete
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white leading-tight mb-4">
                Tailwind CSS is <span className={`${theme.primary} transition-colors duration-500`}>Ready to Style</span>.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-xl">
                A modern, developer-friendly utility-first framework is loaded. You can now compose styles instantly directly inside your React markup without touching external sheets.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://tailwindcss.com/docs" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg ${theme.button}`}
                >
                  Tailwind Docs <BookOpen className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setCount(prev => prev + 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700 active:scale-95"
                >
                  Interactive Counter: <span className={`font-mono font-bold ${theme.primary}`}>{count}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Card Builder / Playground */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Layers className={`w-5 h-5 ${theme.primary}`} />
                <h3 className="text-lg font-bold font-outfit text-white">Tailwind Component Playground</h3>
              </div>
              <button 
                onClick={() => {
                  setCardPadding('p-6');
                  setCardRadius('rounded-2xl');
                  setCardShadow('shadow-lg');
                  setCardGlow(true);
                }}
                title="Reset Styles"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Adjust the styling options below to dynamically rebuild the component box. Watch how utility class configurations update in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Controls */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Padding (Spacing)</label>
                  <div className="grid grid-cols-4 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900">
                    {['p-4', 'p-6', 'p-8', 'p-10'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setCardPadding(p)}
                        className={`py-1 rounded-lg text-xs font-medium transition-all ${
                          cardPadding === p ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Border Radius (Corners)</label>
                  <div className="grid grid-cols-4 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900">
                    {['rounded-none', 'rounded-md', 'rounded-2xl', 'rounded-3xl'].map((r) => (
                      <button
                        key={r}
                        onClick={() => setCardRadius(r)}
                        className={`py-1 rounded-lg text-xs font-medium transition-all ${
                          cardRadius === r ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {r.replace('rounded-', '') || 'none'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Box Shadow (Elevation)</label>
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900">
                    {['shadow-none', 'shadow-lg', 'shadow-2xl'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setCardShadow(s)}
                        className={`py-1 rounded-lg text-xs font-medium transition-all ${
                          cardShadow === s ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {s.replace('shadow-', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                  <span className="text-xs font-semibold text-slate-400">Apply Accent Glow Gradient</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={cardGlow} 
                      onChange={(e) => setCardGlow(e.target.checked)} 
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>

              {/* Real-time Rendered Card */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold text-slate-500">Live Component Box:</span>
                <div className={`${generatedTailwindClasses} transition-all duration-300 min-h-[160px] flex flex-col justify-between`}>
                  <div className="relative z-10">
                    <h4 className="text-sm font-bold text-white mb-1">Tailwind Element</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      This element's layout parameters updates reactively to slider clicks.
                    </p>
                  </div>
                  <span className={`relative z-10 inline-self-start text-[10px] uppercase tracking-wider font-semibold font-mono ${theme.primary}`}>
                    Active: {activeTheme}
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Code Output */}
            <div className="mt-8 pt-6 border-t border-slate-800/50">
              <span className="block text-xs font-semibold text-slate-400 mb-2">CSS Output (Copy Classes):</span>
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-900 font-mono text-[11px] text-slate-300 overflow-x-auto gap-4">
                <code className="whitespace-nowrap select-all">{`className="${generatedTailwindClasses}"`}</code>
                <button
                  onClick={() => copyToClipboard(`className="${generatedTailwindClasses}"`, 1)}
                  className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all flex-shrink-0"
                >
                  {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Right column: Verification, Files & commands (5 Columns) */}
        <section className="lg:col-span-5 flex flex-col gap-8">
          
          {/* File Structure Cards */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold font-outfit text-white mb-4 flex items-center gap-2">
              <Code2 className={`w-5 h-5 ${theme.primary}`} /> Key Config Files
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between hover:border-slate-800 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-300 font-mono">tailwind.config.js</span>
                    <span className="block text-[10px] text-slate-500">Configures scan targets & custom themes</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between hover:border-slate-800 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-300 font-mono">postcss.config.js</span>
                    <span className="block text-[10px] text-slate-500">Injects Tailwind & autoprefixer plugins</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between hover:border-slate-800 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-300 font-mono">src/index.css</span>
                    <span className="block text-[10px] text-slate-500">Declares tailwind directives</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between hover:border-slate-800 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <div>
                    <span className="block text-xs font-semibold text-slate-300 font-mono">src/App.tsx</span>
                    <span className="block text-[10px] text-slate-500">Our reactive starter component</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* CLI Command Helper */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold font-outfit text-white mb-4 flex items-center gap-2">
              <Terminal className={`w-5 h-5 ${theme.primary}`} /> Script Reference
            </h3>

            <div className="space-y-4">
              <div>
                <span className="block text-[11px] text-slate-400 font-medium mb-1.5">1. Run Development Server</span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-900 font-mono text-xs text-indigo-300">
                  <code>npm run dev</code>
                  <button
                    onClick={() => copyToClipboard('npm run dev', 2)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-[11px] text-slate-400 font-medium mb-1.5">2. Build Production Bundle</span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-900 font-mono text-xs text-indigo-300">
                  <code>npm run build</code>
                  <button
                    onClick={() => copyToClipboard('npm run build', 3)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
                  >
                    {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-6 bg-slate-900/20 border border-slate-900 rounded-3xl backdrop-blur-sm">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-slate-400" /> How to use custom fonts
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              We loaded <span className="text-slate-300 font-medium font-outfit">Outfit</span> and <span className="text-slate-300 font-medium">Plus Jakarta Sans</span> in the header. Set them in Tailwind using the <code className="text-indigo-400 bg-slate-950 px-1 py-0.5 rounded text-[10px]">font-outfit</code> or default <code className="text-indigo-400 bg-slate-950 px-1 py-0.5 rounded text-[10px]">font-sans</code> classes.
            </p>
          </div>

        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-8 px-6 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>using Vite, React, and Tailwind CSS</span>
          </div>
          <div className="flex gap-4">
            <a href="https://vite.dev" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              Vite <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              React <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              Tailwind <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

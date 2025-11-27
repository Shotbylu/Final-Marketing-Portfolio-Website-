import { Globe, Database, BarChart3 } from 'lucide-react';

export function Stats() {
  return (
    <section className="py-16 bg-black border-t border-zinc-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="sm:pl-4">
            <div className="text-4xl md:text-5xl font-bold text-primary">
              R350 000+
            </div>
            <div className="text-xs text-gray-500 uppercase mt-2 tracking-widest">
              Managed Ad Spend
            </div>
          </div>
          <div className="sm:pl-8 pt-8 sm:pt-0 border-t sm:border-t-0 sm:border-l border-zinc-800">
            <div className="text-4xl md:text-5xl font-bold text-white">
              4.2:1
            </div>
            <div className="text-xs text-gray-500 uppercase mt-2 tracking-widest">
              Average ROAS
            </div>
          </div>
          <div className="sm:pl-8 pt-8 sm:pt-0 border-t sm:border-t-0 sm:border-l border-zinc-800">
            <div className="text-4xl md:text-5xl font-bold text-white">R85</div>
            <div className="text-xs text-gray-500 uppercase mt-2 tracking-widest">
              Best CPL Achieved
            </div>
          </div>
          <div className="sm:pl-8 pt-8 sm:pt-0 flex items-center justify-center sm:justify-start gap-6 text-gray-400 border-t sm:border-t-0 sm:border-l border-zinc-800">
            <Globe
              size={32}
              className="hover:text-white transition-colors"
            />
            <Database
              size={32}
              className="hover:text-white transition-colors"
            />
            <BarChart3
              size={32}
              className="hover:text-white transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

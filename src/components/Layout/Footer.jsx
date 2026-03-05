import { Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto py-12 border-t border-slate-100 dark:border-zinc-800/50">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">
                        Built by bxzex
                    </p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        Open Source • Free for Everyone
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/bxzex"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                    >
                        <Github size={18} />
                    </a>
                    <a
                        href="https://www.instagram.com/bxzex/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                    >
                        <Instagram size={18} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/bxzex/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-zinc-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                    >
                        <Linkedin size={18} />
                    </a>
                </div>

                <p className="text-[10px] text-zinc-400 font-medium">
                    © 2025 Enterprise CRM Suite. Localized Data Strategy.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

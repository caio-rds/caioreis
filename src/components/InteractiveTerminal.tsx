import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function InteractiveTerminal() {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    const welcomeLines: TerminalLine[] = language === 'pt' ? [
      { text: '==================================================', type: 'output' },
      { text: 'Caio Reis - Terminal Interativo [Versão 2.0.0]', type: 'success' },
      { text: '© 2026 Caio Reis. Todos os direitos reservados.', type: 'output' },
      { text: 'Digite "help" para ver os comandos disponíveis.', type: 'output' },
      { text: '==================================================', type: 'output' },
    ] : [
      { text: '==================================================', type: 'output' },
      { text: 'Caio Reis - Interactive Terminal [Version 2.0.0]', type: 'success' },
      { text: '© 2026 Caio Reis. All rights reserved.', type: 'output' },
      { text: 'Type "help" to see available commands.', type: 'output' },
      { text: '==================================================', type: 'output' },
    ];
    setHistory(welcomeLines);
  }, [language]);

  // Autoscroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isGlitching]);

  const focusInput = () => {
    if (!isGlitching) {
      inputRef.current?.focus();
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `guest@caioreis:~$ ${input}`, type: 'input' as const }];
    setInput('');

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'sudo rm -rf /') {
      setIsGlitching(true);
      setHistory([...newHistory, { text: language === 'pt' ? 'DELETANDO SISTEMA DE ARQUIVOS...' : 'DELETING FILE SYSTEM...', type: 'error' }]);
      setTimeout(() => {
        setIsGlitching(false);
        setHistory([
          { text: language === 'pt' ? 'Sistema restaurado após falha crítica. Não faça isso de novo!' : 'System recovered after critical crash. Don\'t do that again!', type: 'success' },
          { text: language === 'pt' ? 'Digite "help" para começar.' : 'Type "help" to start.', type: 'output' }
        ]);
      }, 3000);
      return;
    }

    let response: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        response = language === 'pt' ? [
          { text: 'Comandos disponíveis:', type: 'success' },
          { text: '  about      - Exibe informações sobre mim.', type: 'output' },
          { text: '  skills     - Lista minhas principais tecnologias.', type: 'output' },
          { text: '  projects   - Mostra meus principais repositórios no GitHub.', type: 'output' },
          { text: '  contact    - Mostra canais de contato e redes sociais.', type: 'output' },
          { text: '  stats      - Exibe minhas estatísticas profissionais.', type: 'output' },
          { text: '  clear      - Limpa a tela do terminal.', type: 'output' },
          { text: '  sudo rm -rf / - Executa ação de superusuário.', type: 'error' },
        ] : [
          { text: 'Available commands:', type: 'success' },
          { text: '  about      - Displays information about me.', type: 'output' },
          { text: '  skills     - Lists my primary technologies.', type: 'output' },
          { text: '  projects   - Shows my main GitHub repositories.', type: 'output' },
          { text: '  contact    - Shows contact channels and social links.', type: 'output' },
          { text: '  stats      - Displays my professional statistics.', type: 'output' },
          { text: '  clear      - Clears the terminal screen.', type: 'output' },
          { text: '  sudo rm -rf / - Runs superuser action.', type: 'error' },
        ];
        break;
      case 'about':
      case 'whoami':
        response = language === 'pt' ? [
          { text: 'Caio Reis - Engenheiro de Software & Desenvolvedor Backend', type: 'success' },
          { text: 'Residente no Rio de Janeiro, com foco no desenvolvimento de APIs de alta performance, microsserviços robustos, automação inteligente e modelagem de arquitetura limpa.', type: 'output' },
          { text: 'Sempre em busca de otimização de performance e boas práticas de engenharia de software.', type: 'output' }
        ] : [
          { text: 'Caio Reis - Software Engineer & Backend Developer', type: 'success' },
          { text: 'Based in Rio de Janeiro, focusing on high-performance APIs, robust microservices, smart automations, and clean system architecture.', type: 'output' },
          { text: 'Always searching for performance optimizations and software engineering best practices.', type: 'output' }
        ];
        break;
      case 'skills':
        response = language === 'pt' ? [
          { text: 'Minhas Tecnologias & Habilidades:', type: 'success' },
          { text: '  - Linguagens: Node.js/TypeScript, Python, Golang, Lua', type: 'output' },
          { text: '  - Web/API: NestJS, Express, FastAPI, Django, REST, gRPC', type: 'output' },
          { text: '  - Bancos de Dados: PostgreSQL, SQL Server, MongoDB, Redis', type: 'output' },
          { text: '  - DevOps & Cloud: Docker, CI/CD pipelines, Git, Linux systems', type: 'output' },
          { text: '  - Arquitetura: Clean Architecture, DDD, Microsserviços, Event-driven design', type: 'output' },
        ] : [
          { text: 'My Technologies & Skills:', type: 'success' },
          { text: '  - Languages: Node.js/TypeScript, Python, Golang, Lua', type: 'output' },
          { text: '  - Web/API: NestJS, Express, FastAPI, Django, REST, gRPC', type: 'output' },
          { text: '  - Databases: PostgreSQL, SQL Server, MongoDB, Redis', type: 'output' },
          { text: '  - DevOps & Cloud: Docker, CI/CD pipelines, Git, Linux systems', type: 'output' },
          { text: '  - Architecture: Clean Architecture, DDD, Microservices, Event-driven design', type: 'output' },
        ];
        break;
      case 'projects':
        response = language === 'pt' ? [
          { text: 'Buscando projetos destacados...', type: 'success' },
          { text: '  - caioreis-website: Este portfólio incrível!', type: 'output' },
          { text: '  - github-api: Integrações com API do GitHub.', type: 'output' },
          { text: 'Para uma lista completa e interativa dos meus repositórios no GitHub,', type: 'output' },
          { text: 'veja a seção "Projetos" logo abaixo!', type: 'success' }
        ] : [
          { text: 'Fetching featured projects...', type: 'success' },
          { text: '  - caioreis-website: This awesome portfolio!', type: 'output' },
          { text: '  - github-api: GitHub API integrations.', type: 'output' },
          { text: 'For a complete and interactive list of my GitHub repositories,', type: 'output' },
          { text: 'check out the "Projects" section below!', type: 'success' }
        ];
        break;
      case 'contact':
        response = language === 'pt' ? [
          { text: 'Conecte-se comigo:', type: 'success' },
          { text: '  GitHub:    https://github.com/caio-rds', type: 'output' },
          { text: '  LinkedIn:  https://www.linkedin.com/in/caio-reis-04224a20a/', type: 'output' },
          { text: '  Email:     caio.reis.dev@gmail.com (ou use o menu gooey no canto inferior!)', type: 'output' },
          { text: '  WhatsApp:  https://wa.me/5521999999999', type: 'output' }
        ] : [
          { text: 'Connect with me:', type: 'success' },
          { text: '  GitHub:    https://github.com/caio-rds', type: 'output' },
          { text: '  LinkedIn:  https://www.linkedin.com/in/caio-reis-04224a20a/', type: 'output' },
          { text: '  Email:     caio.reis.dev@gmail.com (or use the gooey menu in the bottom corner!)', type: 'output' },
          { text: '  WhatsApp:  https://wa.me/5521999999999', type: 'output' }
        ];
        break;
      case 'stats':
        response = language === 'pt' ? [
          { text: 'Métricas e Status:', type: 'success' },
          { text: '  - Semestre Acadêmico: 7º Período (Engenharia de Software)', type: 'output' },
          { text: '  - Café consumido: Transbordando', type: 'output' },
          { text: '  - Linhas de código escritas: Milhares', type: 'output' },
          { text: '  - Nível de Backend: Elevado', type: 'output' }
        ] : [
          { text: 'Metrics & Status:', type: 'success' },
          { text: '  - Academic Semester: 7th Period (Software Engineering)', type: 'output' },
          { text: '  - Coffee Consumed: Overflowing', type: 'output' },
          { text: '  - Lines of Code Written: Thousands', type: 'output' },
          { text: '  - Backend Level: Elevating', type: 'output' }
        ];
        break;
      default:
        response = language === 'pt' ? [
          { text: `Erro: comando não encontrado "${cmd}". Digite "help" para ver as opções.`, type: 'error' }
        ] : [
          { text: `Error: command not found "${cmd}". Type "help" to see options.`, type: 'error' }
        ];
    }

    setHistory([...newHistory, ...response]);
  };

  return (
    <div
      onClick={focusInput}
      className={`w-full max-w-2xl h-80 rounded-lg overflow-hidden border shadow-2xl flex flex-col font-mono text-sm cursor-text transition-all duration-300 ${
        isGlitching
          ? 'terminal-glitch border-red-500 shadow-red-500/50'
          : 'bg-zinc-950 border-zinc-800 shadow-zinc-950/80'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 select-none">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 rounded-full ${isGlitching ? 'bg-red-500 animate-pulse' : 'bg-red-500'}`} />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-zinc-400 text-xs font-semibold">
          {isGlitching ? 'guest@caioreis: ~ (CRITICAL ERROR)' : 'guest@caioreis: ~'}
        </div>
        <div className="w-10" />
      </div>

      {/* Screen Buffer */}
      <div className="flex-grow p-4 overflow-y-auto space-y-2 text-zinc-300">
        {history.map((line, idx) => (
          <div key={idx} className={isGlitching ? 'animate-glitch' : ''}>
            {line.type === 'input' && (
              <span className="text-emerald-400 font-bold">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-zinc-300">{line.text}</span>
            )}
            {line.type === 'success' && (
              <span className="text-blue-400 font-semibold">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red-400 font-bold">{line.text}</span>
            )}
          </div>
        ))}
        {isGlitching && (
          <div className="text-red-500 animate-pulse font-bold text-center py-4">
            *** SYSTEM CRASH ***
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Input prompt */}
      {!isGlitching && (
        <form
          onSubmit={handleCommand}
          className="flex items-center px-4 py-2 bg-zinc-900/60 border-t border-zinc-900"
        >
          <span className="text-emerald-400 font-bold mr-2">guest@caioreis:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-700"
            autoFocus
            autoComplete="off"
            spellCheck="false"
            placeholder={language === 'pt' ? 'digite um comando...' : 'type a command...'}
          />
        </form>
      )}
    </div>
  );
}

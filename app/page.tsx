"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { filters, Project, projects } from "./projects";

const nav = [
  ["inicio", "Início"], ["sobre", "Sobre"], ["tecnologias", "Tecnologias"],
  ["projetos", "Projetos"], ["jornada", "Jornada"], ["contato", "Contato"],
];

const techGroups = [
  { title: "Linguagens", items: [["C#", "Principal tecnologia desktop", "FiscalSG, ProjetoImport"], ["TypeScript", "Aplicação web moderna", "Consulta-Bitcoin"], ["JavaScript", "Interações no navegador", "JogoDaVelha"], ["PHP & Java", "Prática em projetos", "Signo-Zodiacal, AppBanco"]] },
  { title: "Front-end", items: [["React", "Componentes e estado", "Consulta-Bitcoin"], ["Next.js", "Rotas e APIs no servidor", "Consulta-Bitcoin"], ["HTML & CSS", "Interfaces responsivas", "Projeto-Mario, Form_Dark-Light"]] },
  { title: "Dados & integrações", items: [["APIs REST", "Consumo e normalização", "Consulta-Bitcoin, Previsão do Tempo"], ["Firebird", "Persistência desktop", "FiscalSG, ProjetoImport"], ["MySQL", "Cadastros e consultas", "Cadastro_Cliente"], ["Excel / ClosedXML", "Importação de planilhas", "ProjetoImport"]] },
  { title: "Ferramentas", items: [["Git & GitHub", "Versionamento público", "21 repositórios"], ["Visual Studio", "Ecossistema .NET", "Projetos C#"], ["VS Code", "Desenvolvimento web", "Projetos front-end"]] },
];

const timeline = [
  ["2023", "Fundamentos web", "Primeiros projetos públicos com HTML, CSS e JavaScript: interfaces, calculadoras, clima e landing pages."],
  ["2024 · início", "Lógica e aplicações desktop", "Jogos no navegador e avanço em C# com calculadora, sistemas de cadastro e WinForms."],
  ["2024 · meio", "Dados e automação", "FiscalSG e ProjetoImport conectam C#, bancos de dados, entidades fiscais e planilhas Excel."],
  ["2024 · fim", "Sistemas mais completos", "Cadastro_Cliente reúne validações, MySQL, imagens, relatórios e exportação em PDF."],
  ["2026", "Arquitetura web moderna", "Consulta-Bitcoin combina TypeScript, Next.js, React e múltiplas APIs em um dashboard responsivo."],
];

const capabilities = [
  ["01", "Interfaces web", "Landing pages e experiências responsivas com atenção a hierarquia, interação e adaptação mobile."],
  ["02", "Sistemas em C#", "Aplicações desktop com cadastros, validações, persistência e rotinas orientadas ao domínio."],
  ["03", "APIs e dados", "Integração de serviços externos, bancos de dados e importação de planilhas para fluxos úteis."],
  ["04", "Evolução de projetos", "Manutenção, organização e prototipação de interfaces com aprendizado contínuo."],
];

type GithubState = { loading: boolean; error: boolean; repos: number; updated: string; languages: string[] };

function Arrow() { return <span aria-hidden="true">↗</span>; }

function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  return <div className={`project-visual ${large ? "large" : ""}`} style={{ "--accent": project.accent } as React.CSSProperties}>
    <div className="visual-top"><span /><span /><span /><b>{project.type.toLowerCase()}.project</b></div>
    <div className="visual-grid" />
    <div className="visual-code"><i>01</i><span>const projeto =</span><strong>&quot;{project.name}&quot;;</strong><i>02</i><span>stack:</span><strong>[{project.tech.slice(0, 2).join(", ")}]</strong></div>
    <div className="visual-mark">{project.name.slice(0, 2).toUpperCase()}</div>
  </div>;
}

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("inicio");
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const [typed, setTyped] = useState("");
  const [formState, setFormState] = useState("");
  const [github, setGithub] = useState<GithubState>({ loading: true, error: false, repos: 21, updated: "16 jul 2026", languages: ["C#", "JavaScript", "CSS", "TypeScript"] });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("devx4n-theme");
    const next = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(next); document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    const phrases = ["Desenvolvedor de Software", "Desenvolvedor C#", "Desenvolvedor Front-end", "Criador de aplicações web"];
    let p = 0, i = 0, deleting = false;
    const timer = setInterval(() => {
      const value = phrases[p];
      i += deleting ? -1 : 1; setTyped(value.slice(0, i));
      if (!deleting && i === value.length) deleting = true;
      if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; }
    }, deleting ? 45 : 85);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = nav.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55%" });
    sections.forEach((section) => observer.observe(section));
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((node) => reveal.observe(node));
    return () => { observer.disconnect(); reveal.disconnect(); };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch("https://api.github.com/users/DevX4N", { signal: controller.signal }).then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch("https://api.github.com/users/DevX4N/repos?per_page=100", { signal: controller.signal }).then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
    ]).then(([profile, repos]) => {
      const langs = [...new Set((repos as { language?: string }[]).map((repo) => repo.language).filter(Boolean))].slice(0, 4) as string[];
      setGithub({ loading: false, error: false, repos: profile.public_repos, updated: new Date(profile.updated_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }), languages: langs });
    }).catch(() => setGithub((old) => ({ ...old, loading: false, error: true })));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", close); };
  }, [selected]);

  const visibleProjects = useMemo(() => projects.filter((project) => project.categories.includes(filter)), [filter]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"; setTheme(next);
    document.documentElement.dataset.theme = next; localStorage.setItem("devx4n-theme", next);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    if (form.get("website")) return;
    const subject = encodeURIComponent(String(form.get("assunto")));
    const body = encodeURIComponent(`Olá Alexandre,\n\n${form.get("mensagem")}\n\nNome: ${form.get("nome")}\nE-mail: ${form.get("email")}`);
    setFormState("Seu aplicativo de e-mail será aberto para concluir o envio.");
    window.location.href = `mailto:alexandrepereirax643@gmail.com?subject=${subject}&body=${body}`;
  };

  return <main onPointerMove={(e) => { document.documentElement.style.setProperty("--mx", `${e.clientX}px`); document.documentElement.style.setProperty("--my", `${e.clientY}px`); }}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="pointer-glow" aria-hidden="true" />
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="DevX4N — início"><span>&lt;</span>DevX4N<span>/&gt;</span></a>
      <nav className={menu ? "open" : ""} aria-label="Navegação principal">
        {nav.map(([id, label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={toggleTheme} aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}>{theme === "dark" ? "☼" : "◐"}</button>
        <button className="menu-button" aria-expanded={menu} aria-label="Abrir menu" onClick={() => setMenu(!menu)}><span /><span /></button>
      </div>
    </header>

    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" /><div className="orb orb-one" /><div className="orb orb-two" />
      <div className="hero-content" id="conteudo">
        <div className="availability"><span /> <b>[DISPONIBILIDADE A CONFIRMAR]</b> para oportunidades</div>
        <p className="eyebrow">Olá, eu sou Alexandre <span>— também conhecido como DevX4N</span></p>
        <h1 id="hero-title">Eu construo <em>software</em><br />que transforma complexidade<br />em experiências claras.</h1>
        <div className="typed"><span>{typed}</span><i /></div>
        <p className="hero-copy">Desenvolvedor em evolução constante, com projetos em C#, TypeScript e JavaScript — de sistemas desktop a interfaces web integradas com APIs.</p>
        <div className="hero-actions">
          <a className="button primary" href="#projetos">Ver projetos <Arrow /></a>
          <a className="button secondary" href="#contato">Entrar em contato</a>
          <a className="text-link" href="https://github.com/DevX4N" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        </div>
      </div>
      <div className="code-window" aria-label="Resumo técnico">
        <div className="window-bar"><span /><span /><span /><b>alexandre.profile.ts</b></div>
        <pre><code><i>01</i> <span>const</span> developer = {'{'}{`\n`}<i>02</i>   name: <strong>&quot;Alexandre&quot;</strong>,{`\n`}<i>03</i>   alias: <strong>&quot;DevX4N&quot;</strong>,{`\n`}<i>04</i>   stack: [<strong>&quot;C#&quot;</strong>, <strong>&quot;TypeScript&quot;</strong>],{`\n`}<i>05</i>   mindset: <strong>&quot;always learning&quot;</strong>,{`\n`}<i>06</i>   focus: <strong>&quot;useful experiences&quot;</strong>{`\n`}<i>07</i> {'}'};</code></pre>
        <div className="terminal"><span>devx4n@portfolio:~$</span> build --with-purpose <i>✓</i></div>
      </div>
      <a className="scroll-hint" href="#sobre"><span>scroll</span><i /></a>
    </section>

    <section id="sobre" className="section about reveal">
      <div className="section-heading"><p>01 / SOBRE</p><h2>Código é ferramenta.<br /><em>Clareza é o objetivo.</em></h2></div>
      <div className="about-grid">
        <div className="portrait-card"><img src="https://avatars.githubusercontent.com/u/130169286?v=4" alt="Foto pública do perfil DevX4N no GitHub" /><div><span>Alexandre</span><b>DevX4N</b></div></div>
        <div className="about-copy"><p>Sou um desenvolvedor em evolução constante, interessado em criar sistemas úteis, interfaces intuitivas e experiências digitais modernas.</p><p>Minha jornada pública no GitHub começou com projetos em HTML, CSS e JavaScript e avançou para aplicações desktop em C#, integração com bancos de dados, importação de Excel e, mais recentemente, uma aplicação Next.js com múltiplas APIs.</p><blockquote>Gosto de entender o problema, organizar a lógica e transformar cada projeto em uma oportunidade real de aprender.</blockquote>
          <div className="facts"><span><small>Localização</small>Santa Catarina, Brasil</span><span><small>Formação</small>[ADICIONAR FORMAÇÃO]</span><span><small>Experiência</small>[ADICIONAR EXPERIÊNCIA]</span><span><small>Objetivo</small>[ADICIONAR OBJETIVO]</span></div>
          <button className="button disabled" disabled title="Adicione o arquivo do currículo para ativar">Currículo [ADICIONAR PDF]</button>
        </div>
      </div>
    </section>

    <section id="tecnologias" className="section tech-section reveal">
      <div className="section-heading split"><div><p>02 / TECNOLOGIAS</p><h2>Ferramentas que uso<br /><em>para tirar ideias do papel.</em></h2></div><span>Tecnologias identificadas diretamente nos repositórios públicos. Sem níveis ou percentuais arbitrários.</span></div>
      <div className="tech-grid">{techGroups.map((group) => <article key={group.title} className="tech-group"><h3>{group.title}</h3>{group.items.map(([name, use, source]) => <div className="tech-row" key={name}><b>{name.slice(0, 2).toUpperCase()}</b><span><strong>{name}</strong><small>{use}</small><i>Encontrado em: {source}</i></span></div>)}</article>)}</div>
    </section>

    <section className="section featured reveal" aria-labelledby="featured-title">
      <div className="featured-visual"><ProjectVisual project={projects[0]} large /><div className="exchange-strip"><span>BINANCE</span><span>KRAKEN</span><span>COINBASE</span><span>OKX</span></div></div>
      <div className="featured-copy"><p>PROJETO EM DESTAQUE · 2026</p><h2 id="featured-title">Consulta-<em>Bitcoin</em></h2><p>Um painel de mercado que integra seis exchanges, normaliza cotações e ajuda a identificar melhores preços de compra e venda em BRL ou USD.</p><div className="feature-list"><span><b>01</b> Arquitetura em componentes, serviços e hooks</span><span><b>02</b> Rotas de API no Next.js para seis exchanges</span><span><b>03</b> Atualização periódica e histórico de preços</span><span><b>04</b> Estados de carregamento e falha</span></div><div className="tags">{projects[0].tech.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="inline-actions"><a className="button primary" href={projects[0].repo} target="_blank" rel="noreferrer">Abrir repositório <Arrow /></a><button className="button secondary" onClick={() => setSelected(projects[0])}>Ver detalhes</button></div></div>
    </section>

    <section id="projetos" className="section projects-section reveal">
      <div className="section-heading split"><div><p>03 / PROJETOS</p><h2>Problemas resolvidos.<br /><em>Aprendizados registrados.</em></h2></div><span>Seleção de 8 entre 21 repositórios públicos, considerando variedade, organização e relevância técnica.</span></div>
      <div className="filters" role="group" aria-label="Filtrar projetos">{filters.map((item) => <button key={item} aria-pressed={filter === item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="projects-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.name} style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}><ProjectVisual project={project} /><div className="project-card-body"><div><span>{project.type}</span><span>{project.year}</span></div><h3>{project.name}</h3><p>{project.summary}</p><div className="tags">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div><div className="card-actions"><button onClick={() => setSelected(project)}>Detalhes <Arrow /></button><a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.name} no GitHub`}>GitHub <Arrow /></a></div></div></article>)}</div>
    </section>

    <section id="jornada" className="section journey reveal">
      <div className="section-heading"><p>04 / JORNADA</p><h2>Evolução visível,<br /><em>projeto por projeto.</em></h2></div>
      <div className="timeline">{timeline.map(([year, title, text], index) => <article key={title}><div><b>{String(index + 1).padStart(2, "0")}</b><span>{year}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="section capabilities reveal"><div className="section-heading split"><div><p>05 / CAPACIDADES</p><h2>O que posso<br /><em>colocar em prática.</em></h2></div><span>Áreas de atuação apoiadas pelos projetos públicos — sem promessas além do que já foi demonstrado.</span></div><div className="capability-grid">{capabilities.map(([num, title, text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section github-section reveal" aria-labelledby="github-title">
      <div><p>GITHUB · DADOS PÚBLICOS</p><h2 id="github-title">Aprendizado<br /><em>em movimento.</em></h2><p>Um recorte atualizável do perfil DevX4N. Se a API estiver indisponível, o site preserva os últimos dados públicos confirmados.</p><a className="button secondary" href="https://github.com/DevX4N?tab=repositories" target="_blank" rel="noreferrer">Ver perfil completo <Arrow /></a></div>
      <div className="github-panel"><div className="github-status"><span className={github.error ? "error" : ""} />{github.loading ? "Atualizando dados…" : github.error ? "API indisponível · exibindo dados confirmados" : "Dados públicos atualizados"}</div><div className="github-stats"><div><strong>{github.repos}</strong><span>repositórios públicos</span></div><div><strong>2023</strong><span>início no GitHub</span></div><div><strong>{github.languages.length}</strong><span>linguagens em destaque</span></div></div><div className="language-list">{github.languages.map((lang, i) => <span key={lang}><i style={{ width: `${90 - i * 14}%` }} /><b>{lang}</b></span>)}</div><small>Perfil atualizado em {github.updated}</small></div>
    </section>

    <section id="contato" className="section contact reveal">
      <div className="contact-copy"><p>06 / CONTATO</p><h2>Tem um projeto,<br />uma vaga ou uma ideia?<br /><em>Vamos conversar.</em></h2><p>Conte um pouco sobre o contexto. O envio é concluído no seu aplicativo de e-mail — nenhuma mensagem é armazenada neste site.</p><div className="contact-links"><a href="mailto:alexandrepereirax643@gmail.com">alexandrepereirax643@gmail.com <Arrow /></a><a href="https://github.com/DevX4N" target="_blank" rel="noreferrer">github.com/DevX4N <Arrow /></a><a href="https://instagram.com/filh0x" target="_blank" rel="noreferrer">instagram.com/filh0x <Arrow /></a></div></div>
      <form onSubmit={handleSubmit}><label>Nome<input required name="nome" autoComplete="name" placeholder="Como posso te chamar?" /></label><label>E-mail<input required type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" /></label><label>Assunto<input required name="assunto" placeholder="Sobre o que vamos conversar?" /></label><label>Mensagem<textarea required minLength={20} name="mensagem" rows={5} placeholder="Compartilhe os detalhes…" /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button primary" type="submit">Preparar mensagem <Arrow /></button>{formState && <p className="form-feedback" role="status">{formState}</p>}<small>Proteção básica: validação, campo antispam e envio seguro por e-mail.</small></form>
    </section>

    <footer><a className="brand" href="#inicio"><span>&lt;</span>DevX4N<span>/&gt;</span></a><p>Projetado com intenção. Construído com curiosidade.</p><span>© 2026 Alexandre · Santa Catarina, BR</span></footer>
    <a className="back-top" href="#inicio" aria-label="Voltar ao topo">↑</a>

    {selected && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={dialogRef}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Fechar detalhes">×</button><ProjectVisual project={selected} large /><div className="modal-content"><div className="modal-kicker"><span>{selected.type}</span><span>{selected.year}</span></div><h2 id="modal-title">{selected.name}</h2><p className="modal-lead">{selected.summary}</p><div className="modal-columns"><div><h3>Objetivo</h3><p>{selected.problem}</p><h3>Tecnologias</h3><div className="tags">{selected.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div><div><h3>Funcionalidades</h3><ul>{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div></div>{(selected.learning || selected.challenge) && <div className="insights">{selected.learning && <div><span>Aprendizados identificáveis</span><p>{selected.learning}</p></div>}{selected.challenge && <div><span>Desafio técnico deduzido</span><p>{selected.challenge}</p></div>}</div>}<a className="button primary" href={selected.repo} target="_blank" rel="noreferrer">Ver código no GitHub <Arrow /></a></div></div></div>}
  </main>;
}

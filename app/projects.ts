export type Project = {
  name: string;
  kicker: string;
  type: "Web" | "Desktop" | "Sistema" | "Estudo";
  year: string;
  categories: string[];
  tech: string[];
  summary: string;
  problem: string;
  features: string[];
  learning?: string;
  challenge?: string;
  repo: string;
  accent: string;
};

export const projects: Project[] = [
  {
    name: "Consulta-Bitcoin",
    kicker: "Mercado em tempo real",
    type: "Web",
    year: "2026",
    categories: ["Todos", "JavaScript", "Front-end", "Sistemas"],
    tech: ["TypeScript", "Next.js", "React", "APIs", "CSS"],
    summary: "Dashboard que compara cotações de Bitcoin em seis exchanges e destaca melhores preços de compra e venda.",
    problem: "Centralizar cotações dispersas e tornar a comparação entre corretoras mais rápida e legível.",
    features: ["Binance, Bitfinex, Coinbase, Kraken, KuCoin e OKX", "Conversão BRL/USD", "Atualização configurável", "Histórico e gráfico de preços", "Estados de carregamento e erro"],
    learning: "Composição de dados de múltiplas APIs, normalização de preços e organização de uma interface React por componentes e hooks.",
    challenge: "Manter fontes diferentes comparáveis e preservar uma experiência clara durante falhas ou atualizações.",
    repo: "https://github.com/DevX4N/Consulta-Bitcoin",
    accent: "#f59e0b",
  },
  {
    name: "FiscalSG",
    kicker: "Geração fiscal integrada",
    type: "Sistema",
    year: "2024",
    categories: ["Todos", "C#", "Sistemas"],
    tech: ["C#", "WinForms", "Entity Framework", "Firebird"],
    summary: "Aplicação desktop que organiza dados fiscais e inicia a geração de registros SPED a partir de uma base Firebird.",
    problem: "Apoiar a consolidação de dados de emitente, contador, fornecedores, estoque, compras, NFC-e, NF-e e clientes.",
    features: ["Interface WinForms", "Mapeamentos com Entity Framework", "Integração Firebird", "Estrutura de registros SPED", "Múltiplas entidades fiscais"],
    learning: "Integração entre interface desktop, modelo de dados e geração de arquivo fiscal.",
    challenge: "Relacionar diferentes entidades do domínio fiscal em uma estrutura coerente de exportação.",
    repo: "https://github.com/DevX4N/FiscalSG",
    accent: "#22d3ee",
  },
  {
    name: "ProjetoImport",
    kicker: "Importação de dados",
    type: "Desktop",
    year: "2024",
    categories: ["Todos", "C#", "Sistemas"],
    tech: ["C#", "WinForms", "ClosedXML", "Excel", "Firebird"],
    summary: "Ferramenta desktop para importar planilhas de clientes, estoque e fornecedores e preparar os dados para consulta.",
    problem: "Reduzir trabalho manual ao reunir dados de múltiplos arquivos Excel em grades da aplicação.",
    features: ["Importação de vários arquivos", "Leitura com ClosedXML", "Processamento paralelo", "Mesclagem de tabelas", "Módulos por tipo de cadastro"],
    learning: "Tratamento de arquivos tabulares, paralelismo e separação de responsabilidades em serviços.",
    challenge: "Unificar planilhas distintas com segurança para exibição em uma única estrutura.",
    repo: "https://github.com/DevX4N/ProjetoImport",
    accent: "#8b5cf6",
  },
  {
    name: "Cadastro_Cliente",
    kicker: "Cadastro e relatórios",
    type: "Sistema",
    year: "2024",
    categories: ["Todos", "C#", "Sistemas"],
    tech: ["C#", "WinForms", "MySQL", "RDLC", "PDF"],
    summary: "Sistema desktop para cadastro de clientes com validações, imagem, consulta e emissão de relatórios em PDF.",
    problem: "Organizar informações cadastrais e tornar a consulta e impressão de fichas mais práticas.",
    features: ["Cadastro com CPF ou CNPJ", "Validação de campos", "Persistência em MySQL", "Tratamento de imagem", "Relatórios RDLC e PDF"],
    learning: "Validação de formulários, acesso a dados, tratamento de imagens e relatórios desktop.",
    challenge: "Coordenar dados pessoais, máscaras, validações e saída de relatórios em um fluxo único.",
    repo: "https://github.com/DevX4N/Cadastro_Cliente",
    accent: "#14b8a6",
  },
  {
    name: "Form_Dark-Light",
    kicker: "Interface adaptável",
    type: "Web",
    year: "2023",
    categories: ["Todos", "JavaScript", "Front-end", "Estudos"],
    tech: ["HTML", "CSS", "JavaScript"],
    summary: "Tela de login com alternância visual entre os temas claro e escuro.",
    problem: "Explorar uma interface de autenticação que se adapta à preferência visual do usuário.",
    features: ["Tema claro e escuro", "Campos de acesso", "Links sociais", "Ícones contextuais", "Transição visual"],
    repo: "https://github.com/DevX4N/Form_Dark-Light",
    accent: "#a78bfa",
  },
  {
    name: "app-previsao-tempo-master",
    kicker: "Consulta meteorológica",
    type: "Web",
    year: "2023",
    categories: ["Todos", "JavaScript", "Front-end", "Estudos"],
    tech: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
    summary: "Aplicação que consulta a condição atual do tempo de uma cidade por meio da API OpenWeather.",
    problem: "Oferecer uma consulta rápida de temperatura e condição do tempo por cidade.",
    features: ["Busca por cidade", "Temperatura em Celsius", "Descrição em português", "Ícone meteorológico", "Consumo de API"],
    repo: "https://github.com/DevX4N/app-previsao-tempo-master",
    accent: "#38bdf8",
  },
  {
    name: "Projeto-Mario",
    kicker: "Landing page temática",
    type: "Web",
    year: "2023",
    categories: ["Todos", "JavaScript", "Front-end", "Estudos"],
    tech: ["HTML", "CSS", "JavaScript", "Vídeo"],
    summary: "Landing page temática do universo Mario com vídeo, composição responsiva e interação em JavaScript.",
    problem: "Praticar uma experiência promocional mais imersiva combinando mídia, conteúdo e interface.",
    features: ["Vídeo de fundo", "Layout promocional", "Elementos responsivos", "Interação por JavaScript"],
    repo: "https://github.com/DevX4N/Projeto-Mario",
    accent: "#ef4444",
  },
  {
    name: "JogoDaVelha",
    kicker: "Lógica no navegador",
    type: "Estudo",
    year: "2024",
    categories: ["Todos", "JavaScript", "Front-end", "Estudos"],
    tech: ["HTML", "CSS", "JavaScript"],
    summary: "Jogo da velha para dois participantes com controle de turnos e detecção completa de vitória ou empate.",
    problem: "Transformar regras simples de jogo em estado, eventos e feedback visual no navegador.",
    features: ["Nomes de jogadores", "Controle de turnos", "Detecção de oito combinações", "Destaque da vitória", "Reinício de partida"],
    learning: "Manipulação do DOM, matrizes, eventos e regras de estado em JavaScript.",
    repo: "https://github.com/DevX4N/JogoDaVelha",
    accent: "#34d399",
  },
];

export const filters = ["Todos", "C#", "JavaScript", "Front-end", "Sistemas", "Estudos"];

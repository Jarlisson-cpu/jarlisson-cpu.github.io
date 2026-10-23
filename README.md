# 🌊 Portfólio — Jarlisson Brito

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Meu portfólio pessoal. É uma página única com um **console interativo inspirado no JARVIS**, meu assistente de IA, além dos projetos do GitHub com filtros e dos meus contatos.
Feito com HTML, CSS e JavaScript puros: sem frameworks e sem etapa de build.

## ✨ O que tem

- 🤖 **Console JARVIS no topo**: o visitante digita ou toca em comandos (`projetos`, `skills`, `linkedin`…) e recebe respostas com efeito de digitação e onda sonora animada
- ⭐ **Projeto em destaque** (JARVIS) com números e exemplos de comandos de voz
- 🗂️ **Cards de projeto** com captura de tela real e **filtro** por Web, Python e Matemática
- 📚 Lista compacta de **estudos e exercícios**
- 🙋 **Sobre**, **objetivos atuais**, **skills** e **contato** (formulário que envia para o e-mail)
- ♿ Acessível: navegação por teclado, link "pular para o conteúdo" e respeito a "reduzir movimento"

## 📁 Estrutura

```
.
├── index.html                    # Estrutura da página
├── assets/
│   ├── css/
│   │   ├── base.css              # Cores, fontes, espaçamentos (variáveis) e reset
│   │   ├── components.css        # Botões, tags, console, cards, formulário
│   │   ├── sections.css          # Header, hero, projetos, sobre, skills, contato, footer
│   │   └── responsive.css        # Tablet e celular
│   ├── js/
│   │   ├── data/
│   │   │   ├── profile.js        # ⭐ Links (GitHub, LinkedIn, WhatsApp...)
│   │   │   └── projects.js       # ⭐ Projetos, destaque e estudos
│   │   ├── modules/
│   │   │   ├── waveform.js       # Onda sonora do console (canvas)
│   │   │   ├── console.js        # Comandos e respostas do mini JARVIS
│   │   │   ├── projects.js       # Monta destaque, cards, filtros e estudos
│   │   │   ├── navigation.js     # Menu mobile, link ativo, barra de progresso
│   │   │   └── contact-form.js   # Envio do formulário
│   │   └── main.js               # Inicializa tudo
│   └── img/
│       ├── jarlisson.jpg
│       ├── favicon.svg
│       └── projects/             # Capturas de tela dos projetos
└── README.md
```

## ✏️ Como editar

| Quero… | Onde mexer |
|---|---|
| Adicionar/editar um projeto | `assets/js/data/projects.js` (copie um bloco e preencha) |
| Trocar a imagem de um projeto | Salve em `assets/img/projects/` e use o nome no campo `image` |
| Criar um comando novo no console | Lista `COMMANDS` em `assets/js/modules/console.js` |
| Mudar cores ou fontes | Variáveis no topo de `assets/css/base.css` |
| Mudar links de contato | `assets/js/data/profile.js` e a seção Contato do `index.html` |

## 🚀 Como executar

```bash
# Opção 1: abra o index.html direto no navegador
# Opção 2: servidor local
python -m http.server 8000
# acesse http://localhost:8000
```

> O formulário usa o [FormSubmit](https://formsubmit.co). No primeiro envio chega um e-mail de ativação em britojarlisson64@gmail.com: confirme uma vez e pronto.

## 🌍 Publicar no GitHub Pages

`Settings` → `Pages` → `Deploy from a branch` → `main` / `(root)` → `Save`.

---

👤 Feito por **[Jarlisson Brito](https://github.com/Jarlisson-cpu)** · [LinkedIn](https://www.linkedin.com/in/jarlisson-brito-602909368/)

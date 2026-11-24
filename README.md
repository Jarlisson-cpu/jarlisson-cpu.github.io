# 🌊 Portfólio — Jarlisson Brito

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

Meu portfólio pessoal, publicado em **[jarlisson-cpu.github.io](https://jarlisson-cpu.github.io/)**. É uma página única em tema **preto e laranja**, com foto em destaque, serviços, stack, os projetos do GitHub com filtros, números, minha trajetória e meus contatos.
Feito com HTML, CSS e JavaScript puros: sem frameworks e sem etapa de build.

## ✨ O que tem

- 🧑‍💻 **Topo** com foto recortada, brilho laranja, cartão de código e selo de disponibilidade
- 🛠️ **Serviços**, **stack com ícones** e **números** (o total de repositórios vem ao vivo da API do GitHub)
- ⭐ **Projeto em destaque** (JARVIS) com números, captura da demo e exemplo de conversa
- 🗂️ **Cards de projeto** com captura de tela ou capa desenhada, botões **Ver online** e **Código**, selo de projeto em equipe e **filtro** por Back-end, Dados e algoritmos, Web e Python
- 📚 Lista compacta de **outros projetos e estudos**
- 🎓 **Trajetória**: formação, projetos acadêmicos em equipe, residência e comunidade
- 🙋 **Sobre**, **objetivos atuais**, **skills** e **contato** (formulário que envia para o e-mail)
- ✨ **Efeitos**: tela de abertura, letras do nome animadas, cursor personalizado, botões magnéticos, cards em 3D, parallax na foto, faixa rolando, contadores e navegação lateral por pontos (tudo desliga com "reduzir movimento")
- 🔎 SEO: meta tags Open Graph, link canônico e dados estruturados (JSON-LD)
- ♿ Acessível: navegação por teclado, link "pular para o conteúdo" e respeito a "reduzir movimento"

## 📁 Estrutura

```
.
├── index.html                    # Estrutura da página
├── assets/
│   ├── css/
│   │   ├── base.css              # Cores, fontes, espaçamentos (variáveis) e reset
│   │   ├── components.css        # Botões, tags, console, cards, formulário
│   │   ├── sections.css          # Header, hero, problemas, projetos, números, sobre, trajetória, stack, contato
│   │   ├── effects.css           # Animações e efeitos
│   │   └── responsive.css        # Tablet e celular
│   ├── js/
│   │   ├── data/
│   │   │   ├── profile.js        # ⭐ Links (GitHub, LinkedIn, WhatsApp...)
│   │   │   └── projects.js       # ⭐ Projetos, destaque e estudos
│   │   ├── modules/
│   │   │   ├── github-stats.js   # Número de repositórios ao vivo
│   │   │   ├── projects.js       # Monta destaque, cards, filtros e estudos
│   │   │   ├── navigation.js     # Menu mobile, link ativo, barra de progresso
│   │   │   ├── reveal.js         # Seções aparecem ao rolar (subir, lado, zoom, cortina)
│   │   │   ├── effects.js        # Abertura, letras, cursor, ímã, 3D, parallax, contadores, pontos
│   │   │   └── contact-form.js   # Envio do formulário
│   │   └── main.js               # Inicializa tudo
│   └── img/
│       ├── jarlisson.jpg         # Foto original (prévia de links)
│       ├── jarlisson-recorte.webp # Foto sem fundo usada no site
│       ├── favicon.svg
│       └── projects/             # Capturas de tela dos projetos
└── README.md
```

## ✏️ Como editar

| Quero… | Onde mexer |
|---|---|
| Adicionar/editar um projeto | `assets/js/data/projects.js` (copie um bloco e preencha) |
| Trocar a imagem de um projeto | Salve em `assets/img/projects/` e use o nome no campo `image` |
| Mudar cores ou fontes | Variáveis no topo de `assets/css/base.css` |
| Mudar links de contato | `assets/js/data/profile.js` e a seção Contato do `index.html` |
| Editar formação e experiência | Seção Trajetória do `index.html` |

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

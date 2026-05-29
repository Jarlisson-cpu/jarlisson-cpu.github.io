const projects = [
  {
    title: 'PORTI',
    description: 'Site em HTML com interface responsiva e navegação limpa.',
    activity: 'Desenvolvimento completo de layout e estilização.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/PORTI',
    link: 'https://github.com/Jarlisson-cpu/PORTI'
  },
  {
    title: 'ACADEMIA--RESERVAS',
    description: 'Sistema de reservas para academia com JavaScript e UX focado.',
    activity: 'Cadastro de treinos, horários e gerenciamento de alunos.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/ACADEMIA--RESERVAS',
    link: 'https://github.com/Jarlisson-cpu/ACADEMIA--RESERVAS'
  },
  {
    title: 'HAPIA-BANK',
    description: 'Projeto de banco digital com interface moderna em CSS.',
    activity: 'Criação de cards, visual de transações e estrutura de dashboard.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/HAPIA-BANK',
    link: 'https://github.com/Jarlisson-cpu/HAPIA-BANK'
  },
  {
    title: 'PROJETO-TELA',
    description: 'Interface de tela em HTML para apresentação de projeto.',
    activity: 'Layout de página e adaptação para telas modernas.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/PROJETO-TELA',
    link: 'https://github.com/Jarlisson-cpu/PROJETO-TELA'
  },
  {
    title: 'BIO-JARLISSON',
    description: 'Página pessoal com biografia e informações de contato.',
    activity: 'Estrutura de conteúdo, estilo e apresentação pessoal.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/BIO-JARLISSON',
    link: 'https://github.com/Jarlisson-cpu/BIO-JARLISSON'
  },
  {
    title: 'GITGITHUB-OFICINA-CPU',
    description: 'Projeto em Python para automação e organização de dados.',
    activity: 'Construção de scripts e documentação em Python.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/GITGITHUB-OFICINA-CPU',
    link: 'https://github.com/Jarlisson-cpu/GITGITHUB-OFICINA-CPU'
  },
  {
    title: 'DETERMINA-O-DE-MATRIZES-INVERSA-E-ADJUNTAS-E-SISTEMAS-LINEARES',
    description: 'Cálculo de matrizes inversas e resolução de sistemas lineares.',
    activity: 'Implementação de álgebra linear em Python.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/DETERMINA-O-DE-MATRIZES-INVERSA-E-ADJUNTAS-E-SISTEMAS-LINEARES',
    link: 'https://github.com/Jarlisson-cpu/DETERMINA-O-DE-MATRIZES-INVERSA-E-ADJUNTAS-E-SISTEMAS-LINEARES'
  },
  {
    title: 'meu-site',
    description: 'Site em JavaScript com navegação interativa.',
    activity: 'Desenvolvimento de recursos interativos e conteúdo online.',
    image: 'https://opengraph.githubassets.com/1/Jarlisson-cpu/meu-site',
    link: 'https://github.com/Jarlisson-cpu/meu-site'
  }
];

const container = document.getElementById('projects-container');

projects.forEach(project => {
  container.innerHTML += `
    <div class="project-card">
      <img src="${project.image}" alt="${project.title}">
      <div class="project-content">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <p class="project-activity">${project.activity}</p>
        <a class="project-link" href="${project.link}" target="_blank">Ver no GitHub</a>
      </div>
    </div>
  `;
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent = 'Mensagem já foi enviada! Obrigado pelo contato.';
      formStatus.style.color = '#49a6ff';
    }

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data?.message || 'Erro ao enviar a mensagem.');
          });
        }
        return response.json();
      })
      .then(() => {
        contactForm.reset();
      })
      .catch(() => {
        console.error('Falha no envio do formulário.');
      });
  });
}

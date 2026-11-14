# Portfólio · André Moura

Portfólio pessoal de **André Moura**, Cientista e Engenheiro de Dados e estudante de Engenharia da Computação na UFMA.

**Site:** https://andremoural.github.io/Portfolio/

## O que tem no site

- Visual futurista em laranja, com fundo de partículas animado que reage ao mouse
- Apresentação com efeito de digitação e navegação com marcação da seção atual e barra de progresso
- Seções: Sobre, Skills, Projetos, Trajetória, Publicações & Eventos, Depoimentos e Contato
- Skills e projetos com abas e filtros interativos; cartões com efeito 3D ao passar o mouse
- Botão **Baixar CV**: gera um PDF no navegador a partir dos dados do próprio site
- Responsivo (celular e desktop) e respeita a preferência de movimento reduzido do sistema

## Tecnologias

React 18 · Vite 5 · jsPDF · CSS puro · GitHub Actions e GitHub Pages

## Como rodar localmente

Requisitos: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install     # instala as dependências
npm run dev     # servidor de desenvolvimento (http://localhost:5173)
npm run build   # gera a versão final na pasta dist
npm run preview # visualiza a versão final
```

Ao baixar uma versão nova do projeto, rode `npm install` de novo antes do `npm run dev`.

## Estrutura

```
├── index.html            página base e fontes
├── public/               imagens, ícone e relatório em PDF
├── src/
│   ├── App.jsx           componentes e interações
│   ├── data.js           todos os textos e dados do portfólio
│   ├── cv.js             gerador do currículo em PDF
│   ├── styles.css        estilos e animações
│   └── main.jsx
└── .github/workflows/    publicação automática
```

## Como editar o conteúdo

Quase tudo fica em [`src/data.js`](src/data.js): perfil, links, skills, projetos, trajetória, publicações e depoimentos. Alterando esse arquivo, o site e o PDF do currículo são atualizados juntos.

## Publicação

O site é publicado automaticamente pelo GitHub Actions a cada push na branch `main`.
Configuração necessária uma única vez: **Settings → Pages → Source: GitHub Actions**.

## Licença e uso

O código pode servir de referência para estudo. Textos, fotos, depoimentos e demais dados pessoais pertencem a André Moura e não devem ser reutilizados sem autorização.

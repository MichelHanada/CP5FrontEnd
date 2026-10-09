# TechFlow Dev

Dashboard responsivo da TechFlow com identidade visual tech/DevOps: fonte monoespaçada, fundo em grade, paleta ciano e verde terminal.

## Integrantes

- Michel Tatsuya Hanada — RM 571987
- Marcos Vinicius Serafim Tudisco Mendes — RM 569366
- Felipe Ilek Felice — RM 571322

## Tecnologias

HTML5, Tailwind CSS v3 compilado via CLI (`darkMode: 'class'`), JavaScript puro, Google Fonts (JetBrains Mono).

## Principais recursos

- Navbar, sidebar fixa no desktop e off-canvas no mobile, busca em tempo real, dropdown do usuário
- 4 cards de indicadores e 6 cards de projetos em CSS Grid com `col-span-*` e `row-span-*`
- Modal de novo projeto com validação visual (erro/sucesso), botão `disabled` até o formulário ser válido e prioridade com `peer-checked:`
- Cards com `group-hover:` (ícone, seta), `hover:`, `focus:`, `active:` e transições
- Tema Light | Dark | System com `dark:`, `matchMedia` e `localStorage`, sem flash ao carregar
- Mobile-First com `sm:`, `md:`, `lg:`, `xl:` e `2xl:`; ESC fecha menus e modal

## Como gerar o CSS

```bash
npm install
npm run build
```

O comando compila `css/input.css` em `css/styles.css`. Rode novamente após editar classes no HTML ou no JS (ou use `npm run dev` para recompilar automaticamente).

## GitHub

https://github.com/MichelHanada/CP5FrontEnd

## Dificuldades encontradas

A parte mais difícil do projeto foi configurar o Tailwind para gerar o nosso próprio arquivo CSS, em vez de usar o CDN. Quando abrimos a página pela primeira vez, ela veio completamente sem estilo, só com texto preto e links azuis. No começo não entendemos o motivo, até percebemos que o styles.css não vem pronto: Ele precisa ser gerado pelo Tailwind a partir do input.css.
Quando fomos rodar o npm install, deu erro de package.json não encontrado. Ficamos um tempo sem entender, porque o arquivo estava no projeto. Depois descobrimos que, ao extrair o zip, o Windows criou uma pasta dentro de outra, e o terminal estava aberto na pasta de fora. Também tentamos rodar rpm run dev sem que esse script existisse ainda, o que complicou mais a situação.
Resolvemos usando ls e cd para achar a pasta certa e abrindo no VS Code a pasta que continha o package.json. Depois configuramos o tailwind.config.js para ler o HTML e o JS, e rodamos o npm run build e o npm run dev para o CSS ser compilado a cada alteração.
No fim, aprendemos como o Tailwind funciona por trás do CDN, para que serve o build e por que a organização das pastas importa. Também ficou claro que, no terminal, é preciso conferir sempre em qual pasta estamos antes de rodar um comando.
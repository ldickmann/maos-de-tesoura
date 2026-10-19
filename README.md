# 💈 Mãos de Tesoura

Site de uma barbearia com catálogo de serviços, páginas institucionais e agendamento online em etapas. É só front-end: os dados ficam em stores locais e nada é enviado para um servidor.

[![Vue.js](https://img.shields.io/badge/Vue.js_3-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)](LICENSE.txt)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

**Site publicado:** https://ldickmann.github.io/maos-de-tesoura/

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
- [Scripts](#scripts)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Estilos e tokens de design](#estilos-e-tokens-de-design)
- [Acessibilidade](#acessibilidade)
- [Deploy](#deploy)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Limitações conhecidas](#limitações-conhecidas)
- [Próximos passos](#próximos-passos)
- [Documentação](#documentação)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

| Rota           | Página      | O que oferece                                                                             |
| -------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `/`            | Home        | Banner, serviços em destaque, números da casa, equipe, depoimentos e chamada para agendar |
| `/servicos`    | Serviços    | Catálogo com preço, duração e detalhes de cada serviço                                    |
| `/about`       | Sobre       | História, valores, equipe e missão                                                        |
| `/contato`     | Contato     | Formulário validado, informações de contato, localização e perguntas frequentes           |
| `/booking`     | Agendamento | Etapas: serviço escolhido, profissional, data e horário, dados do cliente e confirmação   |
| qualquer outra | 404         | Página de rota inexistente                                                                |

Também há notificações (toasts) globais, título da aba por página e newsletter no rodapé.

## Tecnologias

- [Vue 3](https://vuejs.org/) com `<script setup>` e Composition API
- [Vue Router 4](https://router.vuejs.org/), em modo history
- [Pinia 3](https://pinia.vuejs.org/) para o estado: serviços, agendamento, conteúdo e notificações
- [Vite 6](https://vite.dev/) para o servidor de desenvolvimento e o build
- [Sass](https://sass-lang.com/), com módulos `@use`/`@forward`
- [Font Awesome 6](https://fontawesome.com/) e Google Fonts (Archivo Black, Bungee Hairline e Hanken Grotesk), carregados por CDN no `index.html`
- [Prettier](https://prettier.io/) para formatação e [ESLint](https://eslint.org/) com `eslint-plugin-vue` (veja as [limitações](#limitações-conhecidas))

## Começando

### Pré-requisitos

- **Node.js** 18, 20 ou 22 ou mais recente (exigência do Vite 6)
- **Yarn 1.22**: a versão está fixada em `packageManager` no `package.json`. Com o Corepack, basta rodar `corepack enable`.

### Instalação

```bash
git clone https://github.com/ldickmann/maos-de-tesoura.git
cd maos-de-tesoura
yarn install
yarn dev
```

Abra **http://localhost:5173/maos-de-tesoura/**. O caminho `/maos-de-tesoura/` é a `base` do Vite, a mesma do GitHub Pages, e também vale no desenvolvimento.

O projeto não usa variáveis de ambiente.

## Scripts

| Comando        | O que faz                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `yarn dev`     | Servidor de desenvolvimento com recarga automática                                                                       |
| `yarn build`   | Gera o build de produção em `dist/`                                                                                      |
| `yarn preview` | Serve o `dist/` localmente para conferir o build                                                                         |
| `yarn deploy`  | Roda o build e publica o `dist/` na `gh-pages` à mão; o workflow faz isso a cada push na `main` (veja [Deploy](#deploy)) |
| `yarn format`  | Formata `src/` com o Prettier                                                                                            |
| `yarn lint`    | Roda o ESLint com `--fix`. Hoje falha (veja as [limitações](#limitações-conhecidas))                                     |

Para conferir a formatação sem alterar arquivos: `npx prettier --check src/`.

## Estrutura do projeto

```
├── index.html                 # HTML base: fontes, ícones e ponto de montagem
├── vite.config.js             # base do Pages, alias @ → src e tokens injetados no Sass
├── docs/
│   ├── assinatura/            # capturas da assinatura de autoria
│   └── ux-audit/              # auditoria de UI/UX, plano de execução e capturas antes/depois
└── src/
    ├── main.js                # cria o app e registra Pinia e Router
    ├── App.vue                # layout: link de pular, header, <main>, rodapé, assinatura e toasts
    ├── router/index.js        # rotas e título da aba por rota
    ├── views/                 # uma tela por rota (Home, Serviços, Sobre, Contato, Agendamento, 404)
    ├── components/
    │   ├── layouts/           # HeaderFloating e FooterComponent
    │   └── *.vue              # banner, toasts, spinner, mensagem de erro e assinatura
    ├── stores/                # services, booking, content e notification (Pinia)
    ├── utils/                 # validation.js (formulários e telefone) e format.js (preço em BRL)
    └── assets/
        ├── images/            # banners (Home e Sobre) e foto provisória da equipe
        └── styles/
            ├── main.scss      # ponto de entrada global
            └── scss/          # tokens, reset, mixins, botões e formulários
```

## Estilos e tokens de design

Os estilos globais entram por `src/assets/styles/main.scss`:

| Arquivo           | Conteúdo                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `_variables.scss` | Tokens: cores da marca, texto, superfícies, bordas, raios, sombras, tamanhos de fonte, durações, layout, breakpoints e z-index |
| `_base.scss`      | Reset, fonte do `body`, anel de foco, `prefers-reduced-motion`, `.sr-only` e link de pular                                     |
| `_mixins.scss`    | `down($bp)` e `up($bp)` para media queries, `container` e `on-dark-surface`                                                    |
| `_buttons.scss`   | `.btn` e variantes: `--primary`, `--outline`, `--outline-light`, `--on-accent`, `--whatsapp` e `--lg`                          |
| `_forms.scss`     | `.form-label`, `.form-input`, `.form-select`, `.form-textarea`, `.form-input--dark` e `.form-error`                            |

Nos componentes, importe os tokens e os mixins com namespace:

```scss
<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

.card {
  padding: 1.5rem;
  border-radius: var.$radius-lg;
  box-shadow: var.$shadow-md;

  @include mx.down(var.$bp-md) {
    padding: 1rem;
  }
}
</style>
```

Convenções:

- **Cores e medidas vêm dos tokens.** Hex no CSS dos componentes fica só para cores de marcas de terceiros (GitHub, LinkedIn, Instagram e WhatsApp) e para a assinatura de autoria, que tem estilo próprio.
- **Botões usam `.btn` com um modificador**, e campos usam as classes `.form-*`. O CSS do componente cuida só do que é próprio da tela, como padding e largura.
- **Contraste mínimo:** 4,5:1 para texto, 3:1 para texto grande e para bordas de campos.
- **Transições** listam as propriedades animadas. Não use `transition: all`.

## Acessibilidade

- Link "Pular para o conteúdo" e `<main>` com foco programático
- Anel de foco visível em todos os elementos interativos (`:focus-visible`)
- Notificações em região `aria-live`, e erros de formulário ligados aos campos por `aria-describedby` e `aria-invalid`
- Opções do agendamento como `<button>` com `aria-pressed`
- Alvo de toque de 44×44px no botão do menu mobile e no fechar das notificações, e de pelo menos 24px de altura nos links de texto
- Animações reduzidas quando o sistema pede `prefers-reduced-motion`
- Título da aba atualizado a cada rota

Os achados, as decisões e as verificações estão em [`docs/ux-audit/`](docs/ux-audit/).

## Deploy

O site é servido pelo **GitHub Pages** a partir da branch `gh-pages`.

**O deploy é automático.** Cada push na `main`, inclusive o merge de um PR, roda o workflow [`Deploy no GitHub Pages`](.github/workflows/deploy.yml). Ele:

1. instala as dependências com `yarn install --frozen-lockfile`;
2. roda `yarn build`;
3. publica o `dist/` na `gh-pages` com o pacote [`gh-pages`](https://github.com/tschaub/gh-pages).

Em seguida, o GitHub Pages leva cerca de 1 minuto para publicar.

- Para publicar de novo sem um commit novo, use **Actions → Deploy no GitHub Pages → Run workflow**.
- Para publicar da sua máquina, rode `yarn deploy` na `main`. Ele faz o mesmo build e a mesma publicação.
- A publicação **substitui todo o conteúdo** da branch `gh-pages` pelo `dist/` atual.
- Se o repositório mudar de nome, ajuste a `base` em `vite.config.js`.

## Fluxo de trabalho

1. Crie uma branch a partir da `develop` (`feat/...`, `fix/...`, `docs/...`).
2. Antes de abrir o PR, rode `yarn build` e `yarn format`.
3. Abra o PR para a `develop`.
4. Para lançar uma versão, abra um PR da `develop` para a `main`. O merge dispara o [deploy](#deploy).

As mensagens de commit seguem o padrão `tipo: descrição` (`feat`, `fix`, `style`, `docs`, `refactor`), como no histórico.

## Limitações conhecidas

- **Sem backend.** Os serviços vêm de dados locais, com 1s de atraso simulado. Contato, newsletter e agendamento não enviam nada.
- **O agendamento não chega à confirmação.** A etapa 4 não tem botão de envio, e a etapa 5 lê uma propriedade que a store não tem (bugs B1 e B2).
- **Recarregar uma rota interna no GitHub Pages dá 404** (B16). O Pages não tem fallback para SPA. Abra o site pela raiz e navegue pelos links.
- **`yarn lint` falha** com `Cannot find module 'vue-eslint-parser'`. Desde a versão 10, o `eslint-plugin-vue` pede essa dependência à parte, e ela ainda não está no `package.json`.

A lista completa, com 19 bugs funcionais e as atualizações de dependências, está nas seções 14 e 15 da [auditoria](docs/ux-audit/AUDIT.md).

## Próximos passos

- [ ] Corrigir o fluxo de agendamento (bugs B1 a B6 da auditoria)
- [ ] Fallback de SPA no GitHub Pages (`404.html`) ou troca para `createWebHashHistory`
- [ ] Integração com backend (API)
- [ ] Autenticação de usuários e perfil do cliente com histórico
- [ ] Área administrativa para os profissionais
- [ ] Avaliações e pagamento online

## Documentação

- [`docs/ux-audit/AUDIT.md`](docs/ux-audit/AUDIT.md): auditoria de UI/UX, com 93 achados, 19 bugs e o fechamento da execução
- [`docs/ux-audit/PLAN.md`](docs/ux-audit/PLAN.md): plano de correções, decisões e resultado de cada item
- `docs/ux-audit/screenshots/`: capturas antes e depois a 1440, 768 e 390px, com `metrics.json`

## Contribuição

Issues e pull requests são bem-vindos. Siga o [fluxo de trabalho](#fluxo-de-trabalho) e as [convenções de estilo](#estilos-e-tokens-de-design).

## Licença

Distribuído sob a licença MIT. Veja [`LICENSE.txt`](LICENSE.txt).

---

Desenvolvido por [Lucas E. Dickmann](https://www.linkedin.com/in/lucasdickmann/).

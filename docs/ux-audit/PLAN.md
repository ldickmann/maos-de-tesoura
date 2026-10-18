# Plano de correções de UI/UX — Mãos de Tesoura

- **Auditoria:** [`AUDIT.md`](./AUDIT.md). Os IDs entre parênteses (T1, C3…) remetem a ela.
- **Commit base:** `d6a5aea`. **Aprovado em:** 2026-10-18.
- **Identidade que fica:** a paleta de `_variables.scss`, as fontes Archivo Black, Bungee Hairline e Hanken Grotesk, e o logo tipográfico.

## Decisões (2026-10-18)

- **Itens ⚠ aprovados:**
  - Hanken Grotesk no `body` (1.3);
  - a mesma fonte no menu mobile e no desktop (2.5);
  - fundo `#212121` no botão do CTA final da Home (3.2);
  - 2 colunas no tablet (3.2, 3.3);
  - véu escuro no topo da página Sobre (3.4).
- **Saiu do "fica de fora" e entrou na execução:** texto **`#212121` nos botões laranja** (C1).
  - **O que conta como "botão laranja":**
    - todo `<button>` ou link com aparência de botão com fundo laranja;
    - os estados *selecionado* de profissional e horário no agendamento;
    - o *hover* dos botões outline, que hoje preenchem de laranja.
  - **O que não conta:**
    - superfícies laranja que não são botão, como o título e o texto da seção CTA da Home, os cards de números da Sobre e a etiqueta "Desde 2009" (C11);
    - texto laranja sobre fundo claro (C2).

    Esses casos continuam em F1.
  - **Regra de hover:**
    - Com texto `#212121`, o fundo do botão não pode ficar mais escuro que `$btn-primary-hover` (#e66b32, 4,99:1).
    - O escurecimento atual reprovaria: `color.adjust($btn-primary-hover, $lightness: -5%)` = #e35b1c dá 4,43:1, e #d55a22 dá 4,08:1.
- **Continua fora:** todo o resto da tabela "Fica de fora", incluindo os **19 bugs funcionais** (B1–B19).
- **Screenshots "antes":** a sessão de execução tira as capturas (item 0.2) **antes de editar qualquer arquivo**.

## Como usar este checklist

- **Ordem:** preparação → tokens e base global → componentes base → telas → verificação ponta a ponta. Marque `[x]` ao concluir cada item.
- **Efeito visual:**
  - **nenhum:** o pixel não muda;
  - **sutil:** só se percebe lado a lado;
  - **visível:** se nota sem comparar. Os itens visíveis já foram aprovados nas decisões acima.
- **Regras de escopo:**
  - Não corrigir bugs funcionais (B1–B19). Se um item de UI encostar em um deles, o comportamento atual fica como está; o item cita o bug quando isso acontece.
  - Não adicionar, remover nem atualizar dependências.
- **Estado inicial conhecido**, medido em `d6a5aea`:
  - **Lint:** `npx eslint .` **não roda** (`Cannot find module 'vue-eslint-parser'`, dependência par ausente). Resolver exige adicionar uma dependência, que está fora do escopo (F10).
  - **`yarn lint`:** aplica `--fix`; não usar como verificação.
  - **Formatação:** `npx prettier --check src/` só acusa `src/stores/services.js`, que este plano não toca.
  - **Ícones:** a rede da sessão da auditoria bloqueava `cdnjs.cloudflare.com` (Font Awesome) e `cdn.materialdesignicons.com`. O script do Apêndice B aborta esses requests de propósito.
- **Commits:** sugestão de um commit por item, citando os IDs, por exemplo `style: unificar botões (K1, K2, R1, C1)`.

---

## Entra na execução

### Fase 0 — Preparação (antes de editar qualquer arquivo)

- [ ] **0.1 Ambiente**
  - Rodar `yarn install --frozen-lockfile` e `yarn dev --port 5173 --strictPort`. O app abre em `http://localhost:5173/maos-de-tesoura/`.
  - **Verificar:** a Home abre no navegador.
- [ ] **0.2 Capturas "antes"**
  - Gravar o script do Apêndice B fora do repositório, por exemplo em `/tmp/capturas.cjs`.
  - Rodar `node /tmp/capturas.cjs docs/ux-audit/screenshots/antes`.
  - Telas: Home, Serviços, Sobre, Contato, Agendamento vazio, Agendamento preenchido até a etapa 4 e 404, em 1440, 768 e 390, mais o menu mobile em 768 e 390.
  - **Verificar:** 41 PNG e o `metrics.json` na pasta. Os nomes batem com as evidências da `AUDIT.md`: `home-1440.png`, `home-1440-dobra.png` e assim por diante.
- [ ] **0.3 Linha de base das contagens**
  - Rodar `yarn build` e o script do Apêndice A da `AUDIT.md`.
  - **Verificar:** a saída é igual à registrada na auditoria.

### Fase 1 — Variáveis, tokens e base global

- [ ] **1.1 Pipeline SCSS** (D1, D2, D6). Efeito: **nenhum**.
  - **Arquivos:** `vite.config.js`, `src/assets/styles/main.scss`, `scss/_typography.scss`, `scss/_base.scss`, e os 11 arquivos com `@use 'sass:color'` sem uso.
  - **O que muda:**
    - O `additionalData` deixa de injetar `typography` e `base`. Todos os componentes já fazem `@use '@/assets/styles/scss/_variables.scss' as var`.
    - `_typography.scss` para de redeclarar as fontes, e `_base.scss` passa a ler as variáveis de `_variables.scss`.
    - O reset é emitido uma vez, via `main.scss`.
    - Sai o `@use 'sass:color'` onde não há `color.*(`.
  - **Verificar:**
    - `yarn build` passa;
    - no Apêndice A, "reset no build" dá **1** e "sass:color sem uso" dá **0**;
    - `compare -metric AE antes/X.png depois/X.png null:` dá 0 nas telas. Diferença só em toast ou spinner em movimento é aceitável.

- [ ] **1.2 Tokens em `_variables.scss`** e mixins em um novo `_mixins.scss` (D3, D4, E1, E3, E12, R2, S1, T5, A2, RS3). Efeito: **nenhum** nesta etapa. Os tokens são usados nas fases seguintes, preservando os valores.
  - **O que muda:** criar tokens só com valores que já existem no código.
    - **Texto:**
      - `$text-muted: #5a6268` (hoje é `$btn-secondary-hover`);
      - `$text-on-dark-muted: #b0b0b0` (vem do rodapé).
    - **Superfícies:** `$surface-dark-2: #2c2c2c`.
    - **Botões:**
      - `$btn-primary-text: $primary`, a decisão do C1;
      - `$btn-on-accent-bg: $primary`;
      - `$btn-on-accent-hover: $tertiary`;
      - `$gradient-primary: linear-gradient(135deg, $secondary 0%, $btn-primary-hover 100%)`;
      - **não criar** token de hover mais escuro que `$btn-primary-hover`.
    - **Raios:** `$radius-sm` (4px), `$radius-md` (8px), `$radius-lg` (12px), `$radius-xl` (16px), `$radius-2xl` (20px) e `$radius-pill`.
    - **Sombras:** quatro níveis com as geometrias mais usadas: `$shadow-sm` (0 4px 15px), `$shadow-md` (0 10px 30px), `$shadow-lg` (0 20px 40px) e `$shadow-accent` (laranja).
    - **Tipografia:** escala em rem com os tamanhos existentes.
    - **Movimento:** `$duration-fast: .2s`, `$duration-base: .3s` e `$ease: ease`.
    - **Layout:** `$container-max: 1440px`, `$container-pad: 2rem` / `1rem`, `$header-height: 89px` e `$header-height-mobile: 76px`. As alturas são as medidas; o header passa a usar `min-height` com esses tokens.
    - **Breakpoints:** `$bp-sm: 480px`, `$bp-md: 768px` e `$bp-lg: 968px`, com os mixins `down($bp)` e `up($bp)`.
    - **z-index:** `$z-menu: 999`, `$z-header: 1000` e `$z-toast: 9999`.
  - **Verificar:** `yarn build` passa, e os arquivos ainda não importam os novos tokens.

- [ ] **1.3 Base global em `_base.scss`** (T1, T2, ST1, A1).
  - **O que muda:**
    - **visível, aprovado:** o `body` passa a `$font-family-tertiary` (Hanken Grotesk). Os títulos da 404 recebem Archivo Black explicitamente (3.7); o `h3` do rodapé já define a própria fonte (`FooterComponent.vue:325`).
    - **sutil:** `button, input, select, textarea { font: inherit; }`. O botão do header herda a Bungee Hairline que o wrapper já define (`HeaderFloating.vue:217`).
    - **sutil:** `:focus-visible` global com `outline: 2px solid $primary` e `outline-offset: 2px`.
      - Em superfícies escuras (header, menu mobile, rodapé, 404, seções `$primary`/gradiente cinza), o anel usa `$accent-light`.
      - Nos inputs, o outline volta e a borda laranja de foco continua.
    - **nenhum:** `@media (prefers-reduced-motion: reduce)` zera `transition-duration`, `animation-duration` e `animation-iteration-count`, e põe `scroll-behavior: auto`.
      - Os dois `window.scrollTo({ behavior: 'smooth' })` (`HeaderFloating.vue:88`, `FooterComponent.vue:253`) passam a usar `'auto'` quando `matchMedia('(prefers-reduced-motion: reduce)').matches`.
    - **nenhum:** cria-se o utilitário `.sr-only`.
  - **Verificar:**
    - Nas capturas da Home e da 404, o corpo aparece em Hanken; a métrica `bodyFont` começa com "Hanken Grotesk".
    - Com Tab em todas as telas, o anel aparece no claro e no escuro.
    - Playwright com `reducedMotion: 'reduce'`: o `transitionDuration` do card de serviço dá `0s`.

### Fase 2 — Componentes base

- [ ] **2.1 Botões compartilhados**, em um novo `scss/_buttons.scss` importado uma vez em `main.scss` (K1, K2, R1, E6, ST9, C1, C9, D4).
  - **Classes:**
    - **`.btn` (base):** `border: none`, `cursor: pointer`, `display: inline-flex`, `align-items` e `justify-content: center`, `gap`, `$radius-md` (8px), estados `:active` e `:disabled` (`opacity .6`, `cursor: not-allowed`) e foco da 1.3.
    - **`.btn--primary`:**
      - fundo `$gradient-primary`;
      - **texto `$btn-primary-text` (#212121)**, que dá 6,26:1 no início do gradiente e 4,99:1 no fim;
      - hover com fundo sólido `$btn-primary-hover` (4,99:1), sem escurecer além disso.
    - **`.btn--outline`:** borda e texto laranja como hoje (o contraste do texto laranja está em F1). No hover, fundo `$secondary` e **texto #212121**.
    - **`.btn--outline-light`:** o botão do hero, mantido como está; o hover já usa #212121.
    - **`.btn--on-accent`:** fundo `$btn-on-accent-bg` (#212121), texto `$accent-light` (16,1:1) e hover `$btn-on-accent-hover`. Uso no CTA da Home (3.2).
    - **`.btn--whatsapp`:** mantém o verde e o texto branco atuais (F2).
    - **`.btn--lg`:** tamanho maior.
  - **Onde aplicar** (e remover o CSS de botão duplicado de cada arquivo):
    - **componentes:** `HeaderFloating.vue` (`.btn-accent` e `.mobile-btn-accent`), `BannerComponent.vue`, `FooterComponent.vue` (newsletter), `ErrorMessage.vue`;
    - **views:** `HomeView.vue` (`.service-btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline-primary`, `.btn-whatsapp`), `ServicosView.vue` (`.details-button`, `.book-button`, `.cta-button`), `AboutView.vue` (`.btn-primary`, `.btn-secondary`), `ContatoView.vue` (`.submit-btn`, `.map-link`), `BookingView.vue` (`.btn-primary` do estado vazio), `NotFoundView.vue`.
  - **Efeito:**
    - **visível, aprovado:** os botões laranja passam a ter texto #212121;
    - **sutil:** o raio dos botões unifica em 8px (hoje há 4, 8 e 12), some a borda nativa dos CTAs de Serviços e Sobre, e os rótulos ficam centralizados nos botões de largura total.
  - **Verificar:**
    - capturas antes × depois;
    - recalcular o contraste de cada botão, em repouso e em hover, e todos dão ≥ 4,5:1 (exceto o WhatsApp, em F2);
    - a 390, "Nossa História", "Fale Conosco" e "Inscrever" ficam centralizados;
    - nenhum `<button>` mostra a borda nativa;
    - `grep -rn 'color.adjust' src` não encontra nada;
    - `#d55a22` some.

- [ ] **2.2 Campos de formulário**, em um novo `scss/_forms.scss` (K3, K4, R3, C6, AC11).
  - **O que muda:**
    - Entram as classes `.form-label`, `.form-input`, `.form-select`, `.form-textarea` e `.form-error`, mais a variante escura da newsletter.
    - O select ganha `appearance: none`, fundo branco e uma seta só (o SVG atual).
    - Placeholder em `$text-gray` (4,69:1); no escuro, `$text-on-dark-muted` sobre #333 (5,83:1).
    - Os rótulos ficam sem ":", como no Contato.
    - A newsletter ganha um `<label class="sr-only">`.
    - A cor da borda dos campos **não muda** (F3).
  - **Arquivos:** `ContatoView.vue`, `BookingView.vue` e `FooterComponent.vue`.
  - **Efeito:** sutil.
  - **Verificar:**
    - a captura do Contato mostra uma seta só no select;
    - os contrastes dos placeholders foram recalculados;
    - a newsletter tem `<label for>` ligado ao campo.

- [ ] **2.3 NotificationSystem** (RS1, RS2, AC6, ST8, A5, T5).
  - **O que muda:**
    - **Posição:**
      - o contêiner fica em `top: calc($header-height + 12px)` (e o equivalente mobile);
      - no mobile usa `left`/`right` sem `width: 100%`;
      - `z-index: $z-toast`.
    - **Leitores de tela:** cada toast leva `role="status"` e `aria-live="polite"`; o tipo `error` usa `role="alert"`.
    - **Botão fechar:** área de 44×44 (o "×" continua do mesmo tamanho) e cor `$text-gray`.
    - **Animação:** o contêiner fica sempre montado (sai o `v-if`), então o último toast anima a saída.
    - **Tipografia:** tamanhos em rem e Hanken herdada do `body`.
  - **Efeito:** sutil; o toast desce para baixo do header.
  - **Verificar:**
    - `overflowers` vazio a 390 e 768;
    - na captura do agendamento vazio, o toast não cobre o header;
    - os `role` aparecem no DOM.

- [ ] **2.4 LoadingSpinner e ErrorMessage** (ST5, AC9, T5).
  - **O que muda:**
    - O spinner ganha `role="status"` e `aria-live="polite"`, com tamanho em rem; com movimento reduzido, a rotação para e o texto fica.
    - O ErrorMessage ganha `role="alert"`, título em `h2` com o mesmo estilo e os botões da 2.1.
  - **Efeito:** nenhum.
  - **Verificar:** inspeção do DOM.

- [ ] **2.5 Header** (AC3, AC4, AC14, K5, K6, E2, E3, RS4, A4, A2).
  - **O que muda:**
    - **Hambúrguer:**
      - `aria-label` alterna entre "Abrir menu" e "Fechar menu";
      - `aria-expanded` e `aria-controls` apontam para o menu;
      - área de toque de 44×44 (o desenho continua com 25px).
    - **Fechamento:** o menu fecha com **Esc** e quando a rota muda (`watch` em `route.fullPath`). Fechar ao clicar fora é o B19 e fica fora.
    - **Logo:**
      - vira **um link só** em volta das duas linhas, com o mesmo handler `navigateToSection('home')`;
      - o `href="#"` continua (o `#` na URL é o B11, fora do escopo).
    - **Menu mobile:**
      - **visível, aprovado:** os links passam a usar `$font-family-secondary`, como no desktop;
      - "Home" aparece ativo;
      - `top: $header-height-mobile`;
      - fica escondido acima de 968px.
    - **Limpeza:**
      - sai a transição morta do menu;
      - `transition: all` vira propriedades específicas.
    - **Contêiner:** o toolbar passa a `$container-max`, alinhando o logo com o conteúdo.
  - **Verificar:**
    - na métrica do Apêndice B, `abertoAposEsc` dá 0, `toggleAria` vem preenchido e `menuTop` é igual a `headerBottom`;
    - o alvo do botão mede ≥ 44×44;
    - com Tab, o logo é uma parada só.

- [ ] **2.6 Rodapé** (E8, AC7, AC9, AC12, AC13, AC14, D5).
  - **O que muda:**
    - **Alinhamento:** redes sociais e bloco de contato centralizados a partir do mesmo breakpoint dos títulos (≤ 968).
    - **Links:**
      - telefone com `tel:` e e-mail com `mailto:`, no mesmo estilo;
      - `rel="noopener noreferrer"` nos externos;
      - altura mínima de 24px.
    - **Títulos:** os níveis se ajustam sem mudar o estilo.
    - **Acessibilidade:** `aria-hidden` nos ícones.
    - **Limpeza:** sai o CSS morto de `:392-411`.
  - **Efeito:** sutil a 768.
  - **Verificar:** capturas a 768 e 390; `smallTargets` sem itens do rodapé abaixo de 24px de altura.

### Fase 3 — Telas

- [ ] **3.1 App e roteador** (AC2, AC10, D8). Efeito: **nenhum**.
  - **Arquivos:** `App.vue`, `router/index.js` e `HomeView.vue`.
  - **O que muda:**
    - O `<RouterView>` fica dentro de `<main id="conteudo" tabindex="-1">`.
    - Entra o link "Pular para o conteúdo", que só aparece no foco.
    - O `<main>` da Home vira `<div>`.
    - Cada rota ganha `meta.title`, aplicado por um `router.afterEach` (sem `scrollBehavior`, que é o B12).
    - Sai o `<style scoped></style>` vazio.
  - **Verificar:**
    - na métrica `main` do Apêndice B, cada página tem 1;
    - `document.title` muda ao navegar;
    - o primeiro Tab mostra o link de pular.

- [ ] **3.2 Home e Banner** (C3, H2, C4, E4, E7, E9, E10, ST2, ST3, AC1, AC7, AC8, AC12, AC15, TX1, TX6, RS3, D5).
  - **Banner:**
    - o título do topo vira `<h1>`, com o mesmo estilo;
    - `alt=""` na imagem decorativa.
  - **visível, aprovado — CTA final:**
    - "Agendar Horário" usa `.btn--on-accent` (fundo #212121);
    - o título e o texto da seção continuam brancos sobre laranja (C11, F1).
  - **visível, aprovado — tablet:** o breakpoint de celular dos grids passa a `max-width: 767px`, então a 768 os cards ficam em 2 colunas (serviços, equipe e depoimentos).
  - **Layout:**
    - **cards de serviço:** `display: flex; flex-direction: column`, com preço e botão empurrados para baixo;
    - **números sobre a foto:** ficam estáticos em ≤ 768;
    - **CTA no mobile:** sai o conflito de especificidade, e os dois botões ficam com a mesma largura.
  - **Carregamento:** enquanto `servicesStore.isLoading`, aparece o `LoadingSpinner`, com a altura da grade reservada. A store não muda.
  - **Preços:** o novo `src/utils/format.js` traz `formatPrice()` com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`, que dá "R$ 25,00".
  - **Hover em itens não clicáveis:**
    - equipe e depoimentos perdem o efeito de "levantar";
    - as estrelas perdem a escala;
    - as tags de especialidade perdem a troca de cor (`HomeView.vue:707-711`).
  - **Depoimentos:** as aspas literais saem e fica só a decorativa; as estrelas ganham `role="img"` e `aria-label="5 de 5 estrelas"`.
  - **Acessibilidade:**
    - `aria-hidden` nos ícones;
    - `rel="noopener noreferrer"` no WhatsApp.
  - **Cor dos subtítulos:** os subtítulos de seção passam a `$text-muted` (5,89:1).
  - **Limpeza:**
    - saem as media queries duplicadas, a regra morta `HomeView.vue:406-408` e o código morto de `LineComponent.vue` (`:27-37`, `:49-57`);
    - o card de serviço continua sendo uma `div` clicável (B9, fora do escopo).
  - **Verificar:**
    - capturas nas 3 larguras;
    - `h1` dá 1;
    - o botão do CTA final aparece com fundo escuro;
    - os preços usam vírgula;
    - os cards alinham;
    - a 768 há 2 colunas;
    - a altura da seção de serviços em t=0 é igual à de t=2s (sem pulo).

- [ ] **3.3 Serviços** (C4, E1, E5, E10, ST2, A3, AC9, K2, TX1, D3, D5).
  - **O que muda:**
    - **Botões:**
      - "Ver Detalhes" fica numa linha só (`white-space: nowrap` e base flexível);
      - o CTA passa à classe base da 2.1.
    - **Animação:** `animation-fill-mode: both` no `fadeInUp`.
    - **Títulos:** os títulos dos cards viram `h2`, com o mesmo estilo.
    - **Hover:** o `.info-card` perde o efeito de "levantar".
    - **Layout:**
      - **visível, aprovado:** 2 colunas a 768;
      - o topo compensa o header com o token.
    - **Preço:** usa `formatPrice()`.
    - **Cor:** o subtítulo passa a `$text-muted`.
    - **Limpeza:** os literais viram tokens; sai a regra morta `:499-502`.
  - **Verificar:**
    - capturas nas 3 larguras;
    - `grep -cE '#[0-9a-fA-F]{3,6}' src/views/ServicosView.vue` cai para perto de 0.

- [ ] **3.4 Sobre** (H1, C9, ST2, AC8, K2, D3).
  - **visível, aprovado — véu escuro:** o `.hero-overlay` passa a `position: absolute; inset: 0`, com `background: linear-gradient(to top, rgba($primary, .7), rgba($primary, .35))`, como o Banner da Home.
  - **Cores:**
    - os números do topo saem de #e67e22 e vão para `$secondary`;
    - os cards de números laranja ficam como estão (C11, F1).
  - **Botões:**
    - o CTA "Agendar Horário" usa `.btn--primary`;
    - "Nos Visite" usa `.btn--outline`.
  - **Equipe:** os cards perdem o efeito de "levantar".
  - **Imagem:** `alt=""` na ilustração.
  - **Limpeza:** os literais viram tokens.
  - **Verificar:**
    - recorte ampliado do topo antes × depois;
    - recalcular o contraste de título, números e rótulos sobre o pior trecho do véu;
    - a 390, o título não encosta nas bordas.

- [ ] **3.5 Contato** (E1, ST2, ST4, ST7, AC7, AC12, AC13, D3).
  - **Header:** o topo compensa o header com o token, sem a faixa de 12px.
  - **Envio:**
    - o formulário **não some**: campos e botão ficam `disabled`, com o "Enviando..." que já existe no template;
    - a espera simulada continua igual.
  - **Erros:**
    - cada campo ganha `aria-invalid` e `aria-describedby` ligado à mensagem;
    - a mensagem ganha `role="alert"`;
    - o foco vai ao primeiro campo com erro;
    - a validação não muda (o assunto continua sem validar, B15).
  - **Links:**
    - telefone e e-mail clicáveis;
    - `rel` nos externos.
  - **FAQ:** perde o efeito de "levantar".
  - **Limpeza:** os literais viram tokens.
  - **Verificar:**
    - a 390 e 768 não há faixa clara entre o header e o topo;
    - num envio inválido, o foco vai ao primeiro erro e o leitor anuncia a mensagem;
    - num envio válido, o form continua visível com o botão desabilitado.

- [ ] **3.6 Agendamento** (AC5, C1, C9, ST6, ST7, E1, K4, TX1, D3).
  - **Seleção:**
    - os cards de profissional e os horários viram `<button type="button">`, com `aria-pressed`, as mesmas classes e o mesmo visual;
    - a lógica de seleção não muda (B17 fica).
  - **Selecionado:** fundo `$secondary` com **texto #212121** (6,26:1).
  - **Erros:** `aria-*` como no Contato.
  - **Rótulos:** sem ":".
  - **Preço:** `formatPrice()`.
  - **Estado vazio:** sai o toast que repete a mensagem; o botão usa `.btn--primary`.
  - **Header:** o topo compensa o header com o token.
  - **Limpeza:** os literais viram tokens, incluindo os verdes da confirmação.
  - **Fica igual:** a etapa 5 continua inacessível (B1, B2).
  - **Verificar:**
    - Playwright só com teclado: Tab até o profissional, Enter, preencher a data, Tab até o horário, Espaço, e a etapa 4 aparece;
    - `aria-pressed="true"` no item escolhido;
    - a 1440, o topo do card não fica sob o header.

- [ ] **3.7 404** (C1, C5, D7, T1). Efeito: sutil.
  - **O que muda:**
    - o `<style>` passa a `scoped`;
    - o parágrafo passa a `$text-on-dark-muted` (7,42:1);
    - os títulos recebem Archivo Black explícita, preservando o visual depois da 1.3;
    - o botão usa `.btn--primary`, com texto #212121.
  - **Verificar:** captura nas 3 larguras; recalcular o contraste.

- [ ] **3.8 Imagens** (D10). Efeito: sutil.
  - **O que muda:**
    - Reprocessar os 3 JPGs com o ImageMagick do sistema: `convert in.jpg -resize '1920x1920>' -quality 80 -strip out.jpg`.
    - Adicionar `width`/`height` e `loading="lazy"` nas imagens abaixo da dobra (todas, menos as dos heros).
  - **Verificar:**
    - na saída do `yarn build`, cada JPG cai bem abaixo dos 2–3,6 MB atuais;
    - a dobra a 1440 sem diferença perceptível lado a lado.

### Fase 4 — Verificação ponta a ponta

- [ ] **4.1 Build e formatação**
  - `yarn build` sem erros nem avisos novos.
  - `npx prettier --check` nos arquivos alterados.
  - Registrar que o ESLint segue sem rodar (estado inicial).
- [ ] **4.2 Capturas "depois"**
  - Rodar `node /tmp/capturas.cjs docs/ux-audit/screenshots/depois`.
  - Montar os pares com `convert antes/X.png depois/X.png +append comparacao/X.png` em `docs/ux-audit/screenshots/comparacao/`.
  - Revisar cada par contra o efeito previsto em cada item.
- [ ] **4.3 Métricas** (`metrics.json` "depois"):
  - **layout:**
    - `overflowers` vazio em todas as telas;
    - `headerHeight` igual ao token;
    - `smallTargets` sem controles principais abaixo de 44px nem links abaixo de 24px;
  - **página:** `h1` e `main` iguais a 1 em todas;
  - **menu:** `abertoAposEsc` igual a 0.
- [ ] **4.4 Teclado ponta a ponta**
  - Com o foco sempre visível, percorrer: Home → card de serviço do rodapé (abre o agendamento com um serviço) → profissional → data → horário → dados.
  - Registrar que o fluxo para na etapa 4 por causa de B1 e B2.
- [ ] **4.5 Contraste**
  - Recalcular todos os pares alterados.
  - **Ficam falhando por decisão** (F1–F4): texto laranja sobre claro (C2, T4), texto branco sobre superfícies laranja (C11), verde do WhatsApp (C7), bordas dos inputs (C8) e ícone de aviso (C10).
  - **Nenhum outro par pode falhar.**
- [ ] **4.6 Contagens**
  - Rodar de novo o Apêndice A da `AUDIT.md`.
  - **Esperado:**
    - reset igual a 1 e `sass:color` sem uso igual a 0;
    - `:focus-visible` e `prefers-reduced-motion` maiores que 0;
    - hex, `rgba` e `white` literais em forte queda (sobram só as cores de marca de terceiros: GitHub, LinkedIn, WhatsApp, Instagram);
    - `transition: all` igual a 0.
- [ ] **4.7 Fechar a auditoria**
  - Na coluna "Plano" da `AUDIT.md`, marcar cada ID como ✅ corrigido, ⏸ fora (F#) ou 🐞 bug funcional.
  - Anexar a saída das verificações 4.1–4.6.

---

## Fica de fora

| # | Itens | Por quê | Observação |
|---|---|---|---|
| F1 | C2 e T4 (texto laranja sobre fundo claro, 2,30–2,57:1); C11 (texto branco sobre superfícies laranja que não são botão) | Muda o uso da cor da marca fora dos botões; é decisão de identidade. | A parte "texto #212121 nos botões laranja" já foi aprovada e está em 2.1, 3.6 e 3.7. Opções para o restante: preços e cargos em `#212121`, com o laranja como acento, e texto escuro sobre as superfícies laranja; ou uma cor nova, mais escura, na paleta. |
| F2 | C7: verde do WhatsApp e do botão de confirmar, com texto branco | Cor de marca de terceiro e cor de estado. | — |
| F3 | C8: borda dos inputs (1,30–1,36:1) | Escurecer muda o aspecto dos formulários. | Opção: `$text-gray`, que dá 4,69:1. |
| F4 | C10: ícone de aviso amarelo | Exigiria um tom novo. | — |
| F5 | K7: fonte dos títulos de página | É escolha de identidade: Bungee Hairline ou Archivo Black. | — |
| F6 | T3: negrito sintético | Mexe no desenho do logo e do menu. | — |
| F7 | H3: header translúcido aparece cinza nas páginas claras | O efeito de vidro faz parte do visual. | — |
| F8 | E11 (layout 3+1 em Serviços); K8 (três desenhos para CTAs, equipe e números) | Unificar muda o desenho das seções. | — |
| F9 | TX2, TX3, TX4, TX5, TX7 | São conteúdo e voz: quais números são verdadeiros, se os títulos usam Title Case, a grafia de "E-mail" e "Início", e "Função não implementada" (que depende de B8). | — |
| F10 | D11 (componentes órfãos), as CDNs de Material Symbols e MDI, `sass-loader`, `vite-plugin-vue-devtools`, `vue-eslint-parser` ausente e a troca do Font Awesome | É remoção, adição ou troca de dependência, ou exclusão de componentes que talvez você queira manter. | — |
| F11 | Atualizações de versão (seção 15 da `AUDIT.md`) | Troca de dependência. | — |
| F12 | B1–B19, os bugs funcionais | Fora do escopo de UI, por decisão. Vários exigem definir o comportamento esperado. | — |

---

## Apêndice B — Script de capturas e métricas

- **O que é:** o mesmo fluxo usado na auditoria. Esta versão calcula a data do agendamento no momento da execução e mede também `h1` e `main`.
- **Como usar:**
  - Gravar fora do repositório (por exemplo, `/tmp/capturas.cjs`).
  - Rodar com `node /tmp/capturas.cjs <pasta> [url-base]`.
  - Usa o Playwright e o Chromium já instalados no ambiente da sessão. Se o módulo estiver em outro caminho, definir `PLAYWRIGHT_MODULE`.
- **Teste:** só foi verificado com `node --check`; ainda não foi executado. A versão da auditoria, com a mesma lógica e data fixa, rodou nas 3 larguras.

```js
// Captura as telas do plano em 1440, 768 e 390 e grava metrics.json ao lado.
// Uso: node capturas.cjs <pasta-de-saida> [url-base]
// Requer: `yarn dev --port 5173 --strictPort` rodando. Não instala nada.
const PW = process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright'
const { chromium } = require(PW)
const fs = require('fs')
const path = require('path')

const OUT = process.argv[2]
const BASE = process.argv[3] || 'http://localhost:5173/maos-de-tesoura'
if (!OUT) throw new Error('informe a pasta de saída')
fs.mkdirSync(OUT, { recursive: true })

const WIDTHS = [
  { w: 1440, h: 900 },
  { w: 768, h: 1024 },
  { w: 390, h: 844 },
]
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'servicos', path: '/servicos' },
  { name: 'sobre', path: '/about' },
  { name: 'contato', path: '/contato' },
  { name: 'agendamento-vazio', path: '/booking' },
  { name: '404', path: '/rota-inexistente' },
]

// Próximo dia útil a partir de depois de amanhã, em data local (evita o bug de UTC do próprio app).
function proximaData() {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  if (d.getDay() === 0) d.setDate(d.getDate() + 1)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

async function novaPagina(browser, vw) {
  const ctx = await browser.newContext({
    viewport: { width: vw.w, height: vw.h },
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  })
  const page = await ctx.newPage()
  // Na sessão da auditoria essas CDNs eram bloqueadas pela rede; abortar evita esperar o timeout.
  // Se a rede liberar os hosts, remova a linha para os ícones aparecerem.
  await page.route(/cdnjs\.cloudflare\.com|cdn\.materialdesignicons\.com/, (r) => r.abort())
  return { ctx, page }
}

async function assentar(page) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1600) // services.js simula 1s de fetch
}

async function metricas(page) {
  return page.evaluate(() => {
    const doc = document.documentElement
    const header = document.querySelector('.header-floating')
    const vazam = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.right > doc.clientWidth + 1 && r.width > 0 && getComputedStyle(el).position !== 'fixed') {
        vazam.push({ tag: el.tagName, cls: el.className?.toString().slice(0, 60), right: Math.round(r.right) })
      }
    }
    const pequenos = []
    const alvos = 'a, button, input, select, textarea, [role=button], .professional-card, .time-slot'
    for (const el of document.querySelectorAll(alvos)) {
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      if (r.width === 0 || cs.visibility === 'hidden' || cs.display === 'none') continue
      if (r.width < 44 || r.height < 44) {
        const text = (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30)
        pequenos.push({ tag: el.tagName, text, w: Math.round(r.width), h: Math.round(r.height) })
      }
    }
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
      bodyFont: getComputedStyle(document.body).fontFamily,
      h1: document.querySelectorAll('h1').length,
      main: document.querySelectorAll('main').length,
      overflowers: vazam.slice(0, 15),
      smallTargets: pequenos.slice(0, 40),
    }
  })
}

;(async () => {
  const browser = await chromium.launch()
  const relatorio = {}
  for (const vw of WIDTHS) {
    for (const p of PAGES) {
      const { ctx, page } = await novaPagina(browser, vw)
      await page.goto(BASE + p.path)
      await assentar(page)
      const key = `${p.name}-${vw.w}`
      await page.screenshot({ path: path.join(OUT, `${key}.png`), fullPage: true })
      await page.screenshot({ path: path.join(OUT, `${key}-dobra.png`) })
      relatorio[key] = await metricas(page)
      await ctx.close()
    }

    // Fluxo de agendamento: card de serviço da Home → profissional → data → horário → dados (etapa 4).
    {
      const { ctx, page } = await novaPagina(browser, vw)
      await page.goto(BASE + '/')
      await assentar(page)
      await page.locator('.service h3').first().click()
      await page.waitForURL(/booking/)
      await assentar(page)
      await page.locator('.professional-card').first().click()
      await page.locator('#booking-date').fill(proximaData())
      await page.locator('#booking-date').dispatchEvent('change')
      await page.waitForTimeout(300)
      await page.locator('.time-slot').nth(2).click()
      await page.waitForTimeout(400)
      await page.locator('#client-name').fill('Ana Souza')
      await page.locator('#client-phone').pressSequentially('47999998888')
      await page.locator('#client-email').fill('ana@exemplo.com')
      await page.waitForTimeout(6000) // espera os toasts sumirem
      await page.evaluate(() => window.scrollTo(0, 0))
      const key = `agendamento-fluxo-${vw.w}`
      await page.screenshot({ path: path.join(OUT, `${key}.png`), fullPage: true })
      relatorio[key] = await metricas(page)
      relatorio[key].etapa5 = await page.locator('text=5. Confirmação').count()
      await ctx.close()
    }

    // Menu mobile aberto (abaixo de 968px) + teste do Esc.
    if (vw.w < 968) {
      const { ctx, page } = await novaPagina(browser, vw)
      await page.goto(BASE + '/')
      await assentar(page)
      await page.locator('.mobile-menu-toggle').click()
      await page.waitForTimeout(400)
      await page.screenshot({ path: path.join(OUT, `menu-mobile-${vw.w}.png`) })
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
      relatorio[`menu-mobile-${vw.w}`] = {
        abertoAposEsc: await page.locator('.mobile-menu.active').count(),
        toggleAria: await page
          .locator('.mobile-menu-toggle')
          .evaluate((b) => ({ label: b.getAttribute('aria-label'), expanded: b.getAttribute('aria-expanded') })),
        menuTop: await page.locator('.mobile-menu').evaluate((m) => Math.round(m.getBoundingClientRect().top)),
        headerBottom: await page.locator('.header-floating').evaluate((h) => Math.round(h.getBoundingClientRect().bottom)),
      }
      await ctx.close()
    }
  }
  fs.writeFileSync(path.join(OUT, 'metrics.json'), JSON.stringify(relatorio, null, 2))
  await browser.close()
  console.log('ok:', fs.readdirSync(OUT).filter((f) => f.endsWith('.png')).length, 'PNG')
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
```

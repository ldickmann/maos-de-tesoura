# Auditoria de UI/UX — Mãos de Tesoura

- **Data:** 2026-10-18
- **Commit auditado:** `d6a5aea`
- **Plano de execução:** [`PLAN.md`](./PLAN.md)

## Decisões tomadas sobre esta auditoria (2026-10-18)

O plano foi aprovado com estas decisões:

- **Aprovado nos itens que mudam o visual (⚠):**
  - Hanken Grotesk como fonte do `body`;
  - a mesma fonte no menu mobile e no desktop;
  - fundo `#212121` no botão do CTA final da Home;
  - 2 colunas no tablet;
  - véu escuro no topo da página Sobre.
- **Entrou na execução, vindo do "fica de fora":** só o **texto `#212121` nos botões laranja** (parte de C1).
- **Continua fora:**
  - todo o resto do "fica de fora" do plano;
  - os 19 bugs funcionais (seção 14).

A coluna **Plano** de cada tabela diz onde o achado é tratado:
- número (`2.1`): item do checklist em `PLAN.md`;
- `F#`: linha da tabela "Fica de fora".

## Contexto e premissas

- **O que é:** portfólio pessoal. Front-end de agendamento para barbearia, com dados mockados e sem backend. O README diz "PROJETO EM DESENVOLVIMENTO".
- **Identidade que fica:**
  - **paleta:** `$primary #212121`, `$secondary #ff7b42`, `$tertiary #343a40`, `$accent #f8f9fa`, `$accent-light #ffffff` e as cores de estado (`_variables.scss:8-16`);
  - **fontes:** Archivo Black, Bungee Hairline e Hanken Grotesk (`index.html:9-11`);
  - **logo:** o tipográfico "Mãos de / Tesoura" (`HeaderFloating.vue:5-12`).
- **Como foi feito:**
  - `yarn dev` com capturas em Playwright/Chromium a 1440×900, 768×1024 e 390×844;
  - medições de layout no navegador (altura do header, overflow e alvos de toque);
  - contraste calculado pela fórmula WCAG 2.1;
  - teste de teclado: Tab pela Home e Esc no menu mobile;
  - `yarn build` para inspecionar o CSS gerado.
- **Limite das capturas:** a política de rede da sessão bloqueava `cdnjs.cloudflare.com` (Font Awesome) e `cdn.materialdesignicons.com`. Os ícones Font Awesome não aparecem nas capturas da auditoria, e as afirmações sobre ícones vêm só do código.
- **Skills usadas como critério:**
  - `frontend-design`: tipografia, hierarquia, movimento e textos;
  - `design:accessibility-review`: WCAG 2.1 AA;
  - `design:design-system`: tokens e consistência;
  - `design:design-critique`: hierarquia e usabilidade;
  - `design:ux-copy`: textos.

  Nenhuma foi usada para propor nova identidade.
- **Revisão:**
  - **Antes da aprovação:** um subagente conferiu as 112 citações arquivo:linha contra o código. Encontrou 11 problemas, todos corrigidos. O D9 foi retirado por ser falso.
  - **Depois da aprovação**, ao preparar a decisão do texto `#212121`, uma busca por "fundo laranja + texto branco" encontrou ocorrências que faltavam:
    - **C11** foi criado;
    - **C1** e **ST2** foram completados.

    Conferi essas linhas uma a uma, mas elas não passaram pelo subagente revisor.
- **Contagens:** todas as contagens citadas são reproduzidas pelo script do [Apêndice A](#apêndice-a--contagens-reproduzíveis).
- **Evidências:**
  - Uma evidência no formato "`<tela>-<largura>`" (ex.: `home-1440`, `home-1440-dobra`) se refere às capturas da auditoria.
  - Essas capturas **não foram versionadas**. A Fase 0 do `PLAN.md` gera as mesmas telas, com os mesmos nomes, antes de qualquer edição.
- **Impacto:**
  - **alto:** impede ou prejudica muito uma tarefa, ou falha AA num elemento central;
  - **médio:** degrada a experiência ou a consistência de forma visível;
  - **baixo:** acabamento ou dívida sem efeito visível imediato.

---

## 1. Tipografia

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| T1 | Global: Home, 404, menu mobile e toasts | `src/assets/styles/scss/_base.scss:21` | O `body` usa **Archivo Black**, uma fonte de display, e todo texto sem `font-family` próprio herda essa fonte: descrições, listas, depoimentos, cargos da equipe, o parágrafo da 404, o menu mobile e os toasts. As outras páginas definem Hanken Grotesk no contêiner (`ServicosView.vue:242`, `ContatoView.vue:335`, `AboutView.vue:247`, `BookingView.vue:386`). | `home-1440`: o corpo inteiro aparece em Archivo Black. A métrica `bodyFont` dá "Archivo Black" em todas as telas. | alto | 1.3 ✅ aprovado, 3.7 |
| T2 | Botões e alguns campos | `_base.scss:11-24`: o reset não tem `font: inherit` para controles. Exemplos: `HeaderFloating.vue:215-218` (a fonte está no wrapper, não no `<button>`), `AboutView.vue:762-777`, `ContatoView.vue:484-498`, `FooterComponent.vue:535-547`, `BookingView.vue:534-541` (`.date-input`), `BookingView.vue:594-600` (`.form-input`) | Todos os `<button>` e os inputs do agendamento aparecem na fonte do sistema: "Agendar Horário" no header e na Sobre, "Enviar Mensagem", "Inscrever" e o texto digitado no agendamento. Os campos do Contato (`ContatoView.vue:442`) e o textarea do agendamento (`BookingView.vue:614`) já fazem `font-family: inherit`. | `home-1440-dobra` (botão do header em sans de sistema); recorte do CTA da Sobre; `agendamento-fluxo-1440` (texto dos inputs) | médio | 1.3 |
| T3 | Negrito sintético | `index.html:10` carrega só o peso 400 de Archivo Black e Bungee Hairline, mas há bold em `HeaderFloating.vue:160,190`, `BannerComponent.vue:157` e `HomeView.vue:372,413,586,678` | O navegador engrossa artificialmente a Bungee Hairline, de traço fino, e ela fica borrada, sobretudo no logo e no menu. | `home-1440-dobra` (logo e menu) | baixo | F6 |
| T4 | Preços e números de destaque | `HomeView.vue:411-416` (`.price`: 1.3rem sobre #f8f9fa, `:389`); `HomeView.vue:584-592` (`.stat-number`: 2rem, ou 1.8rem em ≤768, sobre `rgba(255,255,255,.95)`, `:552`) | Os valores estão em Bungee Hairline, de traço fino, em laranja sobre fundo claro. O preço dá 2,44:1 e os números ~2,5–2,57:1. O preço, que decide a compra, fica difícil de ler. | `home-1440` (cards de serviço e "3000+ / 16+ / 96%") | médio | F1 |
| T5 | Escala tipográfica | 22 tamanhos distintos em rem, contando os órfãos MiniCard e CardComponent. Em px são 3 tamanhos (13, 14 e 20px) em 5 declarações: `NotificationSystem.vue:104,115,123,180`, `LoadingSpinner.vue:49` | Não há escala, e os tamanhos em px não acompanham a preferência de fonte do usuário. | Apêndice A | baixo | 1.2, 2.3, 2.4 |

## 2. Cor e contraste

O AA pede 4,5:1 para texto normal, 3:1 para texto grande e 3:1 para bordas de componentes.

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| C1 | Botões laranja com texto branco, incluindo hover e estados selecionados | `HeaderFloating.vue:220-221` (header); `HeaderFloating.vue:305-306` (botão do menu mobile); `HomeView.vue:422-423` (`.service-btn`); `HomeView.vue:886-887` (`.btn-primary`); `HomeView.vue:926-928` e `:943-945` (hover dos botões outline); `ServicosView.vue:526-527`; `ServicosView.vue:683-684`; `ContatoView.vue:486-487`; `ContatoView.vue:722-724` (hover de "Como Chegar"); `FooterComponent.vue:537-538`; `AboutView.vue:780-781`; `AboutView.vue:795-797` (hover); `BookingView.vue:488-491` e `:573-576` (selecionados); `BookingView.vue:718-719`; `ErrorMessage.vue:103-105`; `NotFoundView.vue:51-52` | Texto branco sobre `$secondary` #ff7b42 dá **2,57:1**; sobre o fim do gradiente (#e66b32), 3,22:1. Falha AA nos CTAs do site. | cálculo; `home-1440`, `servicos-1440` | alto | 2.1, 3.6, 3.7 — **decisão: texto `#212121`** (6,26:1 / 4,99:1) |
| C2 | Texto laranja sobre fundo claro | `HomeView.vue:412` (preço); `HomeView.vue:587` (stats); `HomeView.vue:683` (cargo); `HomeView.vue:933-937` (botão outline); `ServicosView.vue:401`; `BookingView.vue:462`; `AboutView.vue:611`; `AboutView.vue:792`; `ContatoView.vue:715` | #ff7b42 sobre #fff dá **2,57:1**; sobre #f8f9fa, 2,44:1; sobre #ffefe8, 2,30:1. Falha AA em preços, cargos e links. | cálculo | alto | F1 |
| C3 | CTA final da Home | `HomeView.vue:176` (botão); `HomeView.vue:885-887` (`.btn-primary` com gradiente laranja); `HomeView.vue:847` (seção com o mesmo gradiente) | O botão "Agendar Horário" é laranja sobre a seção laranja e quase some. Só o WhatsApp se destaca. | `home-1440` e `home-390` (seção "Pronto para renovar…") | alto | 3.2 ✅ aprovado (fundo `#212121`) |
| C4 | Subtítulos de seção sobre `$bg-light` | `HomeView.vue:268-271` (#6c757d) sobre `HomeView.vue:279` e `:606` (#f8f9fa); `ServicosView.vue:262-264` sobre o gradiente de `ServicosView.vue:240` | #6c757d sobre #f8f9fa dá **4,45:1**, abaixo de 4,5. Sobre #e9ecef fica ainda pior. | cálculo | médio | 3.2, 3.3 |
| C5 | 404 | `NotFoundView.vue:42-44` sobre `NotFoundView.vue:23` | #6c757d sobre #212121 dá **3,43:1**. | cálculo; `404-1440` | médio | 3.7 |
| C6 | Placeholders | `ContatoView.vue:459-461` (#adb5bd sobre branco, **2,07:1**); `FooterComponent.vue:525-527` (#888 sobre #333, **3,56:1**) | Ficam abaixo de 4,5:1. | cálculo | médio | 2.2 |
| C7 | Verde com texto branco | `HomeView.vue:950-952` (WhatsApp, 3,13:1); `BookingView.vue:663-664` (confirmar: #28a745→#20c997, 3,13→2,13:1); `FooterComponent.vue:370-371` + `:380` (ícone branco sobre #25d366, 1,98:1); `ContatoView.vue:640-642` | Falha AA. | cálculo | médio | F2 |
| C8 | Bordas de inputs | `ContatoView.vue:439` (#dee2e6, 1,30:1); `BookingView.vue:538` e `:598` (#ddd, 1,36:1) | A borda que identifica o campo fica abaixo de 3:1 (WCAG 1.4.11). | cálculo | médio | F3 |
| C9 | Cores fora da paleta | `AboutView.vue:369` (#e67e22, outro laranja). Hover escuro em dois tons: #d55a22 (`ServicosView.vue:531`, `ContatoView.vue:500`, `AboutView.vue:784`) e `color.adjust($btn-primary-hover, $lightness:-5%)` (`HeaderFloating.vue:234`, `HomeView.vue:439`, `HomeView.vue:902`, `FooterComponent.vue:553`). Verdes próprios em `BookingView.vue:618-677` | Variações não intencionais da paleta. | `sobre-1440` (números do hero) | baixo | 2.1, 3.4, 3.6 |
| C10 | Ícone de aviso | `NotificationSystem.vue:86-91` | #ffc107 sobre branco dá 1,63:1, abaixo de 3:1. O ícone só complementa o texto. | cálculo | baixo | F4 |
| C11 | Texto branco sobre superfícies laranja que não são botão | `HomeView.vue:845-866` (título e parágrafo da seção CTA; o parágrafo tem `opacity: .9`); `AboutView.vue:496-525` (cards de números); `HomeView.vue:473-482` (etiqueta "Desde 2009") | Branco sobre #ff7b42 dá 2,57:1, e o parágrafo com opacidade .9 dá 2,35:1. Falha AA, inclusive no título grande, que pede 3:1. | cálculo; `home-1440`, `sobre-1440` | alto | F1 |

## 3. Espaçamento e layout

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| E1 | Compensação do header fixo | 88px em `ServicosView.vue:239`, `ContatoView.vue:334` e `BookingView.vue:383`; 80px em `BookingView.vue:751` | O header mede **89px** no desktop e **76px** em ≤968px. A 1440 o topo do card do agendamento fica 1px sob o header. A 390 e 768 aparece uma faixa clara de 12px entre o header e o hero do Contato. | métricas `headerHeight` 89/76; `contato-390-dobra` | médio | 1.2, 3.3, 3.5, 3.6 |
| E2 | Menu mobile | `HeaderFloating.vue:270` (`top: 80px`) | O header termina em 76px, então fica uma fresta de 4px mostrando a página. | métricas `menuTop` 80 × `headerBottom` 76; `menu-mobile-768` | baixo | 2.5 |
| E3 | Larguras de contêiner | `HeaderFloating.vue:149` e `:154` (1400px + 2rem) × `HomeView.vue:243`, `FooterComponent.vue:268`, `ContatoView.vue:339`, `AboutView.vue:251`, `ServicosView.vue:248` (1440px) | O logo começa em x≈54 e o conteúdo em x=32. | `home-1440` | baixo | 1.2, 2.5 |
| E4 | Cards de serviço da Home | `HomeView.vue:301-315` (sem coluna flex) | O preço e o botão do 3º card ficam ~26px acima dos outros. | `home-1440` | médio | 3.2 |
| E5 | Cards da página Serviços | `ServicosView.vue:505-506` (`flex: 1`) × `ServicosView.vue:524-525` (`flex: 2`) | "Ver Detalhes" quebra em duas linhas a 1440. | `servicos-1440` | baixo | 3.3 |
| E6 | Botões de largura total com rótulo à esquerda | `HomeView.vue:1011-1015` (stretch) com botões sem `justify-content` (`HomeView.vue:885-896`, `HomeView.vue:913-924`); newsletter em `FooterComponent.vue:511-513` (`max-width: 480px`) + `:544` | Em ≤768 isso afeta "Nossa História" e "Fale Conosco"; em ≤480, "Inscrever". | `home-390`, `home-768`, `contato-390` | médio | 2.1 |
| E7 | CTA final da Home no mobile | `HomeView.vue:869-880` (`.cta-section .cta-actions`, 2 classes) vence `HomeView.vue:1005-1009` (`.cta-actions`, 1 classe) | O ajuste mobile nunca se aplica, e os dois botões ficam com larguras diferentes. | `home-390` | baixo | 3.2 |
| E8 | Rodapé a 768 | `FooterComponent.vue:288-292` (centraliza em ≤968) × `FooterComponent.vue:385-388` e `:441-443` (centralizam só em ≤430) | Entre 431 e 968px, os títulos ficam centralizados, mas os ícones sociais e o contato ficam à esquerda. | `home-768` | médio | 2.6 |
| E9 | Números sobre a foto (Home) | `HomeView.vue:562-569` e `HomeView.vue:1018-1028` | A 768, o overlay em coluna cobre cerca de metade da foto. | `home-768` | baixo | 3.2 |
| E10 | Tablet (768) | `HomeView.vue:290-294`, `:344-348`, `:616-620`, `:727-730`; `ServicosView.vue:280-286`, `:334-338` | `max-width: 768px` inclui 768, então o tablet recebe o layout de celular: uma coluna com cards de até 400px na Home e até 500px em Serviços. Na Home sobram ~184px vazios de cada lado. | `home-768`, `servicos-768` | médio | 3.2, 3.3 ✅ aprovado |
| E11 | Serviços a 1440 | `ServicosView.vue:271-277` e `ServicosView.vue:304-306` | Os 4 cards ficam em 3+1, e o 4º sobra centralizado. | `servicos-1440` | baixo | F8 |
| E12 | Escala de espaçamento | todos os SFC: 375 valores em rem e 11 em px em `padding`, `margin` e `gap` | Não há escala; os valores (0.875, 1.2, 2.5rem…) aparecem soltos. | Apêndice A | baixo | 1.2 |

## 4. Bordas e raios

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| R1 | Botões | 4px em `BannerComponent.vue:152` e `NotFoundView.vue:54`; 8px em `HeaderFloating.vue:224` e `HomeView.vue:889`; 12px em `HomeView.vue:425`, `ServicosView.vue:686` e `AboutView.vue:768` | O mesmo componente aparece com três raios. | leitura do código | baixo | 2.1 |
| R2 | Cards e superfícies | 12px (`BookingView.vue:394`, `ContatoView.vue:756`); 16px (`ContatoView.vue:529`, `AboutView.vue:570`); 20px (`HomeView.vue:304`, `ServicosView.vue:299`) | São 12 valores de raio, sem hierarquia. | Apêndice A | baixo | 1.2 |
| R3 | Inputs | `BookingView.vue:598-599` (2px #ddd, raio 6px) × `ContatoView.vue:439-440` (2px #dee2e6, raio 8px) × `FooterComponent.vue:519-520` (1px #444, raio 8px) | Há três estilos de campo. | leitura do código | baixo | 2.2 |

## 5. Sombras

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| S1 | Cards | `HomeView.vue:305`, `AboutView.vue:572`, `ContatoView.vue:757`, `ServicosView.vue:301`, `BookingView.vue:395` | São 30 valores distintos de `box-shadow`, sem escala de elevação. | Apêndice A | baixo | 1.2 |

## 6. Estados (hover, focus, active, disabled, loading, vazio, erro)

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| ST1 | Foco | Não há `:focus-visible` no projeto. Há `outline: none` em `ContatoView.vue:446`, `BookingView.vue:543`, `BookingView.vue:603` e `FooterComponent.vue:530` | Links e botões dependem do anel padrão do navegador. Nos inputs brancos, o único sinal de foco é a borda laranja (2,57:1, abaixo de 3:1). No Contato há uma sombra de alfa 0,1 (`ContatoView.vue:448`), que quase não se vê. Na newsletter a borda passa: 4,91:1 sobre #333. | teste com Tab; Apêndice A | alto | 1.3 |
| ST2 | Hover que "levanta" ou colore elementos não clicáveis | `HomeView.vue:640-643` (`.team-card`); `HomeView.vue:707-711` (a tag de especialidade fica laranja com texto branco); `HomeView.vue:750-753` (depoimento); `HomeView.vue:774-776` (estrelas); `ServicosView.vue:595-598` (`.info-card`); `ContatoView.vue:760-762` (FAQ); `AboutView.vue:583-585` (equipe) | Esses elementos parecem clicáveis, mas não têm ação. | leitura do código | médio | 3.2, 3.3, 3.4, 3.5 |
| ST3 | Loading da Home | `HomeView.vue:16-37` + `HomeView.vue:231-235`; `services.js:72-85` (`isLoading` não é usado) | A grade fica vazia por 1s, e depois a página "pula". | leitura do código | médio | 3.2 |
| ST4 | Loading do Contato | `ContatoView.vue:25-27` (o spinner substitui o form) × `ContatoView.vue:107-111` | O form some durante o envio, e o estado "Enviando..." do botão nunca aparece. | leitura do código | médio | 3.5 |
| ST5 | LoadingSpinner | `LoadingSpinner.vue:3-7` | Não tem `role="status"` nem `aria-live`. | leitura do código | baixo | 2.4 |
| ST6 | Estado vazio do agendamento | `BookingView.vue:208-218` + `BookingView.vue:358-363` | Um toast repete a mensagem do estado vazio e cobre o header (RS2). | `agendamento-vazio-1440`, `agendamento-vazio-390` | baixo | 3.6 |
| ST7 | Erros de formulário | `ContatoView.vue:30-40`, `:86-88`, `:101-103`; `BookingView.vue:103-113`, `:118-130`, `:135-145` | Falta `aria-invalid`, `aria-describedby` e `role="alert"`, e o foco não vai ao primeiro erro (WCAG 3.3.1 e 4.1.2). | teste: depois de um envio inválido, o foco ficou no botão e os atributos vieram nulos | médio | 3.5, 3.6 |
| ST8 | Botão de fechar do toast | `NotificationSystem.vue:120-135` | O alvo tem 24×24px e a cor é #999 (2,85:1). | cálculo | baixo | 2.3 |
| ST9 | Estado `:active` | só `HomeView.vue:445-447` e `ServicosView.vue:536-538` | Os outros botões não dão retorno ao clique. | leitura do código | baixo | 2.1 |

## 7. Animações

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| A1 | Global | não há `prefers-reduced-motion`; scroll suave em `HeaderFloating.vue:88` e `FooterComponent.vue:253` | Transforms de hover, `fadeInUp`, o spinner infinito e o scroll suave ignoram a preferência de movimento reduzido. | Playwright com `reducedMotion: 'reduce'`: o card manteve `transition: 0.4s`; Apêndice A | médio | 1.3 |
| A2 | Global | 40 ocorrências de `transition: all` (ex.: `HeaderFloating.vue:137`, `HomeView.vue:306`) | Animam propriedades de layout sem necessidade. | Apêndice A | baixo | 1.2 e fases 2–3 |
| A3 | Serviços | `ServicosView.vue:714-729` | `animation-delay` sem `animation-fill-mode` faz o card aparecer, sumir e entrar de novo. | leitura do código (spec CSS) | baixo | 3.3 |
| A4 | Menu mobile | `HeaderFloating.vue:267-284` | A transição de `transform` nunca roda, porque o menu sai de `display: none`. É código morto. | leitura do código | baixo | 2.5 |
| A5 | Toasts | `NotificationSystem.vue:4` (`v-if` no contêiner) | O último toast some sem animação. | leitura do código | baixo | 2.3 |

## 8. Responsividade

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| RS1 | Toasts no mobile | `NotificationSystem.vue:55-56` (`width: 100%`) + `:167-171` (`left`/`right` 10px) | O toast vaza 10px da tela: a borda direita fica em 400px num viewport de 390, e em 778px num de 768. | métricas `overflowers`; `agendamento-vazio-390-dobra` | médio | 2.3 |
| RS2 | Toasts sobre o header | `NotificationSystem.vue:51-54` (`top: 20px`, `z-index: 9999`) | No desktop o toast cobre o botão "Agendar Horário" do header; no mobile, cobre o logo e o menu. | `agendamento-vazio-1440-dobra`, `agendamento-vazio-390-dobra` | médio | 2.3 |
| RS3 | Breakpoints | 7 media queries distintas. Regras que se anulam: `HomeView.vue:296-298` × `:1033-1035`, `HomeView.vue:622-624` × `:1037-1039` e `HomeView.vue:732-734` × `:1041-1043` | O header muda de layout em 968, e o rodapé em 968, 768, 480 e 430. Há regras duplicadas. | Apêndice A; leitura do código | baixo | 1.2, 3.2 |
| RS4 | Menu mobile | `HeaderFloating.vue:281-284` | `.mobile-menu.active` não tem media query: se a janela for alargada com o menu aberto, ele continua visível. | leitura do código | baixo | 2.5 |

## 9. Acessibilidade

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| AC1 | Home | `BannerComponent.vue:9-10` (título em `<p>`/`<span>`) | A Home não tem `<h1>`; as demais páginas têm. | grep `<h1` | médio | 3.2 |
| AC2 | Landmarks | Só `HomeView.vue:2` usa `<main>`. As outras views começam em `<div>` (`ServicosView.vue:2`, `BookingView.vue:2`, `ContatoView.vue:2`, `AboutView.vue:2`, `NotFoundView.vue:2`). `App.vue:1-10` não tem link para pular ao conteúdo | Leitores de tela não encontram o conteúdo principal. | leitura do código | médio | 3.1 |
| AC3 | Botão do menu mobile | `HeaderFloating.vue:44-48`, `HeaderFloating.vue:243-252` | Não tem nome acessível, `aria-expanded` nem `aria-controls`, e o alvo mede **25×25px**. O menu não fecha com Esc nem ao trocar de rota (ex.: voltar). | métricas: `toggleAria` nulo, `abertoAposEsc: 1`, alvo 25×25 | alto | 2.5 |
| AC4 | Logo | `HeaderFloating.vue:5-12` | O logo são dois links para a mesma ação: duas paradas de Tab, lidas separadamente. | teste com Tab | médio | 2.5 |
| AC5 | Profissional e horário (agendamento) | `BookingView.vue:31-40`, `BookingView.vue:75-84` | São `div` com `@click`, sem `tabindex` nem papel. **Não dá para escolher profissional nem horário pelo teclado** (2.1.1), e a seleção não é anunciada. | leitura do código | alto | 3.6 |
| AC6 | Toasts | `NotificationSystem.vue:4-24` | Sem `role` nem `aria-live`. | leitura do código | médio | 2.3 |
| AC7 | Ícones decorativos | ex.: `HomeView.vue:33`, `HomeView.vue:60`, `ServicosView.vue:16`, `ContatoView.vue:123`, `FooterComponent.vue:85` | Não têm `aria-hidden="true"`. | grep | baixo | 2.6 e fase 3 |
| AC8 | Textos alternativos | `BannerComponent.vue:4` ("Barbearia Banner", imagem decorativa); `AboutView.vue:6` ("Interior da barbearia", numa ilustração com o letreiro "Barber Shop") | O alt não descreve a imagem, ou deveria ser vazio. | `sobre-1440-dobra` | baixo | 3.2, 3.4 |
| AC9 | Hierarquia de títulos | `ServicosView.vue:4` (h1) → `:13` (h3); `ErrorMessage.vue:7` (h3); rodapé em h3/h4 (`FooterComponent.vue:10`, `:55`, `:122`) | Há níveis pulados. | leitura do código | baixo | 2.4, 2.6, 3.3 |
| AC10 | Título da aba | `index.html:20`; não há `document.title` no projeto | Todas as rotas têm o mesmo `<title>` (WCAG 2.4.2). | grep | baixo | 3.1 |
| AC11 | Newsletter | `FooterComponent.vue:127-133` | O campo não tem `<label>`, só placeholder (3.3.2). | leitura do código | médio | 2.2 |
| AC12 | Links externos | `HomeView.vue:180`, `FooterComponent.vue:20`, `:28`, `:36`, `ContatoView.vue:171`, `:177`, `:183`, `:204` | `target="_blank"` sem `rel` e sem aviso de nova aba. | leitura do código | baixo | 2.6, 3.2, 3.5 |
| AC13 | Telefone e e-mail | `ContatoView.vue:137`, `:148`; `FooterComponent.vue:94`, `:108` | São texto puro, sem `tel:` nem `mailto:`. | leitura do código | baixo | 2.6, 3.5 |
| AC14 | Alvos de toque pequenos | links do rodapé com 18–21px de altura (`FooterComponent.vue:419-431`, `:599-609`); links do logo com 19px | Ficam abaixo de 24px (WCAG 2.5.8). | métricas `smallTargets` a 390 | baixo | 2.5, 2.6 |
| AC15 | Avaliação em estrelas | `HomeView.vue:150-152` | Os cinco ícones não têm equivalente textual. | leitura do código | baixo | 3.2 |

## 10. Hierarquia visual

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| H1 | Hero da página Sobre | `AboutView.vue:292-297` (`.hero-overlay` sem fundo e sem posição, por isso sem efeito); `AboutView.vue:288` | O título e os números ficam direto sobre uma ilustração carregada, metade vermelha e metade preta, com o letreiro "BARBER SHOP". | recorte ampliado de `sobre-1440-dobra`; `sobre-390` | médio | 3.4 ✅ aprovado (véu escuro) |
| H2 | CTA final da Home | ver C3 | O CTA principal fica menos visível que o secundário (WhatsApp). | `home-1440` | alto | 3.2 ✅ aprovado |
| H3 | Header em páginas claras | `HeaderFloating.vue:134` (`rgba($primary, .85)`) | Sobre fundo claro o header fica cinza (~#414141, calculado); sobre o hero da Home, quase preto. | `servicos-1440` × `home-1440` | baixo | F7 |

## 11. Consistência entre componentes

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| K1 | Botão primário | ~10 implementações: `HeaderFloating.vue:219-239`, `HomeView.vue:419-448`, `HomeView.vue:885-911`, `ServicosView.vue:524-539`, `ServicosView.vue:678-700`, `ContatoView.vue:484-509`, `AboutView.vue:762-788`, `BookingView.vue:713-730`, `ErrorMessage.vue:91-122`, `NotFoundView.vue:48-60`, `FooterComponent.vue:535-561` | Raio, padding, fonte, borda, cursor e hover variam entre elas. | leitura do código; capturas | médio | 2.1 |
| K2 | `<button>` com a borda nativa | `ServicosView.vue:678-700` (`.cta-button`); `AboutView.vue:762-788` (`.btn-primary` num `<button>`, usado em `AboutView.vue:184`) | Sem `border: none` nem `cursor: pointer`, aparece uma borda escura nativa. | recorte do CTA da Sobre; `servicos-1440` | médio | 2.1, 3.3, 3.4 |
| K3 | Select do Contato | `ContatoView.vue:464-470` | Sem `appearance: none`, aparecem **duas setas** e o fundo cinza nativo. | `contato-1440`, `contato-390` | médio | 2.2 |
| K4 | Rótulos de formulário | com ":" em `BookingView.vue:57`, `:73`, `:102`, `:117`, `:134`, `:149`; sem ":" em `ContatoView.vue:29`, `:44`, `:59`, `:72`, `:92` | Os dois formulários seguem padrões diferentes. | leitura do código | baixo | 2.2, 3.6 |
| K5 | Fonte do menu mobile × desktop | `HeaderFloating.vue:189` (desktop em Bungee Hairline) × `HeaderFloating.vue:286-302` (mobile herda Archivo Black) | O mesmo menu aparece com duas tipografias. | `menu-mobile-390` × `home-1440-dobra` | médio | 2.5 ✅ aprovado |
| K6 | Item ativo do menu | `HeaderFloating.vue:21` (o desktop marca a Home) × `HeaderFloating.vue:32` (o mobile não marca) | A Home nunca aparece ativa no mobile. | leitura do código | baixo | 2.5 |
| K7 | Títulos de página e de seção | Bungee Hairline em `HomeView.vue:257-258` e `BookingView.vue:400`; Archivo Black em `ServicosView.vue:253`, `ContatoView.vue:361`, `AboutView.vue:313`, `AboutView.vue:534-535` e nas etapas (`BookingView.vue:422`) | A mesma função usa duas fontes. "Nossa Equipe" muda de fonte entre a Home e a Sobre. | `home-1440` × `servicos-1440` × `sobre-1440` | médio | F5 |
| K8 | Blocos repetidos | círculo de ícone de 80px em `HomeView.vue:350-366`, `ServicosView.vue:632-649` e `AboutView.vue:696-710`; CTAs em `HomeView.vue:845`, `ServicosView.vue:651` e `AboutView.vue:726`; equipe em `HomeView.vue:627-689` e `AboutView.vue:568-650` | O mesmo padrão foi implementado várias vezes, com diferenças. | leitura do código | baixo | F8 |

## 12. Textos da interface

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| TX1 | Preços | `HomeView.vue:30`, `ServicosView.vue:19`, `BookingView.vue:23`, `:197` | `toFixed(2)` gera "R$ 25.00"; em pt-BR o certo é "R$ 25,00". | capturas | médio | 3.2, 3.3, 3.6 |
| TX2 | Mensagens de desenvolvedor | "Função Não implementada" em `BannerComponent.vue:36`, `HomeView.vue:227`, `ServicosView.vue:196`, `AboutView.vue:208`; "Função não implementada" em `ContatoView.vue:292` e `FooterComponent.vue:249`; `FooterComponent.vue:244` ("…: privacy/terms/cookies") | O usuário vê texto de desenvolvedor, com maiúsculas inconsistentes e termos em inglês. | leitura do código | médio | F9 (depende de B8) |
| TX3 | Fatos contraditórios | `HomeView.vue:85-94` (3000+, 16+, 96%); `AboutView.vue:14-23` (16+, 5000+, 10+ profissionais) × `AboutView.vue:83-96` (10+ anos, 3 profissionais, 98%); horário `ContatoView.vue:138` × `:160-162`; WhatsApp `HomeView.vue:180` × `FooterComponent.vue:35`; serviços `FooterComponent.vue:202-231` × `services.js` | Números, horários, telefones e nomes de serviço mudam entre telas. | leitura do código | médio | F9 |
| TX4 | Caixa dos títulos | ex.: `HomeView.vue:41`, `HomeView.vue:173`, `FooterComponent.vue:122`, `BookingView.vue:8` | Usam Title Case, convenção do inglês. Em pt-BR só a primeira letra é maiúscula. | leitura do código | baixo | F9 |
| TX5 | Grafia | "Email" em `ContatoView.vue:44`, `BookingView.vue:134`, `FooterComponent.vue:130`; "Home" em `NotFoundView.vue:7` e `HeaderFloating.vue:117` | Pelo padrão pt-BR seria "E-mail" e "Início". | leitura do código | baixo | F9 |
| TX6 | Depoimentos | `HomeView.vue:153` (aspas literais) + `HomeView.vue:788-797` (aspas no `::before`) | As aspas aparecem duplicadas. | `home-1440` | baixo | 3.2 |
| TX7 | "Depoimentos reais" | `HomeView.vue:144`; `content.js:3` (todos os avatares são a mesma foto) | O texto afirma algo que o conteúdo mock desmente. | `home-1440` | baixo | F9 |

## 13. Dívida de CSS

| ID | Tela/componente | arquivo:linha | O que está errado | Evidência | Impacto | Plano |
|---|---|---|---|---|---|---|
| D1 | Reset duplicado | `vite.config.js:11-15` injeta `@use base` em todo bloco SCSS; `_base.scss:7-24` emite CSS | O reset sai **14 vezes** no build. | Apêndice A | médio | 1.1 |
| D2 | Variáveis de fonte duplicadas | `_typography.scss:7-9` × `_variables.scss:44-46` | Há dois conjuntos com os mesmos nomes. | leitura do código | baixo | 1.1 |
| D3 | Valores fixos no lugar de tokens | 198 hex, 57 `rgb()`/`rgba()` literais e 39 `white` nos `<style>`. `ServicosView.vue`, `ContatoView.vue` e `AboutView.vue` importam os tokens (`:237`, `:332`, `:244`) e não usam nenhum | Para mudar uma cor é preciso editar dezenas de linhas. | Apêndice A | médio | 1.2 e fases 2–3 |
| D4 | Blocos copiados | o mesmo `.container` em `HomeView.vue:242-250`, `FooterComponent.vue:267-275`, `ContatoView.vue:338-346` e `AboutView.vue:250-258`; o gradiente laranja repetido 18× | Duplicação. | leitura do código; Apêndice A | baixo | 1.2, 2.1 |
| D5 | CSS e código mortos | `FooterComponent.vue:392-411` (classes inexistentes); `HomeView.vue:406-408`; `LineComponent.vue:27-37` e `:49-57`; `ServicosView.vue:499-502`; media queries repetidas em `HomeView.vue:979-1029` | Regras que nunca se aplicam. | leitura do código; grep das classes no template | baixo | 2.6, 3.2, 3.3 |
| D6 | Imports sem uso | `@use 'sass:color'` sem uso em 11 arquivos (ex.: `BannerComponent.vue:41`, `ContatoView.vue:331`) | Ruído. | Apêndice A | baixo | 1.1 |
| D7 | Estilo global vazado | `NotFoundView.vue:12` (sem `scoped`) | O CSS da 404 vira global. | leitura do código | baixo | 3.7 |
| D8 | Bloco vazio | `App.vue:19` | `<style scoped></style>` vazio. | leitura do código | baixo | 3.1 |
| ~~D9~~ | — | — | *Retirado na revisão.* O `backdrop-filter` não tem prefixo no fonte, mas o build do Vite/esbuild já gera `-webkit-backdrop-filter`. | — | — | — |
| D10 | Imagens pesadas | `src/assets/images/*.jpg` com 2,1, 2,4 e 3,6 MB (saída do `yarn build`); usadas sem `width`, `height` nem `loading` em `BannerComponent.vue:4`, `HomeView.vue:82`, `:113`, `:157`, `AboutView.vue:6`, `:114` | O LCP fica alto no celular, e o layout pode pular. | saída do `yarn build` | médio | 3.8 |
| D11 | Componentes órfãos quebrados | `MiniCard.vue:69`, `:70`, `:94`, `:104` e `CardComponent.vue:71`, `:91`, `:114` usam variáveis SCSS inexistentes | Só não quebram o build porque ninguém importa esses componentes. | grep | baixo | F10 |

---

## 14. Bugs funcionais (fora da execução por decisão)

| ID | Onde | arquivo:linha | O que acontece | Evidência |
|---|---|---|---|---|
| B1 | Agendamento | `BookingView.vue:162` usa `bookingStore.isComplete`, mas a store exporta `isBookingComplete` (`booking.js:120`, `:230`) | A etapa 5 (confirmação) nunca aparece. **Não é possível concluir um agendamento.** | teste: dados preenchidos e `etapa5 = 0` |
| B2 | Agendamento | `BookingView.vue:100-158` | O form da etapa 4 não tem botão de envio, então `validateAndConfirm` nunca roda. | teste: `submitButtons = 0` |
| B3 | Validação | `validation.js:42`, `:46`, `:52` leem `bookingData.clientName`/`clientPhone`/`clientEmail`, mas a store guarda esses dados em `client` (`booking.js:79-84`) | Se rodasse, a validação reprovaria sempre. | leitura do código |
| B4 | Agendamento | `BookingView.vue:201` | "Confirmar" chama `confirmBooking` sem validar. | leitura do código |
| B5 | Datas | `BookingView.vue:244-247` (`toISOString`); `validation.js:22` (`new Date('YYYY-MM-DD')`) | As datas são lidas em UTC: depois das 21h o mínimo pula para amanhã, e na validação a segunda vira domingo. | leitura do código + teste com node |
| B6 | Horários | `booking.js:56-71`, `:99-112` | A lista de horários é fixa. Isso causa: horários passados aparecendo, sábado até 17:30 (a casa fecha às 17h), domingo disponível e nenhum bloqueio de reserva duplicada. | leitura do código |
| B7 | Profissionais | `BookingView.vue:41` (`pro.avatar`) × `booking.js:31` (`photo`, com arquivos inexistentes) | A foto do profissional nunca aparece. | `agendamento-fluxo-1440` |
| B8 | CTAs mortos | `BannerComponent.vue:20`, `:35-37`; `HomeView.vue:176`; `ServicosView.vue:52`, `:92`; `AboutView.vue:184`; `ContatoView.vue:210`; `FooterComponent.vue:43-46`, `:153-155`. `bookService` não é usado (`ServicosView.vue:199-232`) | Os "Agendar…" da Home (hero e CTA), de Serviços e da Sobre só mostram "Função não implementada". | teste manual |
| B9 | Card de serviço da Home | `HomeView.vue:21` (clique no card) + `:32` (botão sem `.stop`) | O botão "Agendar" dispara dois toasts e navega. | leitura do código |
| B10 | Fluxo | `BookingView.vue:213` → `/servicos` → `ServicosView.vue:52` | Loop sem saída: o estado vazio leva a Serviços, onde agendar não funciona. | leitura do código |
| B11 | `href="#"` sem `.prevent` | `HeaderFloating.vue:6`, `:9`, `:18`, `:32`; `FooterComponent.vue:43`, `:73-76` | Acrescenta `#` à URL e cria uma entrada a mais no histórico. | leitura do código |
| B12 | Rolagem | `FooterComponent.vue:58` (âncora `#home` inexistente); `router/index.js:3-37` sem `scrollBehavior` | A nova página abre no meio da rolagem. | leitura do código |
| B13 | Dados do rodapé | `FooterComponent.vue:202-231` × `services.js:5-65` | O mesmo serviço aparece com nome, duração e preço diferentes. | leitura do código |
| B14 | Listener | `BookingView.vue:366-376` | O `window.addEventListener('error', …)` acumula a cada visita e nunca é removido. | leitura do código |
| B15 | Contato | `ContatoView.vue:86-88`, `:104`; `validation.js:64-85` | O assunto não é validado, e o limite de 500 caracteres não é aplicado. | leitura do código |
| B16 | Deploy | `router/index.js:4` (`createWebHistory`); `package.json:10`; não há `404.html` | Recarregar uma rota interna no GitHub Pages deve dar 404. | leitura do código (não testado no Pages) |
| B17 | Agendamento | `BookingView.vue:255-260` | Clicar de novo no mesmo profissional apaga a data e a hora. | leitura do código |
| B18 | Agendamento | `BookingView.vue:240`, `:53`, `:72`, `:98` | Ao voltar à página, a data local volta a `''` e a store mantém profissional e horário. A etapa 3 aparece sem data e sem horários, e a etapa 4 aparece junto. | leitura do código |
| B19 | Fechamento do menu mobile | `HeaderFloating.vue:62-75` | O menu não fecha ao clicar fora. (Esc e troca de rota estão em AC3.) | leitura do código |

## 15. Stack desatualizada (sem decisão)

Fonte: `yarn outdated`, consultado em 2026-10-18.

| Pacote | Instalado | Último na mesma major | Último | Custo de atualizar |
|---|---|---|---|---|
| vue | 3.5.13 | 3.5.44 | 3.5.44 | Baixo: patch. |
| vue-router | 4.5.0 | 4.6.4 | **5.4.0** | Baixo até a 4.6. A 5.x é major e exige revisar a migração; o projeto usa só `createRouter`, `createWebHistory` e rotas lazy. |
| pinia | 3.0.1 | 3.0.4 | **4.1.0** | Baixo até a 3.0.4. A 4.x é major; o projeto usa stores setup e `storeToRefs`. |
| vite | 6.2.2 | 6.4.4 | **8.3.4** | Baixo até a 6.4. A 8 são duas majores: revisar `additionalData`, `base`, a versão mínima de Node (não verificada) e o `@vitejs/plugin-vue`. |
| @vitejs/plugin-vue | 5.2.3 | 5.2.4 | **6.0.10** | Acompanha o vite. |
| sass | 1.86.0 | 1.105.2 | 1.105.2 | Baixo. Pode emitir avisos de deprecação (não verificado). |
| eslint / @eslint/js | 9.23.0 | 9.39.5 | **10.x** | Médio na 10. **Hoje o `npx eslint .` não roda**: falta a dependência par `vue-eslint-parser@^10`, que o `yarn install` já avisa. |
| eslint-plugin-vue | 10.0.0 | 10.0.1 | 10.11.1 | Baixo. |
| prettier | 3.5.3 (versão fixa) | — | 3.9.10 | Baixo; pode reformatar arquivos. Hoje `npx prettier --check src/` já acusa `src/stores/services.js`. |
| globals | 16.0.0 | 16.5.0 | 17.13.0 | Baixo. |
| sass-loader | 16.0.5 | — | 17.0.1 | **Não é usado** (é loader de webpack): remover não custa nada. |
| vite-plugin-vue-devtools | 7.7.2 | 7.7.10 | 8.2.1 | **Não é usado**: não é importado, só há o comentário em `vite.config.js:7`. Remover não custa nada; também dá para reativar. |
| Font Awesome (CDN) | 6.4.0 (`index.html:17`) | não verificado | não verificado | Baixa o `all.min.css` inteiro para 35 ícones (mais `fa-spin`). Trocar é mudança de dependência. |
| Material Symbols + MDI (CDN) | `index.html:13-15` | — | — | Só o `MiniCard`, que é órfão, usa. São dois requests sem uso. |

---

## Apêndice A — Contagens reproduzíveis

O script só lê arquivos. Rode na raiz do repositório depois de um `yarn build`, que é necessário para a última linha.

```bash
#!/bin/bash
shopt -s globstar
styles() { for f in src/**/*.vue; do awk '/<style/{s=1} s{print}' "$f"; done; }
echo "hex literais em <style> dos .vue: $(styles | grep -oE '#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b' | wc -l)"
echo "rgb()/rgba() com valores literais (sem rgba(var.\$x)): $(styles | grep -oP 'rgba?\((?!var\.)' | wc -l)"
echo "'white' nomeado (sem white-space): $(styles | grep -oP '\bwhite\b(?!-)' | wc -l)"
echo "valores distintos de border-radius: $(styles | grep -oE 'border-radius:[^;]+' | sed 's/border-radius: *//' | sort -u | wc -l)"
echo "valores distintos de box-shadow: $(styles | grep -oE 'box-shadow:[^;]+' | sed 's/box-shadow: *//' | sort -u | wc -l)"
echo "'transition: all': $(grep -rhoE 'transition: *all' src | wc -l)"
echo "media queries distintas: $(grep -rhoE '@media[^{]+' src | sed 's/ *$//' | sort -u | wc -l)"
echo ":focus-visible: $(grep -rho 'focus-visible' src | wc -l)"
echo "prefers-reduced-motion: $(grep -rho 'prefers-reduced-motion' src | wc -l)"
echo "tamanhos de fonte distintos em rem: $(styles | grep -oE 'font-size: *[0-9.]+rem' | sed 's/font-size: *//' | sort -u | wc -l)"
echo "tamanhos de fonte distintos em px: $(styles | grep -oE 'font-size: *[0-9.]+px' | sed 's/font-size: *//' | sort -u | wc -l) (declarações: $(styles | grep -oE 'font-size: *[0-9.]+px' | wc -l))"
echo "valores rem em padding/margin/gap: $(styles | grep -E '^\s*(padding|margin|gap)[a-z-]*:' | grep -oE '[0-9.]+rem' | wc -l)"
echo "valores px em padding/margin/gap: $(styles | grep -E '^\s*(padding|margin|gap)[a-z-]*:' | grep -oE '[0-9.]+px' | wc -l)"
echo "gradiente laranja 135deg repetido: $(styles | grep -cE 'linear-gradient\(135deg, *(#ff7b42|var\.\$btn-primary-bg|var\.\$secondary) 0%, *(#e66b32|var\.\$btn-primary-hover) 100%\)')"
n=0; for f in src/**/*.vue; do grep -q "sass:color" "$f" && ! grep -q "color\.[a-z]*(" "$f" && n=$((n+1)); done; echo "arquivos com @use 'sass:color' sem uso: $n"
[ -d dist ] && echo "reset no build (box-sizing:inherit): $(grep -o 'box-sizing:inherit' dist/assets/*.css | wc -l)"
```

Saída no commit `d6a5aea`:

```
hex literais em <style> dos .vue: 198
rgb()/rgba() com valores literais (sem rgba(var.$x)): 57
'white' nomeado (sem white-space): 39
valores distintos de border-radius: 12
valores distintos de box-shadow: 30
'transition: all': 40
media queries distintas: 7
:focus-visible: 0
prefers-reduced-motion: 0
tamanhos de fonte distintos em rem: 22
tamanhos de fonte distintos em px: 3 (declarações: 5)
valores rem em padding/margin/gap: 375
valores px em padding/margin/gap: 11
gradiente laranja 135deg repetido: 18
arquivos com @use 'sass:color' sem uso: 11
reset no build (box-sizing:inherit): 14
```

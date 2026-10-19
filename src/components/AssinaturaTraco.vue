<!--
  Assinatura de autoria · estilo Traço: o monograma se redesenha num único gesto de caneta, do alto do d à perna do K.
  Uso: <AssinaturaTraco tom="escuro" /> logo depois do rodapé, fora de contêineres com largura máxima.
  Vue 3 (ou 2.7). Sem dependências; o movimento é só CSS.
  Não edite o path do monograma (lib/marca.ts), o texto, o link nem o CSS.
-->
<script setup>
defineProps({
  /** 'claro' sob rodapé claro; 'escuro' sob rodapé escuro ou colorido. */
  tom: {
    type: String,
    default: 'claro',
    validator: (valor) => valor === 'claro' || valor === 'escuro',
  },
})
</script>

<template>
  <div class="ldk-traco" :data-tom="tom">
    <a
      class="ldk-traco__l"
      href="https://github.com/ldickmann"
      target="_blank"
      rel="noopener nofollow"
    >
      <svg class="ldk-traco__m" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path
          d="M21 7 V45 a9 12 0 0 1 -18 0 a9 12 0 0 1 18 0 V57 H43 V7 V31 L61 8 L43 31 L61 57"
          pathLength="100"
        />
      </svg>
      <span>Desenvolvimento por Lucas E. Dickmann</span
      ><span class="ldk-traco__sr"> (abre em nova aba)</span>
    </a>
  </div>
</template>

<!-- Global de propósito (sem scoped): as classes ldk-* já são exclusivas da assinatura. -->
<style>
.ldk-traco,
.ldk-traco * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}
.ldk-traco {
  --ldk-traco-bg: #f2f4f7;
  --ldk-traco-fg: #23262b;
  --ldk-traco-t: 0.65s;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  background: var(--ldk-traco-bg);
  color: var(--ldk-traco-fg);
  font:
    500 12.5px/1 system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    Ubuntu,
    sans-serif;
  letter-spacing: 0.02em;
}
.ldk-traco[data-tom='escuro'] {
  --ldk-traco-bg: #1b1d21;
  --ldk-traco-fg: #f3f4f6;
}
.ldk-traco__l {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 40px;
  padding: 0 12px;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
  outline: 0;
  border-radius: 3px;
  -webkit-tap-highlight-color: transparent;
}
.ldk-traco__l:focus-visible {
  outline: 2px solid var(--ldk-traco-fg);
  outline-offset: -5px;
}
.ldk-traco__l:active {
  --ldk-traco-t: 0.28s;
}
.ldk-traco__m {
  display: block;
  flex: none;
  width: 20px;
  height: 20px;
  overflow: visible;
}
.ldk-traco__m path {
  fill: none;
  stroke: currentColor;
  stroke-width: 5.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ldk-traco__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
@media (hover: hover) {
  .ldk-traco__l:hover .ldk-traco__m path {
    animation: ldk-traco-traco var(--ldk-traco-t) linear;
  }
}
.ldk-traco__l:is(:focus-visible, :active) .ldk-traco__m path {
  animation: ldk-traco-traco var(--ldk-traco-t) linear;
}
/* Desenha do alto do d à perna do K. A haste e o braço do K são percorridos duas vezes;
   nesses trechos (72,8–74,8% e 85,9–87,9%) a caneta só hesita, em vez de parar. */
@keyframes ldk-traco-traco {
  0% {
    stroke-dasharray: 100 300;
    stroke-dashoffset: 103;
  }
  1% {
    stroke-dashoffset: 100;
  }
  72.8% {
    stroke-dashoffset: 37.72;
  }
  74.8% {
    stroke-dashoffset: 29.78;
  }
  85.9% {
    stroke-dashoffset: 20.12;
  }
  87.9% {
    stroke-dashoffset: 10.46;
  }
  100% {
    stroke-dasharray: 100 300;
    stroke-dashoffset: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ldk-traco * {
    animation: none !important;
    transition: none !important;
  }
}
</style>

/* ============================================================
   script.js — Interações progressivas (vanilla, sem dependências)
   Tudo aqui é aprimoramento: o site funciona 100% sem JavaScript.
   ============================================================ */
(function () {
  'use strict';

  /* Indica que o JS está disponível (ativa as micro-interações no CSS) */
  document.body.classList.add('js');

  /* Ano atual dinâmico em todos os elementos com a classe .js-year */
  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(document.querySelectorAll('.js-year'), function (el) {
    el.textContent = year;
  });

  /* ---------- Revelação sutil ao entrar na viewport ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealNodes = document.querySelectorAll('.reveal');

  /* Sem suporte a IntersectionObserver ou com movimento reduzido: exibe tudo */
  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealNodes, function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  /* Atraso escalonado entre irmãos visuais (efeito cascata suave) */
  var orderByParent = new WeakMap();
  Array.prototype.forEach.call(revealNodes, function (el) {
    var count = orderByParent.get(el.parentElement) || 0;
    orderByParent.set(el.parentElement, count + 1);
    el.style.transitionDelay = Math.min(count * 70, 350) + 'ms';
  });

  var observer = new IntersectionObserver(function (entries) {
    Array.prototype.forEach.call(entries, function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  Array.prototype.forEach.call(revealNodes, function (el) {
    observer.observe(el);
  });
})();

// scripts.js - interação leve: menu, máscaras simples e validação
document.addEventListener('DOMContentLoaded', function () {

  /* =========================
     Ano automático no rodapé
  ========================== */
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year-2')?.textContent = y;
  document.getElementById('year-3')?.textContent = y;


  /* =========================
     Menu responsivo (toggle)
  ========================== */
  function toggleMenu(btnId, navId) {
    const btn = document.getElementById(btnId);
    const nav = document.getElementById(navId);

    if (!btn || !nav) return;

    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? 'none' : 'block';
    });

    // Fecha menu ao redimensionar
    window.addEventListener('resize', function () {
      if (window.innerWidth > 800) {
        nav.style.display = '';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.display = 'none';
      }
    });
  }

  toggleMenu('menu-toggle', 'main-nav');
  toggleMenu('menu-toggle-2', 'main-nav-2');
  toggleMenu('menu-toggle-3', 'main-nav-3');


  /* =========================
     Funções de Máscaras
  ========================== */
  function setMask(input, fn) {
    input.addEventListener('input', fn);
    input.addEventListener('blur', fn);
  }


  /* ===== CPF ===== */
  const cpfInput = document.getElementById('cpf');
  if (cpfInput) {
    setMask(cpfInput, function (e) {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);

      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');

      e.target.value = v;
    });
  }


  /* ===== Telefone ===== */
  const telInput = document.getElementById('telefone');
  if (telInput) {
    setMask(telInput, function (e) {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);

      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }

      e.target.value = v.trim().replace(/-$/, '');
    });
  }


  /* ===== CEP ===== */
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    setMask(cepInput, function (e) {
      let v = e.target.value.replace(/\D/g, '').slice(0, 8);
      v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
      e.target.value = v;
    });
  }


  /* =========================
     Validação do formulário
  ========================== */
  const form = document.getElementById('cadastroForm');

  if (form) {
    form.addEventListener('submit', function (ev) {

      if (!form.checkValidity()) {
        ev.preventDefault();

        const firstInvalid = form.querySelector(':invalid');

        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.setAttribute('aria-invalid', 'true');
          alert('Existem campos inválidos no formulário. Verifique e tente novamente.');
        }

      } else {
        ev.preventDefault();
        alert('Cadastro enviado com sucesso! (demo)');
        form.reset();
      }
    });
  }

});

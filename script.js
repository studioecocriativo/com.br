/* =============================
   Studio EcoCriativo - JS Interativo
   Desenvolvido com foco em UX/UI
   Última atualização: 2025
============================= */

/* ========== SCROLL PROGRESS BAR ========== */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.width = `${scrollPercent}%`;
});

/* ========== SCROLL REVEAL ========== */
const revealElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => observer.observe(el));

/* ========== FAQ ACCORDION ========== */
document.querySelectorAll(".faq-item .faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
    document.querySelectorAll(".faq-item").forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
  });
});

/* ========== VOLTAR AO TOPO ========== */
document.querySelector(".top-float").addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ========== FORMULÁRIO REDIRECIONA PARA WHATSAPP ========== */
const form = document.getElementById("form-orcamento");
form.addEventListener("submit", e => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const projeto = form.projeto.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !projeto || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const texto = `*Solicitação de Orçamento - Studio EcoCriativo*%0A
🧑 Nome: ${nome}%0A
📧 E-mail: ${email}%0A
📂 Tipo de Projeto: ${projeto}%0A
📝 Detalhes: ${mensagem}`;

  window.open(`https://wa.me/5512996500827?text=${encodeURI(texto)}`, "_blank");
});

/* ========== CARROSSEL (Depoimentos / Portfólio) ========== */
document.querySelectorAll(".carousel, .portfolio-scroll").forEach(container => {
  let isDown = false, startX, scrollLeft;
  container.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.classList.add("grabbing");
  });
  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("grabbing");
  });
  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("grabbing");
  });
  container.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });
});

/* ========== ELEMENTOS COM DELAY ========== */
const revealWithDelay = () => {
  const elements = document.querySelectorAll(".reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4");
  elements.forEach(el => {
    const delay = el.classList.contains("reveal-delay-4") ? 0.8 :
                  el.classList.contains("reveal-delay-3") ? 0.6 :
                  el.classList.contains("reveal-delay-2") ? 0.4 : 0.2;
    el.style.transitionDelay = `${delay}s`;
  });
};
document.addEventListener("DOMContentLoaded", revealWithDelay);

/* ========== ANIMAÇÃO DE FUNDO GRADIENTE ========== */
const gradientSections = document.querySelectorAll(".animated-gradient-bg");
let gradientIndex = 0;
setInterval(() => {
  gradientIndex++;
  gradientSections.forEach(section => {
    section.style.backgroundPosition = `${(gradientIndex % 100)}% 50%`;
  });
}, 100);

/* ========== RESIZE DETECTOR ========== */
window.addEventListener("resize", () => {
  document.body.classList.add("resized");
  setTimeout(() => document.body.classList.remove("resized"), 500);
});

/* ========== WHATSAPP CLICK LOG ========== */
document.querySelector(".whatsapp-float").addEventListener("click", () => {
  console.log("Usuário clicou no botão de WhatsApp.");
});

/* ========== SCROLL PARA SEÇÕES PELO MENU ========== */
document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetID = link.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetID);
    if (targetEl) {
      window.scrollTo({ top: targetEl.offsetTop - 80, behavior: "smooth" });
    }
  });
});

/* ========== LIGHTBOX NO PORTFÓLIO (ZOOM NA IMAGEM) ========== */
const modal = document.createElement("div");
modal.classList.add("lightbox-modal");
modal.innerHTML = `
  <div class="lightbox-content">
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Imagem ampliada" class="lightbox-img" />
  </div>
`;
document.body.appendChild(modal);

const lightboxImg = modal.querySelector(".lightbox-img");
const closeBtn = modal.querySelector(".lightbox-close");

document.querySelectorAll(".portfolio-scroll img").forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    modal.classList.add("open");
  });
});

closeBtn.addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

/* ========== DEBUG TOOL ========== */
if (window.location.hostname === "localhost") {
  console.log("%cStudio EcoCriativo JS FINALIZADO ✔️", "color: #C7B8EA; font-weight: bold;");
}
// ===== MENU HAMBÚRGUER =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navMenu.classList.toggle("show");
});

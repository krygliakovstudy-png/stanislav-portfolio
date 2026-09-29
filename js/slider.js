const slider = document.querySelector('.hero-slider');
const slides = [...slider.querySelectorAll('.slide')];
const dotsContainer = document.getElementById('sliderDots');
const pause = document.getElementById('pauseSlide');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0,
  paused = reducedMotion.matches,
  timer;
const dots = slides.map((slide, index) => {
  const dot = document.createElement('button');
  dot.className = 'slider-dot';
  dot.setAttribute(
    'aria-label',
    `Слайд ${index + 1}: ${slide.querySelector('h2').textContent}`,
  );
  dot.addEventListener('click', () => {
    showSlide(index);
    schedule();
  });
  dotsContainer.append(dot);
  return dot;
});
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
    slide.inert = i !== current;
    slide.setAttribute('aria-hidden', String(i !== current));
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
    dot.setAttribute('aria-pressed', String(i === current));
  });
}
function schedule() {
  clearInterval(timer);
  pause.setAttribute('aria-pressed', String(paused));
  pause.setAttribute(
    'aria-label',
    paused ? 'Запустить слайдер' : 'Остановить слайдер',
  );
  pause.textContent = paused ? '▷' : 'Ⅱ';
  if (
    !paused &&
    !document.hidden &&
    !slider.matches(':hover') &&
    !slider.contains(document.activeElement)
  )
    timer = setInterval(() => showSlide(current + 1), 5500);
}
document.getElementById('nextSlide').addEventListener('click', () => {
  showSlide(current + 1);
  schedule();
});
document.getElementById('prevSlide').addEventListener('click', () => {
  showSlide(current - 1);
  schedule();
});
pause.addEventListener('click', () => {
  paused = !paused;
  schedule();
});
slider.addEventListener('keydown', (e) => {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
    showSlide(current + (e.key === 'ArrowRight' ? 1 : -1));
  }
});
for (const type of ['mouseenter', 'mouseleave', 'focusin'])
  slider.addEventListener(type, schedule);
slider.addEventListener('focusout', () => setTimeout(schedule, 0));
document.addEventListener('visibilitychange', schedule);
reducedMotion.addEventListener('change', () => {
  paused = reducedMotion.matches;
  schedule();
});
let touchX;
slider.addEventListener(
  'touchstart',
  (e) => {
    touchX = e.changedTouches[0].clientX;
  },
  { passive: true },
);
slider.addEventListener(
  'touchend',
  (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      showSlide(current + (dx < 0 ? 1 : -1));
      schedule();
    }
  },
  { passive: true },
);
showSlide(0);
schedule();

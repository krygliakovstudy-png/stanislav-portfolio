const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const rules = {
  name: v => v.length >= 2 ? '' : 'Введите имя (минимум 2 символа).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Введите корректный email.',
  subject: v => ['3d','branding'].includes(v) ? '' : 'Выберите тему проекта.',
  message: v => v.length >= 10 ? '' : 'Расскажите подробнее (минимум 10 символов).'
};
function validate(name) {
  const input = form.elements[name];
  const error = rules[name](input.value.trim());
  document.getElementById(`${name}Error`).textContent = error;
  input.setAttribute('aria-invalid', String(Boolean(error)));
  input.closest('.form-row').classList.toggle('invalid', Boolean(error));
  return !error;
}
Object.keys(rules).forEach(name => {
  const input = form.elements[name];
  input.addEventListener('blur', () => validate(name));
  input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) validate(name); status.textContent = ''; });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const valid = Object.keys(rules).map(validate).every(Boolean);
  if (!valid) { status.textContent = 'Проверьте отмеченные поля.'; status.className = 'form-status error-status'; form.querySelector('[aria-invalid="true"]').focus(); return; }
  const values = Object.fromEntries(new FormData(form));
  const topic = form.elements.subject.selectedOptions[0].textContent;
  const text = `Заявка на проект\n\nИмя: ${values.name.trim()}\nEmail: ${values.email.trim()}\nТема: ${topic}\n\n${values.message.trim()}\n`;
  const url = URL.createObjectURL(new Blob(['\ufeff', text], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'project-request.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Заявка подготовлена к скачиванию. Она не отправлена: отправка из формы пока не подключена.';
  status.className = 'form-status success';
});

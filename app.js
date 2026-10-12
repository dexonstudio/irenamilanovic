const root = document.documentElement;
const langToggle = document.getElementById('langToggle');
let lang = 'de';

function applyLanguage(next){
  lang = next;
  root.lang = lang;
  root.dataset.lang = lang;
  document.querySelectorAll('[data-de][data-en]').forEach(el=>{
    el.textContent = el.dataset[lang];
  });
  langToggle.textContent = lang === 'de' ? 'EN' : 'DE';
  langToggle.setAttribute('aria-label', lang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln');
}
langToggle?.addEventListener('click',()=>applyLanguage(lang==='de'?'en':'de'));

const form = document.getElementById('demoForm');
form?.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(!form.checkValidity()){
    form.reportValidity();
    return;
  }
  const fd = new FormData(form);
  const subject = lang === 'de' ? 'Anfrage über BA Translations Website' : 'Inquiry via BA Translations website';
  const body = lang === 'de'
    ? `Name: ${fd.get('name')}\nE-Mail: ${fd.get('email')}\nSprachrichtung: ${fd.get('from')} → ${fd.get('to')}\nLeistung: ${fd.get('type')}\nZeitraum / Termin: ${fd.get('deadline') || '-'}\n\nWorum geht es?\n${fd.get('message')}`
    : `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nLanguage direction: ${fd.get('from')} → ${fd.get('to')}\nService: ${fd.get('type')}\nTimeframe / date: ${fd.get('deadline') || '-'}\n\nRequest:\n${fd.get('message')}`;
  window.location.href = `mailto:kontakt@irena-translates.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){
  const reveal = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('in-view'); reveal.unobserve(entry.target); }
  }),{threshold:.14});
  document.querySelectorAll('.service-item,.document-grid article,.deliverable-list>div,.process-steps li,.faq details').forEach(el=>reveal.observe(el));
}

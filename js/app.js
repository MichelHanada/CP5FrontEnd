const root=document.documentElement;
const mq=matchMedia('(prefers-color-scheme: dark)');
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

const applyTheme=()=>{
  const p=localStorage.getItem('tf-theme')||'system';
  root.classList.toggle('dark',p==='dark'||(p==='system'&&mq.matches));
  $$('[data-theme]').forEach(b=>{
    const on=b.dataset.theme===p;
    b.setAttribute('aria-pressed',on);
    b.classList.toggle('bg-cyan-600',on);
    b.classList.toggle('text-white',on);
  });
};
$$('[data-theme]').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('tf-theme',b.dataset.theme);applyTheme()}));
mq.addEventListener('change',applyTheme);
applyTheme();

const sidebar=$('#sidebar'),overlay=$('#overlay'),menuBtn=$('#menuBtn');
const setSidebar=o=>{
  sidebar.classList.toggle('-translate-x-full',!o);
  overlay.classList.toggle('opacity-0',!o);
  overlay.classList.toggle('pointer-events-none',!o);
  menuBtn.setAttribute('aria-expanded',o);
};
menuBtn.onclick=()=>setSidebar(sidebar.classList.contains('-translate-x-full'));
overlay.onclick=()=>setSidebar(false);

const dd=$('#userMenu'),ddBtn=$('#userBtn');
const setDd=o=>{dd.classList.toggle('hidden',!o);dd.classList.toggle('flex',o);ddBtn.setAttribute('aria-expanded',o)};
ddBtn.onclick=e=>{e.stopPropagation();setDd(dd.classList.contains('hidden'))};
document.addEventListener('click',e=>{if(!dd.contains(e.target))setDd(false)});

const modal=$('#modal'),form=$('#form'),submit=$('#submitBtn');
const setModal=o=>{
  modal.classList.toggle('hidden',!o);
  modal.classList.toggle('flex',o);
  if(!o){form.reset();touched.clear();checkAll()}
  else form.elements.name.focus();
};
$('#openModal').onclick=()=>setModal(true);
$('#closeModal').onclick=()=>setModal(false);
modal.addEventListener('click',e=>{if(e.target===modal)setModal(false)});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  setDd(false);setSidebar(false);setModal(false);
});

const icons={Infraestrutura:'☁️',Desenvolvimento:'💻',Dados:'🗄️','UX/UI':'🎨',Segurança:'🔐'};
const prio={Alta:'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',Média:'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',Baixa:'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'};
const spans=['sm:col-span-2 lg:row-span-2','','','sm:col-span-2','sm:col-span-2','sm:col-span-2'];
const projects=[
  {name:'Migração para AWS',category:'Infraestrutura',owner:'Michel',priority:'Alta',due:'2026-11-20',progress:72,desc:'Migração dos serviços legados para a nuvem com zero downtime, IaC com Terraform e monitoramento contínuo.'},
  {name:'API Gateway v2',category:'Desenvolvimento',owner:'Marcos',priority:'Média',due:'2026-12-05',progress:45,desc:'Nova API REST com autenticação JWT.'},
  {name:'UI Kit React',category:'UX/UI',owner:'Felipe',priority:'Baixa',due:'2026-12-18',progress:30,desc:'Biblioteca de componentes unificada.'},
  {name:'Pipeline CI/CD',category:'Infraestrutura',owner:'Michel',priority:'Alta',due:'2026-11-12',progress:88,desc:'Testes automatizados e deploy contínuo para todas as equipes de desenvolvimento.'},
  {name:'Auditoria de Segurança',category:'Segurança',owner:'Marcos',priority:'Alta',due:'2027-01-10',progress:15,desc:'Revisão de acessos, dependências e vulnerabilidades (OWASP).'},
  {name:'Data Lake Analytics',category:'Dados',owner:'Felipe',priority:'Média',due:'2027-02-01',progress:55,desc:'Ingestão e painéis de BI com dados em tempo real.'}
];

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=d=>d.split('-').reverse().join('/');

const card=(p,i)=>`
<article data-name="${esc(p.name.toLowerCase())}" class="group ${spans[i]||''} rise flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-[#0d1424]">
  <div class="flex items-start justify-between gap-2"><span class="text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">${icons[p.category]}</span><span class="rounded-full px-2.5 py-1 text-xs font-medium ${prio[p.priority]}">${p.priority}</span></div>
  <div><h3 class="font-bold">${esc(p.name)}</h3><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">${esc(p.desc)}</p></div>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between text-xs text-slate-500"><span>${p.category}</span><span>${p.progress}%</span></div>
    <div class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-700" style="width:${p.progress}%"></div></div>
    <div class="flex items-center justify-between text-xs text-slate-500"><span>👤 ${esc(p.owner)} · ${fmt(p.due)}</span><span class="translate-x-2 text-cyan-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-cyan-300">Abrir →</span></div>
  </div>
</article>`;

const grid=$('#grid');
const render=()=>{
  grid.innerHTML=projects.map(card).join('');
  $('#statActive').textContent=projects.length;
  filter();
};
const filter=()=>{
  const q=$('#search').value.trim().toLowerCase();
  let shown=0;
  $$('#grid article').forEach(a=>{const ok=a.dataset.name.includes(q);a.classList.toggle('hidden',!ok);if(ok)shown++});
  $('#empty').classList.toggle('hidden',shown>0);
};
$('#search').addEventListener('input',filter);

const today=()=>new Date().toISOString().slice(0,10);
const rules={
  name:v=>v.trim().length<3?'Mínimo de 3 caracteres':'',
  owner:v=>v?'':'Selecione um responsável',
  category:v=>v?'':'Selecione uma categoria',
  priority:v=>v?'':'Escolha uma prioridade',
  due:v=>!v?'Informe o prazo':v<today()?'O prazo não pode estar no passado':'',
  desc:v=>v.trim().length<10?'Descreva em pelo menos 10 caracteres':''
};
const touched=new Set();
const check=n=>{
  const el=form.elements[n],m=rules[n](el.value),show=touched.has(n);
  const err=$(`[data-err="${n}"]`);
  err.textContent=m;
  err.classList.toggle('hidden',!m||!show);
  if(el.tagName){
    el.classList.toggle('border-rose-500',!!m&&show);
    el.classList.toggle('border-emerald-500',!m&&show);
  }
  return !m;
};
const checkAll=()=>{
  const ok=Object.keys(rules).map(n=>check(n)).every(Boolean);
  submit.disabled=!ok;
  return ok;
};
form.addEventListener('input',e=>{touched.add(e.target.name);checkAll()});
form.addEventListener('focusout',e=>{if(e.target.name){touched.add(e.target.name);checkAll()}});
form.addEventListener('submit',e=>{
  e.preventDefault();
  Object.keys(rules).forEach(n=>touched.add(n));
  if(!checkAll())return;
  const f=form.elements;
  projects.push({name:f.name.value.trim(),category:f.category.value,owner:f.owner.value,priority:f.priority.value,due:f.due.value,progress:0,desc:f.desc.value.trim()});
  setModal(false);
  render();
  const t=$('#toast');
  t.classList.remove('opacity-0','translate-y-4');
  setTimeout(()=>t.classList.add('opacity-0','translate-y-4'),2500);
});

render();
checkAll();

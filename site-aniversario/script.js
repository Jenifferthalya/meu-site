'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* MÚSICA: cole aqui o link da faixa no Spotify (Compartilhar > Copiar link da música). Ex.: https://open.spotify.com/track/XXXXXXXX
   Com o link preenchido, o player do Spotify aparece embutido (a música só toca quando a pessoa clicar em play). */
const SPOTIFY_URL='https://open.spotify.com/track/2AmlCuy1DBxmjxmfY4h463?si=hLwMZYPLRxGgwqozLyYCFA&utm_source=copy-link';
const sm=SPOTIFY_URL.match(/spotify\.com\/(?:intl-[a-z]+\/)?track\/([A-Za-z0-9]+)/);
if(sm){$('#cta').href='https://open.spotify.com/track/'+sm[1];
  $('#sp').innerHTML=`<iframe title="Player do Spotify" src="https://open.spotify.com/embed/track/${sm[1]}" width="100%" height="152" style="border:0;margin-bottom:14px" allow="encrypted-media; clipboard-write" loading="lazy"></iframe>`}
/* Entrada dos elementos ao rolar */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('vis')),{threshold:.2});$$('[data-fx]').forEach(el=>io.observe(el));
/* Transição: a capa esmaece gradualmente ao rolar, revelando a geladeira */
const cover=$('#cover');let tk=false;
if(!calm)addEventListener('scroll',()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{const p=Math.min(1,Math.max(0,scrollY/(cover.offsetHeight*.9)));cover.style.opacity=1-p*.85;$$('.big').forEach((b,i)=>b.style.transform=`translateY(${(i?-1:1)*p*60}px)`);tk=false})},{passive:true});
/* Geladeira: ampliar foto ao clicar (fecha com Esc, clique fora ou ×) */
const lb=$('#lb'),lbi=$('#lb img'),lbc=$('#lb figcaption');let last=null;
$$('.ph').forEach(b=>b.onclick=()=>{last=b;const im=b.querySelector('img');lbi.src=im.src;lbi.alt=im.alt;lbi.style.filter=b.classList.contains('bw')?'grayscale(1)':'';lbc.textContent=b.dataset.cap||'';lb.hidden=false;$('#lbx').focus()});
const closeLb=()=>{lb.hidden=true;last&&last.focus()};$('#lbx').onclick=closeLb;lb.onclick=e=>{if(e.target===lb)closeLb()};addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)closeLb()});
/* Carta: o selo some, a aba abre, a carta desliza e o texto aparece aos poucos */
const env=$('#env');
env.onclick=()=>{if(env.classList.contains('open'))return;env.classList.add('open');env.setAttribute('aria-expanded','true');$('#hint').textContent='';
  setTimeout(()=>$('#letterText').classList.add('go'),calm?100:2600);
  $$('#letterText>*').forEach((el,i)=>el.style.transitionDelay=(i*.55)+'s')};

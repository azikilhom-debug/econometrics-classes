
(() => {
  const slides=[...document.querySelectorAll('.lesson-slide')];
  if(!slides.length) return;
  let i=0;
  const current=document.getElementById('currentSlide'), total=document.getElementById('totalSlides');
  const bar=document.getElementById('progressBar');
  const prev=document.getElementById('prevBtn'), next=document.getElementById('nextBtn');
  if(total) total.textContent=slides.length;
  function show(n){
    i=Math.max(0,Math.min(slides.length-1,n));
    slides.forEach((s,j)=>s.classList.toggle('active',j===i));
    if(current) current.textContent=i+1;
    if(bar) bar.style.width=((i+1)/slides.length*100)+'%';
    if(prev) prev.disabled=i===0;
    if(next) next.disabled=i===slides.length-1;
    window.scrollTo({top:0,behavior:'instant'});
  }
  prev?.addEventListener('click',()=>show(i-1)); next?.addEventListener('click',()=>show(i+1));
  document.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(i+1)} if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(i-1)}});
  let sx=null; document.addEventListener('touchstart',e=>{sx=e.changedTouches[0].screenX},{passive:true}); document.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].screenX-sx;if(Math.abs(dx)>70) show(i+(dx<0?1:-1));sx=null},{passive:true});
  show(0);
})();

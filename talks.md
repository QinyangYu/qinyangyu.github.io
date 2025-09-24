---
layout: subpage
title: "Talks"
permalink: /talks/
---

# Conferences
### Who Gets the Blame? A Structural Theory of Scapegoating in Social Networks
- Submitted to NetSciX 2026 - International School and Conference on Network Science
- Submitted to Complex Networks 2025 - The 14th International Conference on Complex Networks and their Applications
- Accepted for Presentation at 2025 Missouri Valley Economic Association (MVEA) Annual Meeting
- Accepted for Presentation at 2025 Gulf Coast Undergraduate Research Symposium (GCURS), Rice University  


### Pension Policy as a Pathway to Happiness: Insights from China’s New Rural Pension Scheme  
- Presented at the 2025 Academic Annual Conference of the Chinese Sociological Association
- Presented at the 2024 Gulf Coast Undergraduate Research Symposium (GCURS), Rice University  
- Presented at the 2024 Master’s Research Seminar, EMAC, Duke University  

<!-- ======== Talks 相册滑块（统一风格版） ======== -->
<div class="mini-slider talks" aria-label="Talks photo slider">
  <div class="track">
    <img class="slide" src="/files/talks/Pre1.jpg" alt="Pre1" loading="lazy">
    <img class="slide" src="/files/talks/Pre4.jpg" alt="Pre4" loading="lazy">
    <img class="slide" src="/files/talks/Pre2.jpg" alt="Pre2" loading="lazy">
    <img class="slide" src="/files/talks/Pre5.jpg" alt="Pre5" loading="lazy">
  </div>
  <button class="nav prev" aria-label="Previous image">‹</button>
  <button class="nav next" aria-label="Next image">›</button>
  <div class="dots" role="tablist" aria-label="Slides pagination"></div>
</div>

<style>
/* —— Talks 相册滑块 —— */
.mini-slider.talks{
  --img-max-h: 360px;
  position:relative;
  background:#fafafa;
  border:1px solid #eee;
  border-radius:10px;
  padding:12px 12px 44px;
  box-shadow:0 1px 6px rgba(0,0,0,.06);
  text-align:center;
  max-width:55%;       /* 整体宽度控制 */
  margin:20px auto;
  overflow:hidden;
}
.mini-slider.talks .track{
  position:relative;
  display:block;
  min-height:60px;
}
.mini-slider.talks .track > img{
  display:none;
  width:auto; height:auto;
  max-width:100%;
  max-height:var(--img-max-h);
  border-radius:8px;
  margin:0 auto;
  user-select:none;
}
.mini-slider.talks .track > img.active{ display:block; }

.mini-slider.talks .nav{
  position:absolute;
  top:50%; transform:translateY(-50%);
  width:38px; height:38px;
  border:none; border-radius:50%;
  background:rgba(0,0,0,.45);
  color:#fff; font-size:20px; line-height:38px;
  cursor:pointer; transition:opacity .15s ease;
}
.mini-slider.talks .nav:hover{ opacity:.9; }
.mini-slider.talks .prev{ left:8px; }
.mini-slider.talks .next{ right:8px; }

.mini-slider.talks .dots{
  position:absolute;
  left:0; right:0; bottom:8px;
  display:flex; gap:6px; justify-content:center;
}
.mini-slider.talks .dots button{
  width:8px; height:8px; border-radius:50%;
  border:none; background:#cfcfcf; cursor:pointer;
}
.mini-slider.talks .dots button.active{ background:#333; }

@media (max-width:768px){
  .mini-slider.talks{ max-width:92%; --img-max-h: 240px; }
}
</style>

<script>
(function(){
  const slider = document.querySelector('.mini-slider.talks');
  if(!slider) return;
  setupSlider(slider);

  function setupSlider(slider){
    const imgs = Array.from(slider.querySelectorAll('.track .slide'));
    const dotsWrap = slider.querySelector('.dots');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    if(!imgs.length){ prevBtn.disabled=nextBtn.disabled=true; return; }

    imgs.forEach((_,idx)=>{
      const b=document.createElement('button');
      b.setAttribute('role','tab');
      b.setAttribute('aria-label','Go to slide ' + (idx+1));
      b.addEventListener('click',()=>show(idx));
      dotsWrap.appendChild(b);
    });

    let i=0, lock=false;
    const guard = fn => { if(lock) return; lock=true; fn(); setTimeout(()=>lock=false,150); };

    function show(n){
      i=(n+imgs.length)%imgs.length;
      imgs.forEach((img,idx)=>{
        img.classList.toggle('active', idx===i);
        img.setAttribute('aria-hidden', idx===i ? 'false' : 'true');
      });
      dotsWrap.querySelectorAll('button').forEach((d,idx)=>d.classList.toggle('active', idx===i));
    }

    prevBtn.addEventListener('click', ()=> guard(()=>show(i-1)));
    nextBtn.addEventListener('click', ()=> guard(()=>show(i+1)));
    imgs.forEach(img=>{
      img.addEventListener('click', ()=> guard(()=>show(i+1)));
      img.addEventListener('dragstart', e=> e.preventDefault());
    });

    slider.setAttribute('tabindex','0');
    slider.addEventListener('keydown', e=>{
      if(e.key==='ArrowLeft'){ e.preventDefault(); guard(()=>show(i-1)); }
      if(e.key==='ArrowRight'){ e.preventDefault(); guard(()=>show(i+1)); }
    });

    show(0);
  }
})();
</script>

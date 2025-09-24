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

<!-- ======== Talks 相册滑块（固定高度 + 交叉淡入，无白屏） ======== -->
<div class="mini-slider talks" aria-label="Talks photo slider">
  <div class="track">
    <!-- 首张不 lazy，避免首击等待 -->
    <img class="slide" src="/files/talks/Pre1.jpg" alt="Pre1">
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
  --img-max-h: 360px;          /* 统一可视高度，按需调整 */
  position:relative;
  background:#fafafa;
  border:1px solid #eee;
  border-radius:10px;
  padding:12px 12px 44px;
  box-shadow:0 1px 6px rgba(0,0,0,.06);
  text-align:center;
  max-width:55%;
  margin:20px auto;
  overflow:hidden;
}

/* 固定轨道高度，杜绝高度跳动 */
.mini-slider.talks .track{
  position:relative;
  height:var(--img-max-h);
}

/* 绝对定位到画布中央；仅做透明度切换 */
.mini-slider.talks .track > img{
  position:absolute;
  inset:0;
  margin:auto;
  max-width:100%;
  max-height:100%;
  width:auto; height:auto;
  object-fit:contain;
  border-radius:8px;
  user-select:none;
  opacity:0;
  transition:opacity .2s ease;
  will-change:opacity;
}
.mini-slider.talks .track > img.active{ opacity:1; }

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

  const imgs = Array.from(slider.querySelectorAll('.track .slide'));
  const dotsWrap = slider.querySelector('.dots');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  if(!imgs.length){ prevBtn.disabled = nextBtn.disabled = true; return; }

  // 圆点
  imgs.forEach((_,idx)=>{
    const b=document.createElement('button');
    b.setAttribute('role','tab');
    b.setAttribute('aria-label','Go to slide ' + (idx+1));
    b.addEventListener('click',()=>queueShow(idx));
    dotsWrap.appendChild(b);
  });

  let i=0, lock=false;
  const guard = fn => { if(lock) return; lock=true; fn(); setTimeout(()=>lock=false,150); };

  function setActive(idx){
    imgs.forEach((img,k)=>{
      img.classList.toggle('active', k===idx);
      img.setAttribute('aria-hidden', k===idx ? 'false' : 'true');
    });
    dotsWrap.querySelectorAll('button').forEach((d,k)=>d.classList.toggle('active', k===idx));
    i = idx;
    preload((idx+1)%imgs.length);
  }

  // 仅当目标图加载完成后切换（避免白屏）
  function queueShow(target){
    const t = (target + imgs.length) % imgs.length;
    const img = imgs[t];
    if (img.complete && img.naturalWidth){
      setActive(t);
    } else {
      const onload = ()=>{ img.removeEventListener('load', onload); setActive(t); };
      img.addEventListener('load', onload, { once:true });
      // 触发加载（多数浏览器不需要，但更稳）
      img.decoding = 'async';
      img.loading = img.getAttribute('loading') || 'eager';
      img.src = img.src;
    }
  }

  function preload(idx){
    const img = imgs[idx];
    if (!img || (img.complete && img.naturalWidth)) return;
    const pre = new Image();
    pre.decoding = 'async';
    pre.src = img.getAttribute('src');
  }

  prevBtn.addEventListener('click', ()=> guard(()=>queueShow(i-1)));
  nextBtn.addEventListener('click', ()=> guard(()=>queueShow(i+1)));

  slider.setAttribute('tabindex','0');
  slider.addEventListener('keydown', e=>{
    if(e.key==='ArrowLeft'){ e.preventDefault(); guard(()=>queueShow(i-1)); }
    if(e.key==='ArrowRight'){ e.preventDefault(); guard(()=>queueShow(i+1)); }
  });

  // 初始化
  imgs[0].classList.add('active');
  imgs[0].setAttribute('aria-hidden','false');
  dotsWrap.querySelectorAll('button')[0]?.classList.add('active');
  preload(1);
})();
</script>

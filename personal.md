---
layout: subpage
title: "Personal"
permalink: /personal/
---

# My Experimental Kitchen Lab
Beyond academic research, I am also a passionate culinary researcher. In my personal food lab, I experiment with diverse ingredients and explore cuisines from around the world, creating flavors just as a scientist creates theories. Might fail, but always fun!

<!-- ======== 四宫格迷你滑块（原始比例 + 超出自适配） ======== -->
<div class="grid4">
  <!-- A -->
  <div class="mini-slider" aria-label="Italian, French, and American Food slider">
    <h3 class="slider-title">Italian, French, and American Food</h3>
    <div class="track">
      <img src="/files/personal/a1.jpg"  alt="a1"  loading="lazy">
      <img src="/files/personal/a2.jpg"  alt="a2"  loading="lazy">
      <img src="/files/personal/a3.jpg"  alt="a3"  loading="lazy">
      <img src="/files/personal/a4.jpg"  alt="a4"  loading="lazy">
      <img src="/files/personal/a5.jpg"  alt="a5"  loading="lazy">
      <img src="/files/personal/a6.jpg"  alt="a6"  loading="lazy">
      <img src="/files/personal/a7.jpg"  alt="a7"  loading="lazy">
      <img src="/files/personal/a8.jpg"  alt="a8"  loading="lazy">
      <img src="/files/personal/a9.jpg"  alt="a9"  loading="lazy">
      <img src="/files/personal/a10.jpg" alt="a10" loading="lazy">
      <img src="/files/personal/a11.jpg" alt="a11" loading="lazy">
      <img src="/files/personal/a12.jpg" alt="a12" loading="lazy">
      <img src="/files/personal/a13.jpg" alt="a13" loading="lazy">
      <img src="/files/personal/a14.jpg" alt="a14" loading="lazy">
    </div>
    <button class="nav prev" aria-label="Previous image">‹</button>
    <button class="nav next" aria-label="Next image">›</button>
    <div class="dots" role="tablist" aria-label="Slides pagination"></div>
  </div>

  <!-- B -->
  <div class="mini-slider" aria-label="Chinese and Japanese Food slider">
    <h3 class="slider-title">Chinese and Japanese Food</h3>
    <div class="track">
      <img src="/files/personal/b1.jpg" alt="b1" loading="lazy">
      <img src="/files/personal/b2.jpg" alt="b2" loading="lazy">
      <img src="/files/personal/b3.jpg" alt="b3" loading="lazy">
      <img src="/files/personal/b4.jpg" alt="b4" loading="lazy">
      <img src="/files/personal/b5.jpg" alt="b5" loading="lazy">
      <img src="/files/personal/b6.jpg" alt="b6" loading="lazy">
    </div>
    <button class="nav prev" aria-label="Previous image">‹</button>
    <button class="nav next" aria-label="Next image">›</button>
    <div class="dots" role="tablist" aria-label="Slides pagination"></div>
  </div>

  <!-- C -->
  <div class="mini-slider" aria-label="How to make a pizza? slider">
    <h3 class="slider-title">How to make a pizza?</h3>
    <div class="track">
      <img src="/files/personal/c1.jpg" alt="c1" loading="lazy">
      <img src="/files/personal/c2.jpg" alt="c2" loading="lazy">
      <img src="/files/personal/c3.jpg" alt="c3" loading="lazy">
      <img src="/files/personal/c4.jpg" alt="c4" loading="lazy">
      <img src="/files/personal/c5.jpg" alt="c5" loading="lazy">
      <img src="/files/personal/c6.jpg" alt="c6" loading="lazy">
      <img src="/files/personal/c7.jpg" alt="c7" loading="lazy">
    </div>
    <button class="nav prev" aria-label="Previous image">‹</button>
    <button class="nav next" aria-label="Next image">›</button>
    <div class="dots" role="tablist" aria-label="Slides pagination"></div>
  </div>

  <!-- D -->
  <div class="mini-slider" aria-label="How to make Chinese dumplings? slider">
    <h3 class="slider-title">How to make Chinese dumplings?</h3>
    <div class="track">
      <img src="/files/personal/d1.jpg"  alt="d1"  loading="lazy">
      <img src="/files/personal/d2.jpg"  alt="d2"  loading="lazy">
      <img src="/files/personal/d3.jpg"  alt="d3"  loading="lazy">
      <img src="/files/personal/d4.jpg"  alt="d4"  loading="lazy">
      <img src="/files/personal/d5.jpg"  alt="d5"  loading="lazy">
      <img src="/files/personal/d6.jpg"  alt="d6"  loading="lazy">
      <img src="/files/personal/d7.jpg"  alt="d7"  loading="lazy">
      <img src="/files/personal/d8.jpg"  alt="d8"  loading="lazy">
      <img src="/files/personal/d9.jpg"  alt="d9"  loading="lazy">
      <img src="/files/personal/d10.jpg" alt="d10" loading="lazy">
      <img src="/files/personal/d11.jpg" alt="d11" loading="lazy">
      <img src="/files/personal/d12.jpg" alt="d12" loading="lazy">
    </div>
    <button class="nav prev" aria-label="Previous image">‹</button>
    <button class="nav next" aria-label="Next image">›</button>
    <div class="dots" role="tablist" aria-label="Slides pagination"></div>
  </div>
</div>

<style>
.grid4{
  display:grid;
  grid-template-columns:repeat(2, minmax(280px, 1fr));
  gap:28px;
  max-width:1100px;
  margin:28px auto;
}
.mini-slider{
  /* 可调：限制图片最高显示高度，避免超长图 */
  --img-max-h: 360px;

  position:relative;
  background:#fafafa;
  border:1px solid #eee;
  border-radius:10px;
  padding:12px 12px 44px;
  box-shadow:0 1px 6px rgba(0,0,0,.06);
  text-align:center;
  overflow:hidden;
}
.slider-title{
  font-size:1.05rem;
  font-weight:600;
  margin:0 0 12px;
}

/* 居中容器，不裁剪；高度随内容而变 */
.mini-slider .track{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  min-height:60px;
}

/* 核心：保持原始比例；小图不放大；大图缩小到容器内 */
.mini-slider .track > img{
  display:none;
  width:auto;            /* 不强制铺满 */
  height:auto;           /* 维持比例 */
  max-width:100%;        /* 宽度不超过卡片 */
  max-height:var(--img-max-h); /* 可调上限，避免过高 */
  border-radius:8px;
  user-select:none;
  margin:0 auto;
}
.mini-slider .track > img.active{ display:block; }

.mini-slider .nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:38px; height:38px;
  border:none; border-radius:50%;
  background:rgba(0,0,0,.45);
  color:#fff; font-size:20px; line-height:38px;
  cursor:pointer;
  transition:opacity .15s ease;
}
.mini-slider .nav:hover{ opacity:.9; }
.mini-slider .prev{ left:8px; }
.mini-slider .next{ right:8px; }

.mini-slider .dots{
  position:absolute;
  left:0; right:0; bottom:8px;
  display:flex; gap:6px; justify-content:center;
}
.mini-slider .dots button{
  width:8px; height:8px; border-radius:50%;
  border:none; background:#cfcfcf; cursor:pointer;
}
.mini-slider .dots button.active{ background:#333; }

@media (max-width: 720px){
  .grid4{ grid-template-columns:1fr; }
  .mini-slider{ --img-max-h: 260px; } /* 移动端略收一点高度 */
}
</style>

<script>
(function(){
  document.querySelectorAll('.mini-slider').forEach(setupSlider);

  function setupSlider(slider){
    const imgs = Array.from(slider.querySelectorAll('.track img'));
    const dotsWrap = slider.querySelector('.dots');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    if (!imgs.length){
      prevBtn.disabled = true; nextBtn.disabled = true;
      return;
    }

    imgs.forEach((_,idx)=>{
      const b=document.createElement('button');
      b.setAttribute('role','tab');
      b.setAttribute('aria-label','Go to slide ' + (idx+1));
      b.addEventListener('click',()=>show(idx));
      dotsWrap.appendChild(b);
    });

    let i=0, lock=false;
    const guarded = fn => { if(lock) return; lock=true; fn(); setTimeout(()=>lock=false,150); };

    function show(n){
      i=(n+imgs.length)%imgs.length;
      imgs.forEach((img,idx)=>{
        img.classList.toggle('active', idx===i);
        img.setAttribute('aria-hidden', idx===i ? 'false' : 'true');
      });
      dotsWrap.querySelectorAll('button').forEach((d,idx)=>d.classList.toggle('active', idx===i));
    }

    prevBtn.addEventListener('click', ()=> guarded(()=>show(i-1)));
    nextBtn.addEventListener('click', ()=> guarded(()=>show(i+1)));
    imgs.forEach(img=>{
      img.addEventListener('click', ()=> guarded(()=>show(i+1)));
      img.addEventListener('dragstart', e=> e.preventDefault());
    });

    slider.setAttribute('tabindex','0');
    slider.addEventListener('keydown', e=>{
      if(e.key==='ArrowLeft'){ e.preventDefault(); guarded(()=>show(i-1)); }
      if(e.key==='ArrowRight'){ e.preventDefault(); guarded(()=>show(i+1)); }
    });

    show(0);
  }
})();
</script>


<br>
---



# Literature & Compositions
### My Childhood Composition Collections:
[My compositions in primary school](https://drive.google.com/open?id=1_niWxb7tZWgJRS9MDL2hWbvonDqckOg8&usp=drive_copy)  
[My compositions in junior high school](https://drive.google.com/open?id=12SsCkEP6_1uGnqcgXEG_JX5yQidzEuyw&usp=drive_copy)  
[My compositions in senior high school](https://drive.google.com/open?id=1Ziun7v1DAFD1EacY_lEulgkskddGpwLt&usp=drive_copy)  

### My Spirit Book:
The Baron in the Trees (Il barone rampante) by Italo Calvino

<img src="/files/personal/barons.jpg" alt="The Baron in the Trees" style="max-width:220px; height:auto; border-radius:8px; display:block; margin:20px auto;">



<br>
---

# Music & Piano Playing
I have a strong appreciation for pop music and live performances, enjoy learning vocal techniques, watch reaction videos from YouTube or Bilibili, and occasionally offer improvised piano accompaniment. Below are a few glimpses of my piano playing. 

<!-- ======== Video Two-Column Grid ======== -->
<div class="video-grid">
  <!-- Video 1 -->
  <div class="video-card">
    <h3 class="video-title">The Butterfly Lovers</h3>
    <video controls>
      <source src="/files/personal/The Butterfly Lovers.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Video 2 -->
  <div class="video-card">
    <h3 class="video-title">Murmures</h3>
    <video controls>
      <source src="/files/personal/Murmures.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<style>
.video-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  max-width: 1100px;
  margin: 30px auto;
}
.video-card{
  background:#fafafa;
  border:1px solid #eee;
  border-radius:10px;
  padding:16px;
  box-shadow:0 1px 6px rgba(0,0,0,.08);
  text-align:center;
}
.video-title{
  font-size:1.05rem;
  font-weight:600;
  margin:0 0 12px;
}
.video-card video{
  width:100%;
  border-radius:8px;
  outline:none;
}
@media (max-width: 768px){
  .video-grid{ grid-template-columns: 1fr; }
}
</style>


---
layout: subpage
title: "Personal"
permalink: /personal/
---

# My Food Lab
### Who Gets the Blame? A Structural Theory of Scapegoating in Social Networks
- Submitted to NetSciX 2026 - International School and Conference on Network Science
- Submitted to Complex Networks 2025 - The 14th International Conference on Complex Networks and their Applications
- Accepted for Presentation at 2025 Missouri Valley Economic Association (MVEA) Annual Meeting
- Accepted for Presentation at 2025 Gulf Coast Undergraduate Research Symposium (GCURS), Rice University  


### Pension Policy as a Pathway to Happiness: Insights from China’s New Rural Pension Scheme  
- Presented at the 2025 Academic Annual Conference of the Chinese Sociological Association
- Presented at the 2024 Gulf Coast Undergraduate Research Symposium (GCURS), Rice University  
- Presented at the 2024 Master’s Research Seminar, EMAC, Duke University  

<!-- 4 格独立轮播 -->
<div class="grid4">
  <!-- A: a1 - a14 -->
  <div class="mini-slider">
    <div class="track">
      <img src="/files/personal/a1.jpg"  alt="a1">
      <img src="/files/personal/a2.jpg"  alt="a2">
      <img src="/files/personal/a3.jpg"  alt="a3">
      <img src="/files/personal/a4.jpg"  alt="a4">
      <img src="/files/personal/a5.jpg"  alt="a5">
      <img src="/files/personal/a6.jpg"  alt="a6">
      <img src="/files/personal/a7.jpg"  alt="a7">
      <img src="/files/personal/a8.jpg"  alt="a8">
      <img src="/files/personal/a9.jpg"  alt="a9">
      <img src="/files/personal/a10.jpg" alt="a10">
      <img src="/files/personal/a11.jpg" alt="a11">
      <img src="/files/personal/a12.jpg" alt="a12">
      <img src="/files/personal/a13.jpg" alt="a13">
      <img src="/files/personal/a14.jpg" alt="a14">
    </div>
    <button class="nav prev">‹</button>
    <button class="nav next">›</button>
    <div class="dots"></div>
  </div>

  <!-- B: b1 - b6 -->
  <div class="mini-slider">
    <div class="track">
      <img src="/files/personal/b1.jpg" alt="b1">
      <img src="/files/personal/b2.jpg" alt="b2">
      <img src="/files/personal/b3.jpg" alt="b3">
      <img src="/files/personal/b4.jpg" alt="b4">
      <img src="/files/personal/b5.jpg" alt="b5">
      <img src="/files/personal/b6.jpg" alt="b6">
    </div>
    <button class="nav prev">‹</button>
    <button class="nav next">›</button>
    <div class="dots"></div>
  </div>

  <!-- C: c1 - c7 -->
  <div class="mini-slider">
    <div class="track">
      <img src="/files/personal/c1.jpg" alt="c1">
      <img src="/files/personal/c2.jpg" alt="c2">
      <img src="/files/personal/c3.jpg" alt="c3">
      <img src="/files/personal/c4.jpg" alt="c4">
      <img src="/files/personal/c5.jpg" alt="c5">
      <img src="/files/personal/c6.jpg" alt="c6">
      <img src="/files/personal/c7.jpg" alt="c7">
    </div>
    <button class="nav prev">‹</button>
    <button class="nav next">›</button>
    <div class="dots"></div>
  </div>

  <!-- D: d1 - d12 -->
  <div class="mini-slider">
    <div class="track">
      <img src="/files/personal/d1.jpg"  alt="d1">
      <img src="/files/personal/d2.jpg"  alt="d2">
      <img src="/files/personal/d3.jpg"  alt="d3">
      <img src="/files/personal/d4.jpg"  alt="d4">
      <img src="/files/personal/d5.jpg"  alt="d5">
      <img src="/files/personal/d6.jpg"  alt="d6">
      <img src="/files/personal/d7.jpg"  alt="d7">
      <img src="/files/personal/d8.jpg"  alt="d8">
      <img src="/files/personal/d9.jpg"  alt="d9">
      <img src="/files/personal/d10.jpg" alt="d10">
      <img src="/files/personal/d11.jpg" alt="d11">
      <img src="/files/personal/d12.jpg" alt="d12">
    </div>
    <button class="nav prev">‹</button>
    <button class="nav next">›</button>
    <div class="dots"></div>
  </div>
</div>

<style>
/* 容器为 2x2 四宫格，响应式 */
.grid4{
  display:grid;
  grid-template-columns:repeat(2, minmax(280px, 1fr));
  gap:28px;
  max-width:1100px;
  margin:28px auto;
}

/* 单个滑块 */
.mini-slider{
  position:relative;
  background:#fafafa;
  border:1px solid #eee;
  border-radius:10px;
  padding:12px 12px 32px;
  box-shadow:0 1px 6px rgba(0,0,0,.06);
}

/* 轨道里放多张图，仅显示当前一张 */
.mini-slider .track > img{
  display:none;
  width:100%;
  height:260px;           /* 统一高度 */
  object-fit:cover;       /* 充满裁切，画面不变形 */
  border-radius:8px;
}
.mini-slider .track > img.active{ display:block; }

/* 左右箭头 */
.mini-slider .nav{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:38px; height:38px;
  border:none; border-radius:50%;
  background:rgba(0,0,0,.45);
  color:#fff; font-size:20px;
  cursor:pointer;
}
.mini-slider .prev{ left:8px; }
.mini-slider .next{ right:8px; }

/* 小圆点 */
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

/* 移动端：一列展示 */
@media (max-width: 720px){
  .grid4{ grid-template-columns:1fr; }
  .mini-slider .track > img{ height:220px; }
}
</style>

<script>
(function(){
  // 初始化页面上所有 mini-slider（四个互不影响）
  document.querySelectorAll('.mini-slider').forEach(setupSlider);

  function setupSlider(slider){
    const imgs = Array.from(slider.querySelectorAll('.track img'));
    let i = 0;

    // dots
    const dotsWrap = slider.querySelector('.dots');
    imgs.forEach((_,idx)=>{
      const b = document.createElement('button');
      b.addEventListener('click', ()=>show(idx));
      dotsWrap.appendChild(b);
    });

    // arrows
    slider.querySelector('.prev').addEventListener('click', ()=>show(i-1));
    slider.querySelector('.next').addEventListener('click', ()=>show(i+1));

    function show(n){
      i = (n + imgs.length) % imgs.length;
      imgs.forEach(img=>img.classList.remove('active'));
      imgs[i].classList.add('active');
      dotsWrap.querySelectorAll('button').forEach((d,idx)=>d.classList.toggle('active', idx===i));
    }

    // 初始显示第一张
    show(0);
  }
})();
</script>

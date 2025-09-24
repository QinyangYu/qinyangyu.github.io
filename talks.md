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

<!-- Talks / 轮播相册（逐张滚动，不会跳过图片） -->
<div class="photo-slider talks">
  <div class="track">
    <img class="slide" src="/files/talks/Pre1.jpg" alt="Pre1">
    <img class="slide" src="/files/talks/Pre4.jpg" alt="Pre4">
    <img class="slide" src="/files/talks/Pre2.jpg" alt="Pre2">
    <img class="slide" src="/files/talks/Pre5.jpg" alt="Pre5">
  </div>
  <button class="arrow left"  onclick="sliderNav(this,'prev')">‹</button>
  <button class="arrow right" onclick="sliderNav(this,'next')">›</button>
</div>

<style>
  /* 基础样式（和 volunteer 相同），talks 可以单独控制大小 */
  .photo-slider{ position:relative; margin:20px auto; }
  .photo-slider .track{
    display:flex; gap:10px; overflow-x:auto;
    scroll-behavior:smooth;
    scroll-snap-type:x mandatory;      /* 停靠到每张 */
    -webkit-overflow-scrolling:touch;
    -ms-overflow-style:none; scrollbar-width:none;
  }
  .photo-slider .track::-webkit-scrollbar{ display:none; }

  .photo-slider img.slide{
    flex:0 0 auto;
    height:320px;          /* 想要更大/更小：调这里的高度 */
    width:auto; max-width:100%;
    object-fit:contain;
    border-radius:6px; user-select:none;
    scroll-snap-align:center;
    scroll-snap-stop:always;    /* 防止越过目标 */
  }

  .photo-slider .arrow{
    position:absolute; top:50%; transform:translateY(-50%);
    font-size:2rem; background:rgba(0,0,0,.4); color:#fff;
    border:none; border-radius:50%; padding:8px 12px;
    cursor:pointer; z-index:10; user-select:none;
  }
  .photo-slider .arrow.left{ left:10px; }
  .photo-slider .arrow.right{ right:10px; }

  /* talks 专属尺寸（整体宽度） */
  .photo-slider.talks{ max-width:55%; }     /* 想整体更小就降到 50%/45% */

  @media (max-width:768px){
    .photo-slider.talks{ max-width:92%; }
    .photo-slider img.slide{ height:220px; }
  }
</style>

<script>
  /* 按“张数”滚动而不是按像素，避免跳图 */
  function sliderNav(btn, dir){
    const slider = btn.parentElement;
    const track  = slider.querySelector('.track');
    const slides = Array.from(track.querySelectorAll('.slide'));

    // 当前视口中心所在的那张
    const center = track.scrollLeft + track.clientWidth/2;
    let idx = 0, best = Infinity;
    slides.forEach((s,i)=>{
      const mid = s.offsetLeft + s.offsetWidth/2;
      const d = Math.abs(mid - center);
      if (d < best){ best = d; idx = i; }
    });

    const target = dir === 'next' ? Math.min(idx+1, slides.length-1)
                                  : Math.max(idx-1, 0);
    slides[target].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  }
</script>

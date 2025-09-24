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

<div class="photo-slider">
  <div class="track">
    <img src="/files/talks/Pre1.jpg" alt="talks photo 1">
    <img src="/files/talks/Pre4.jpg" alt="talks photo 3">
    <img src="/files/talks/Pre2.jpg" alt="talks photo 2">
    <img src="/files/talks/Pre5.jpg" alt="talks photo 4">
  </div>

  <!-- 左右箭头 -->
  <button class="arrow left"
          onclick="this.parentElement.querySelector('.track').scrollBy({left:-500,behavior:'smooth'})">‹</button>
  <button class="arrow right"
          onclick="this.parentElement.querySelector('.track').scrollBy({left:500,behavior:'smooth'})">›</button>
</div>

<style>
  /* 容器：与 volunteer teaching 保持一致（可按需再调） */
  .photo-slider{ 
    position: relative; 
    max-width: 45%;      /* 整体宽度 */
    margin: 20px auto; 
  }

  .photo-slider .track{
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    align-items: center;
    gap: 10px;
  }
  /* 隐藏原生滚动条（可选） */
  .photo-slider .track::-webkit-scrollbar{ display:none; }
  .photo-slider .track{ -ms-overflow-style:none; scrollbar-width:none; }

  .photo-slider img{
    flex: 0 0 auto;
    height: 300px;       /* 单张图高度 */
    width: auto;
    max-width: 100%;
    object-fit: contain; /* 保持比例不裁切 */
    border-radius: 6px;
    user-select: none;
    scroll-snap-align: center;
  }

  .photo-slider .arrow{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    background: rgba(0,0,0,.4);
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 8px 12px;
    cursor: pointer;
    z-index: 10;
    user-select: none;
  }
  .photo-slider .arrow.left{  left: 10px; }
  .photo-slider .arrow.right{ right: 10px; }

  /* 移动端 */
  @media (max-width:768px){
    .photo-slider{ max-width: 80%; }
    .photo-slider img{ height: 200px; }
  }
</style>

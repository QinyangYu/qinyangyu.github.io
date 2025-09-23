---
layout: homepage
title: "Research"
permalink: /research/
---

# Projects

<div class="publications">
<ol class="bibliography">

{% for link in site.data.projects.main %}

<li>
  <div class="pub-row" style="display:flex; gap:16px; align-items:flex-start; margin-bottom:20px;">
    <!-- 左侧缩略图 -->
    <div style="flex:0 0 180px; max-width:180px;">
      <img src="{{ link.image }}" 
           alt="project image" 
           style="width:100%; height:auto; border-radius:6px; margin-bottom:6px;">
      <abbr class="badge">{{ link.project_short }}</abbr>
    </div>

    <!-- 右侧文字 -->
    <div style="flex:1; min-width:0;">
      <div class="title"><a href="{{ link.web }}">{{ link.title }}</a></div>
      <div class="author">{{ link.authors }}</div>
      <div class="author">{{ link.abstract }}</div>
      <div class="periodical"><em>{{ link.project }}</em></div>

      <div class="links" style="margin-top:6px;">
        {% if link.pdf %} 
        <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank">PDF</a>
        {% endif %}
        {% if link.code %} 
        <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank">Code</a>
        {% endif %}
        {% if link.page %} 
        <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank">Project Page</a>
        {% endif %}
        {% if link.bibtex %} 
        <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank">BibTex</a>
        {% endif %}
        {% if link.web %} 
        <a href="{{ link.web }}" class="btn btn-sm z-depth-0" role="button" target="_blank">Website</a>
        {% endif %}
        {% if link.notes %}
        <strong><i style="color:#e74d3c">{{ link.notes }}</i></strong>
        {% endif %}
        {% if link.others %} 
        {{ link.others }}
        {% endif %}
      </div>
    </div>
  </div>
</li>

{% endfor %}
</ol>
</div>

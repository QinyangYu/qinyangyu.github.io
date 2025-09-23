---
layout: homepage
title: "Research"
permalink: /research/
---

<!-- 中央容器：限制宽度并居中 -->
<div style="max-width: 900px; margin: 0 auto;">

<h1 id="research">Research</h1>

<h2 style="margin: 30px 0 -15px;">Projects</h2>

<div class="publications">
  <ol class="bibliography" style="list-style: none; padding-left: 0;">
  {% for link in site.data.projects.main %}

    <li style="margin: 18px 0; padding: 18px 20px; border: 1px solid #eee; border-radius: 12px;">
      <div class="pub-row">

        <!-- 只有一列（去掉图片栏），全部内容居中/左对齐都好看 -->
        <div class="col-sm-12" style="padding: 0 6px;">
          <div class="title" style="font-weight: 600; font-size: 18px; line-height: 1.35;">
            {% if link.web %}<a href="{{ link.web }}">{% endif %}
            {{ link.title }}
            {% if link.web %}</a>{% endif %}
          </div>

          {% if link.project_short %}
            <div class="abbr" style="margin-top: 4px;">
              <span class="badge" style="background:#f1f3f5; color:#444; font-size: 11px; padding:3px 6px; border-radius: 6px;">
                {{ link.project_short }}
              </span>
            </div>
          {% endif %}

          {% if link.authors %}
            <div class="author" style="margin-top: 6px; color:#555;">{{ link.authors }}</div>
          {% endif %}

          {% if link.abstract %}
            <div class="author" style="margin-top: 8px; color:#333;">{{ link.abstract }}</div>
          {% endif %}

          {% if link.project %}
            <div class="periodical" style="margin-top: 6px; color:#666;">
              <em>{{ link.project }}</em>
            </div>
          {% endif %}

          <div class="links" style="margin-top: 10px;">
            {% if link.pdf %}
              <a href="{{ link.pdf }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">PDF</a>
            {% endif %}
            {% if link.code %}
              <a href="{{ link.code }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Code</a>
            {% endif %}
            {% if link.page %}
              <a href="{{ link.page }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Project Page</a>
            {% endif %}
            {% if link.bibtex %}
              <a href="{{ link.bibtex }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">BibTeX</a>
            {% endif %}
            {% if link.web %}
              <a href="{{ link.web }}" class="btn btn-sm z-depth-0" role="button" target="_blank" style="font-size:12px;">Website</a>
            {% endif %}
            {% if link.notes %}
              <strong><i style="color:#e74d3c"> {{ link.notes }} </i></strong>
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

</div>

---
title: Home
layout: default
nav_order: 1
---

# Welcome

Hi! I'm Tim Smith, a senior IT student that's passionate about networking, security, and building labs to learn more about... everything. 

I’m planning to take the CCNA in April 2026. Because of that, I’m putting my homelabs on hold for now while I focus on studying, schoolwork, and a new capstone project. I’ll be documenting my progress over the next two semesters as my group and I design and build it. I think it’ll cover a lot of the areas I’m interested in, like network automation, security, load-balancing, AI APIs, open source system designs, and solving real problems as a team.

---

Explore my [Capstone Project]({{ '/capstone-project.html' | relative_url }}) to learn about LoNSeMonSy, my network security monitoring system, or check out my [Homelab Overview]({{ '/homelab-overview.html' | relative_url }}) for my infrastructure projects.

## Project Progress

**Current Status:** {{ site.data.progress.status }}

{% assign hue = site.data.progress.value | times: 1.2 %}
<div style="background-color: #e9ecef; border-radius: 4px; height: 24px; overflow: hidden; margin-bottom: 1rem;">
  <div style="background-color: hsl({{ hue }}, 100%, 50%); height: 100%; width: {{ site.data.progress.value }}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold; border-radius: 4px; transition: all 0.3s ease;">
    {{ site.data.progress.value }}%
  </div>
</div>

Capstone implementation in progress over two semesters.

---

## My Resume

<iframe src="{{ '/assets/images/Tim Smith 2026 Resume.pdf' | relative_url }}" width="100%" height="900px" style="border: 1px solid #ccc; border-radius: 8px;"></iframe>


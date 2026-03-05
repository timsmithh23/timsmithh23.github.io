---
title: Home
layout: default
nav_order: 1
---

# Welcome!

Hi, I'm an IT student passionate about networking, security, and building labs. This is where I document what I'm working on and what I learn along the way.


## Current Update: ##

I’m planning to take the CCNA in April 2026. Because of that, I’m putting my homelabs on hold for now while I focus on studying, schoolwork, and a new capstone project. I’ll be documenting my progress over the next two semesters as my group and I design and build it. I think it’ll cover a lot of the areas I’m interested in, like network automation, security, load-balancing, AI APIs, open source system designs, and solving real problems as a team.

---

Explore my [Capstone Project]({{ '/capstone-project.html' | relative_url }}) to learn about **LoNSeMonSy**, my network security monitoring system, or check out my [Homelab Overview]({{ '/homelab-overview.html' | relative_url }}) for my infrastructure projects.

## Capstone Prototype Progress

**Current Status:** {{ site.data.progress.status }}

{% assign hue = site.data.progress.value | times: 1.2 %}
<div style="background-color: #e9ecef; border-radius: 4px; height: 24px; overflow: hidden; margin-bottom: 1rem;">
  <div style="background-color: hsl({{ hue }}, 100%, 50%); height: 100%; width: {{ site.data.progress.value }}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold; border-radius: 4px; transition: all 0.3s ease;">
    {{ site.data.progress.value }}%
  </div>
</div>

---

## Recent Posts

{% assign sorted_posts = site.posts | sort: 'date' | reverse %}
{% for post in sorted_posts limit:5 %}
- **[{{ post.title }}]({{ post.url | relative_url }})** - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}

---

## My Resume

<iframe src="{{ '/assets/images/resume/Tim Smith 2026 Resume.pdf' | relative_url }}" width="100%" height="900px" style="border: 1px solid #ccc; border-radius: 8px;"></iframe>

<p style="text-align: center; margin-top: 1rem;">
  <a href="{{ '/assets/images/resume/Tim Smith 2026 Resume.pdf' | relative_url }}" target="_blank" style="display: inline-block; padding: 0.5rem 1.2rem; background-color: #0d6efd; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">📄 Can't see the resume? Open it here</a>
</p>


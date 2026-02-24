---
title: Capstone Project
layout: default
nav_order: 2
has_children: true
---

<img src="{{ '/assets/images/LoNSeMonSy Logo.png' | relative_url }}" alt="LoNSeMonSy Logo" style="width: 320px; height: auto; display: block; margin: 0 auto 1rem;" />

# Capstone Project

This section contains information about my LoNSeMonSy capstone project and its progress.

## Project Progress

**Current Status:** {{ site.data.progress.status }}

{% assign hue = site.data.progress.value | times: 1.2 %}
<div style="background-color: #e9ecef; border-radius: 4px; height: 24px; overflow: hidden; margin-bottom: 1rem;">
  <div style="background-color: hsl({{ hue }}, 100%, 50%); height: 100%; width: {{ site.data.progress.value }}%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: bold; border-radius: 4px; transition: all 0.3s ease;">
    {{ site.data.progress.value }}%
  </div>
</div>

Implementation in progress across two semesters with my development team.

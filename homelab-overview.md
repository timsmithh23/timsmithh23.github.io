---
title: Homelab Overview
layout: default
nav_order: 2
---

# Welcome!

My homelab is hands-on learning environment designed for managing my self-hosted servers, improving network security, and experimenting with applications and services. It allows me to practice real-world administration and networking tasks that I can apply my book knowledge in, while sharing my progress!

## Recent Posts

<ul>
  {% for post in site.posts %}
    {% if post.published %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - <small>{{ post.date | date: "%B %d, %Y" }}</small>
      </li>
    {% endif %}
  {% endfor %}
</ul>

## Current Network Topology

![Network Diagram]({{ '/assets/images/active-directory/Active Directory Server.drawio.png' | relative_url }})

## Lab Setup

- Inspiron Laptop  
  <img src="{{ '/assets/images/dell-inspiron.jpeg' | relative_url }}" alt="Inspiron Laptop" width="220" loading="lazy" />
- Dell Optiplex Mini Desktop  
  <img src="{{ '/assets/images/dell-optiplex.jpeg' | relative_url }}" alt="Dell Optiplex Mini Desktop" width="220" loading="lazy" />
- Client machine: Windows 11 PC  
  <img src="{{ '/assets/images/white-pc-rgb.JPG' | relative_url }}" alt="Windows 11 Client PC" width="220" loading="lazy" />
- T-Mobile home internet gateway
- Layer 3 Switch: Cisco WS-C3560CX-12TC-S, 12 Port 3560-CX Data IP Base Switch 12 GE  
  <img src="{{ '/assets/images/cisco-switch.jpeg' | relative_url }}" alt="Cisco 3560-CX Switch" width="220" loading="lazy" />

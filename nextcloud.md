---
title: Nextcloud Setup
layout: default
grand_parent: Proxmox Homelab
parent: Optiplex Server
nav_order: 1
permalink: /proxmox-homelab/optiplex/nextcloud/
---

{% assign post = site.posts | where_exp: "p", "p.title == 'Nextcloud Setup in Proxmox' or p.title == 'Setting Up Nextcloud in My Homelab' or p.url contains 'nextcloud-setup' or p.url contains 'nextcloud'" | first %}
{% if post %}
{{ post.content }}
{% else %}
_Post not found_
{% endif %}

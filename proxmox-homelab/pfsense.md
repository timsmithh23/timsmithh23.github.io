title: pfSense Setup
layout: default
grand_parent: Proxmox Homelab
parent: Inspiron Server
nav_order: 1
permalink: /proxmox-homelab/inspiron-server/pfsense/
---

{% assign post = site.posts | where_exp: "p", "p.title == 'pfSense Setup in Proxmox' or p.title == 'pfSense Setup' or p.url contains 'pfsense'" | first %}
{% if post %}
{{ post.content }}
{% else %}
_Post not found_
{% endif %}

title: Proxmox on Dell Inspiron
layout: default
grand_parent: Proxmox Homelab
parent: Inspiron Server
nav_order: 1
permalink: /proxmox-homelab/inspiron-server/proxmox/
---

{% assign post = site.posts | where_exp: "p", "p.title == 'Setting up Proxmox VE on a Dell Inspiron' or p.title == 'Proxmox on Dell Inspiron' or p.url contains 'proxmox'" | first %}
{% if post %}
{{ post.content }}
{% else %}
_Post not found_
{% endif %}

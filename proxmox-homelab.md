---
title: Proxmox Homelab
layout: default
nav_order: 3
has_children: true
permalink: /proxmox-homelab/
---

Welcome! This section contains guides and walkthroughs for projects running in my Proxmox homelab.

## Posts related to Proxmox

{% assign proxmox_posts = site.posts | where_exp: "p", "p.url contains '/proxmox' or p.url contains 'proxmox' or p.categories contains 'proxmox'" %}
{% if proxmox_posts and proxmox_posts.size > 0 %}
<ul>
	{% for post in proxmox_posts %}
		<li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> - <small>{{ post.date | date: "%B %d, %Y" }}</small></li>
	{% endfor %}
</ul>
{% else %}
<!-- Fallback: list specific rendered child pages (pfSense/Nextcloud) if posts are hidden -->
<ul>
	{% for p in site.pages %}
		{% if p.url contains '/proxmox-homelab/' and p.title and p.title != page.title %}
			<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
		{% endif %}
	{% endfor %}
</ul>
{% endif %}

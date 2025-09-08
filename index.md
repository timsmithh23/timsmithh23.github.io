---
title: Homelab Overview
layout: default
nav_order: 1
---

# Homelab Overview

This Homelab is a hands-on learning environment designed for managing self-hosted servers, improving network security, and experimenting with applications and services. It allows me to practice real-world administration and networking tasks that go far beyond what a textbook can teach.

## Lab Purpose

- Gain practical experience with server and network management.
- Improve security and organization in a segmented network environment.
- Explore installation, configuration, and management of useful software and services.

## Lab Components

- Proxmox VE on Dell Inspiron and Dell Optiplex hosts for virtualization.
- Client machine: Windows 11 PC for SSH and Proxmox GUI access.
- Networking hardware: T-Mobile home internet gateway and a Cisco Layer 3 switch.

![Network Diagram]({{ '/assets/images/netdiagram.png' | relative_url }})

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


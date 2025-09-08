---
title: Nextcloud Setup in Proxmox
layout: default
published: true
nav_order: 4
nav_exclude: false
---

# Setting Up Nextcloud in My Homelab

Note: This instance is hosted on my Dell Optiplex running Proxmox, not my main Dell Inspiron laptop.

I wanted to run my own personal cloud service in my homelab, so I set up Nextcloud on a Proxmox VM. I followed the official Nextcloud installation documentation.

## VM Basics
- Proxmox VM (Debian or Ubuntu recommended)  
- 2 vCPU, 4 GB RAM (minimum)  
- 40+ GB disk (grow as needed)  

## Install Outline
At a high level, the setup uses a standard LEMP/LAMP stack:
- Install OS updates and prerequisites
- Install and configure either Apache or Nginx
- Install PHP with required extensions
- Install and configure MariaDB/PostgreSQL
- Download and configure Nextcloud
- Set up a data directory (optional: on separate storage)
- Configure HTTPS (reverse proxy or direct)

## Notes
- I kept networking internal to the homelab for now.  
- Backups are planned with Proxmox snapshots and off-VM data exports.  
- I’ll expose it externally later with proper reverse proxy and TLS.

![Nextcloud Home]({{ '/assets/images/nextcloud/nextcloudhome.png' | relative_url }})

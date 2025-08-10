---
layout: default
title: "Configuring Proxmox Networking for My Homelab"
---

I can't lie, I strugged the first time setting up Proxmox back in February 2025. I didn't research enough about virtualizaiton, and unfortunately wiped my main SSD storage off of my Windows 11 device, thinking I could dual boot. Mistake learned. Thankfully it was a new PC I had built the month prior, so I didn't lose much data.

# Configuring Proxmox Networking for My Homelab

Setting up Proxmox on my laptop was step one for building my mini enterprise network lab. Here’s how I configured the networking so my VMs can talk to each other and the internet.

## Network Bridge Setup

Proxmox uses Linux Bridges (like virtual switches) to connect VMs to the physical network interfaces on my laptop. I created two main bridges:

- **vmbr0** – Connected to my laptop’s physical Ethernet (enx607d094beec2) and handles WAN/internet traffic.  
  - IP: None assigned on the host (Proxmox), it just passes traffic.  
  - Connected to my home router on IP range: `192.168.12.0/24`

- **vmbr1** – Internal LAN bridge for VMs to communicate privately.  
  - IP Address on Proxmox host: `192.168.12.130/24`  
  - Gateway: `192.168.12.1` (my router)

## Why Two Bridges?

- **vmbr0** connects VMs to the internet through my home router.  
- **vmbr1** is for internal lab traffic, isolated from the outside network but still routable.

## Key Config Snippet (`/etc/network/interfaces`)

```bash
auto lo
iface lo inet loopback

iface enx607d094beec2 inet manual

auto vmbr0
iface vmbr0 inet manual
    bridge_ports enx607d094beec2
    bridge_stp off
    bridge_fd 0

auto vmbr1
iface vmbr1 inet static
    address 192.168.12.130
    netmask 255.255.255.0
    gateway 192.168.12.1
    bridge_ports none
    bridge_stp off
    bridge_fd 0

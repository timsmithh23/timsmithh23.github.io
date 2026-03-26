---
title: Remote Network Topology
layout: default
parent: Capstone Project
nav_order: 2
---

# Remote Network Topology

![LoNSeMonSy Network Topology](/assets/images/capstone/lonsemonsy-network-topology.png)

## Remote Access

My teammates access the lab securely through Tailscale, a private VPN that lets their devices join the home network and reach servers via SSH or internal domain names. I manage servers directly from the LAN as I'm physically connected to it.

The servers (Proxmox VE, Supabase, and Grafana) are isolated on the private network with no direct exposure to the public internet. All remote access requires Tailscale authentication, ensuring that only authorized users can reach the infrastructure regardless of their connection method.

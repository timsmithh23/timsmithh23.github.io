---
title: Remote Network Topology
layout: default
parent: Capstone Project
nav_order: 2
---

# Remote Network Topology

![LoNSeMonSy Network Topology](/assets/images/capstone/lonsemonsy-network-topology.png)

## Remote Access

For remote access, my teammates connect to the lab through Tailscale. This creates a private VPN network that lets their devices securely join the same network as the servers (my home network). Once connected, they can access the systems using SSH or internal domain names instead of remembering IP addresses.

Since I am physically connected to the switch on the lab network, I manage the servers directly and do not need to connect through the VPN. That said, the same security practices still apply regardless of how we are connecting.

The servers running the project (Proxmox VE, Supabase, and Grafana) stay inside the private network and are not exposed to the public internet.

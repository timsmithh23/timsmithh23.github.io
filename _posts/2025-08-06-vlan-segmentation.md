---
title: "VLAN Segmentation and Routing"
layout: default
date: 2025-08-06
---
**Date:** 2025-08-06

# VLAN Segmentation and Routing

## Introduction

In this project, I segmented my homelab network using VLANs to improve security and organization. I set up inter-VLAN routing so that devices on different VLANs could communicate when needed, while keeping traffic isolated.

## Objective

- Isolate traffic between servers, management devices, and IoT devices.
- Learn practical VLAN configuration and routing.

## Step-by-Step Setup

### Step 1: Plan VLANs

I started by planning the VLANs I needed:

- VLAN 10: Servers
- VLAN 20: Management
- VLAN 30: IoT devices

Each VLAN would have its own subnet, making it easier to control traffic.

### Step 2: Configure the Layer 3 Switch

- Logged into my Layer 3 switch via a PuTTy SSH console.
- Created VLANs:

```text
vlan 10
 name Servers
vlan 20
 name Management
vlan 30
 name IoT
```

- Assigned ports to the appropriate VLANs.
- Configured inter-VLAN routing by assigning VLAN interfaces (SVIs) with IP addresses as gateways for each VLAN.

### Step 3: Configure Proxmox VM Networking

- In Proxmox, I created separate virtual bridges for each VLAN.
- Connected each VM to the correct bridge depending on its role.
- Configured the VMs to use the VLAN-specific gateway IPs.

### Step 4: Test Connectivity

- Verified that devices on the same VLAN could communicate.
- Tested that devices on different VLANs could only communicate if routing allowed it.
- Used ping and traceroute to ensure proper connectivity.

## Outcome

- The network is segmented, isolating traffic between servers, management, and IoT devices.
- Inter-VLAN routing works as expected, allowing secure communication when needed.

## Lessons Learned

- VLAN tagging and trunking are crucial for traffic isolation.
- Layer 3 switches simplify routing between VLANs.
- Proxmox bridges allow flexible VM network management.

## Future Improvements

- Add firewall rules between VLANs for extra security.
- Automate VLAN setup using Ansible or Python scripts.
- Monitor traffic using a network monitoring tool like Zabbix.

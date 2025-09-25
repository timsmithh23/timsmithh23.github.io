---
title: "Setting up Proxmox VE on a Dell Inspiron"
layout: default
published: true
categories: [homelab, proxmox]
tags: [proxmox, inspiron, virtualization, vlan, homelab]
description: "Bare‑metal Proxmox VE install on a Dell Inspiron for a compact homelab, with 100 GB allocated to Proxmox and VLAN‑aware networking."
---

<div style="text-align:center; margin: 0.5rem 0 1.25rem;">
    <img alt="Proxmox Logo" src="{{ '/assets/images/proxmox logo.png' | relative_url | replace: ' ', '%20' }}" style="max-width: 420px; width: 60%; height: auto;" />
    <div class="text-small" style="color: var(--color-fg-muted);">Dell Inspiron • Proxmox VE Bare‑Metal Install</div>
</div>

This guide walks through how I installed and configured Proxmox VE on a Dell Inspiron system. The setup is designed for a homelab environment where I can experiment with virtual machines, VLANs, and internal routing.

## Hardware Overview

- Server: Dell Inspiron running Proxmox VE on bare metal
- Storage: about 100 GB allocated to the Proxmox system disk; remaining space reserved for VM disks (local-lvm)
- Network: one physical Ethernet interface, bridged in Proxmox to support LAN access and trunking

> Note: I only allocated 100 GB to the Proxmox root disk during install. You can grow storage later by adding a new disk or creating additional LVM/thin pools.

## 1) Proxmox Startup and Install

Right after booting from the Proxmox VE installer USB, you’ll see the startup/installer menu. Place this near the beginning of your read:

![Proxmox Installer Menu]({{ '/assets/images/proxmox startup.png' | relative_url | replace: ' ', '%20' }})

I downloaded the latest Proxmox VE ISO and flashed it to a USB drive, booted the Dell Inspiron, and installed Proxmox to the internal disk. During setup I selected a small system disk size (~100 GB) for the Proxmox root volume.

Key install choices I used:

- Filesystem: ext4 or ZFS (I used the default ext4 for simplicity)
- Country/Time/Keyboard: set to your locale
- Management password: set a strong password for the `root` user
- Management network: static IP 192.168.12.130/24 with gateway 192.168.12.1


## 2) Networking Setup (Manual Configuration)

Proxmox didn’t recognize my LAN Ethernet interface out of the box, so before I could access the web GUI, I had to manually configure the networking:P

First, I ran `ip a` to identify my NIC and current interface state:

![ip a output]({{ '/assets/images/ip a  proxmox.jpg' | relative_url | replace: ' ', '%20' }})

Then I edited `/etc/network/interfaces` to set up the correct bridge and static IP for management:

![interfaces file]({{ '/assets/images/proxmox networking.jpg' | relative_url | replace: ' ', '%20' }})

For reference, here’s the config in text form so you can copy/paste:

```ini
# /etc/network/interfaces (Proxmox VE)

auto lo
iface lo inet loopback

iface <YOUR-NIC-NAME> inet manual
    # Physical LAN

auto vmbr0
iface vmbr0 inet static
    address 192.168.12.130/24
    gateway 192.168.12.1
    bridge-ports <YOUR-NIC-NAME>
    bridge-stp off
    bridge-fd 0

# Optional VLAN trunk bridge for lab networks
auto vmbr1
iface vmbr1 inet manual
    bridge-ports none
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
    bridge-vids 2-50
```

Replace `<YOUR-NIC-NAME>` with your actual NIC (for example, `enx607d094beec2`). If you prefer the GUI, you can make the same changes in Datacenter → Node → System → Network.

After saving and restarting networking, I confirmed routing was correct within my LAN. Only then was I able to access the Proxmox web interface from my Windows 11 computer (192.168.12.104, same subnet).


## 3) First Login and Summary

After reboot, I could log into the web interface at:

```
https://192.168.12.130:8006
```

Once the node came online, the Proxmox Summary page showed system resources and the repo status warning (normal without a subscription):

![Proxmox Summary Page]({{ '/assets/images/proxmox specs.png' | relative_url | replace: ' ', '%20' }})

## 4) Storage Layout (100 GB system)

During the installer, I left the Proxmox system/root disk around 100 GB. VM storage used the default `local-lvm` thin pool on the primary disk. You can confirm storage targets under Datacenter → Storage and adjust IDs or content types (ISO, VZDump, images) as needed.

If you plan to host many VMs/containers, consider adding a second disk just for VM images or creating a new LVM-thin pool to keep the root disk lean.

## 5) Post‑Install QOL Tweaks

- Switch to the no‑subscription repository (optional) to clear the enterprise repo warning.
- Update packages and reboot when needed.
- Set timezone and NTP under Datacenter → Node → System → Time.

## 6) What’s Next

With Proxmox installed, you can now:

- Create VLAN‑tagged networks for lab isolation
- Spin up pfSense as a router/firewall VM
- Deploy containers (LXC) or VMs for apps like Nextcloud, monitoring, or dev tools

This Proxmox base is the foundation for the rest of my homelab series.

---
title: pfSense Setup
layout: default
grand_parent: Proxmox Homelab
parent: Inspiron Server
nav_order: 2
permalink: /proxmox-homelab/inspiron-server/pfsense-test/
---

<div style="text-align:center; margin: 0.5rem 0 1.25rem;">
  <img alt="pfSense Logo" src="{{ '/assets/images/pfsense/pfsense logo.png' | relative_url | replace: ' ', '%20' }}" style="max-width: 200px; width: 40%; height: auto;" />
  <div class="text-small" style="color: var(--color-fg-muted);">pfSense • Virtual Firewall/Router</div>
</div>

# pfSense Setup on Proxmox Inspiron Server

This guide walks you through installing and configuring pfSense as a virtual firewall/router on your Proxmox homelab Inspiron server.

## Prerequisites
- Proxmox VE installed and running
- pfSense ISO downloaded from [pfSense.org](https://www.pfsense.org/download/)
- At least two virtual NICs (WAN/LAN)

## Step 1: Create pfSense VM in Proxmox
1. Log in to Proxmox web UI.
2. Click **Create VM**.
3. Name: `pfSense`.
4. OS: Select the pfSense ISO as the CD/DVD.
5. System: Default (Q35, SeaBIOS/UEFI).
6. Hard Disk: 10GB+ (VirtIO SCSI recommended).
7. CPU: 2 cores minimum.
8. Memory: 2GB+.
9. Network: Add two NICs (one for WAN, one for LAN), use **VirtIO**.

## Step 2: Install pfSense
1. Start the VM and open the console.
2. Follow pfSense installer prompts:
   - Accept defaults for most options.
   - Assign WAN/LAN interfaces (usually vtnet0/vtnet1).
   - Set admin password.

## Step 3: Initial Configuration
1. Access pfSense web UI via LAN IP (e.g., http://192.168.1.1).
2. Login with admin credentials.
3. Run the setup wizard:
   - Set hostname, domain, DNS.
   - Configure WAN (DHCP/static as needed).
   - Set LAN IP/subnet.
   - Change admin password.

## Step 4: Basic Firewall Rules
- Allow LAN to any (default)
- Block WAN to LAN
- Add rules for VPN, port forwarding as needed

## Step 5: Optional Enhancements
- Enable pfBlockerNG for ad/malware blocking
- Set up OpenVPN server
- Configure VLANs for network segmentation

## Troubleshooting
- If you lose LAN access, use Proxmox console to fix IP/rules.
- Check Proxmox network bridge settings if WAN/LAN not working.

## References
- [pfSense Documentation](https://docs.netgate.com/pfsense/en/latest/)
- [Proxmox Wiki: pfSense](https://pve.proxmox.com/wiki/PfSense_Guest)

---

## Result: pfSense Web UI

<div style="text-align:center; margin: 1.5rem 0 1.5rem;">
    <img alt="pfSense Web UI" src="{{ '/assets/images/pfsense/pfsensehome.png' | relative_url }}" style="max-width: 420px; width: 60%; height: auto; border-radius: 8px;" />
    <div class="text-small" style="color: var(--color-fg-muted);">pfSense running successfully in Proxmox</div>
</div>

*Last updated: September 25, 2025*

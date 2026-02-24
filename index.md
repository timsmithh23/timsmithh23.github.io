---
title: LoNSeMonSy Introduction
layout: default
parent: Capstone Project
nav_order: 2
---

<img src="{{ '/assets/images/LoNSeMonSy Logo.png' | relative_url }}" alt="LoNSeMonSy Logo" style="width: 320px; height: auto; display: block; margin: 0 auto 1rem;" />

# LoNSeMonSy: Local Network Security Monitoring System

Welcome to LoNSeMonSy, a lightweight, intelligent network security monitoring system designed for real-time threat detection and response. Our capstone project combines modern DevOps practices with security engineering to make network monitoring accessible to small labs, home networks, and educational environments.

## What is LoNSeMonSy?

LoNSeMonSy detects suspicious activity on networks, stores security events, and delivers clear alerts to administrators. It's built for:

- Network Administrators managing enterprise lab environments
- Security Students learning threat detection in controlled environments
- Homelab Enthusiasts protecting their personal networks without expensive enterprise tools

## How It Works

Our system architecture leverages:

- **Data Collection**: Inputs from authentication logs, system logs, network monitoring, and security policies
- **Network Sensor**: Raspberry Pi monitors traffic at the edge
- **Compute**: Virtual machines on Proxmox VE or VMware ESXi host components
- **Storage**: PostgreSQL database persists security events
- **Visualization**: Grafana dashboard displays real-time intelligence
- **Intelligence**: AI component explains alerts in human-readable language

## Why LoNSeMonSy?

Enterprise SIEM solutions like Splunk are powerful but expensive and complex. LoNSeMonSy provides a lightweight, open-source alternative that combines:

- Real-time monitoring and alerting
- Intelligent threat visualization
- AI-powered explanations
- Affordable infrastructure
- Easy deployment on consumer hardware

We're building a system that transforms raw machine data into human-understandable intelligence. That's real security engineering.


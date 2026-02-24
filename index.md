---
title: Home Page
layout: default
nav_order: 1
---

# LoNSeMonSy: Local Network Security Monitoring System

Welcome to LoNSeMonSy – a lightweight, intelligent network security monitoring system designed for real-time threat detection and response. My capstone project combines modern DevOps practices with security engineering to make network monitoring accessible to small labs, home networks, and educational environments.

## What is LoNSeMonSy?

**LoNSeMonSy** (Local Network Security Monitoring System) detects suspicious activity on networks, stores security events, and delivers clear alerts to administrators. It's built for:

- **Network Administrators** managing enterprise lab environments
- **Security Students** learning threat detection in controlled environments
- **Homelab Enthusiasts** protecting their personal networks without expensive enterprise tools

## How It Works

### Data Collection
I collect inputs from multiple sources:
- **Authentication logs** – login attempts, failed passwords, unauthorized access
- **System logs** – user activities, process executions, system events
- **Network monitoring** – detection of new devices connecting to the network
- **Security policies** – admin-defined detection rules and custom alerts

### System Architecture

The system leverages distributed edge computing:

- **Data Collection**: Raspberry Pi acts as a network sensor, monitoring traffic at the edge
- **Compute**: Virtual machines on Proxmox VE or VMware ESXi host the analysis components
- **Storage**: PostgreSQL database persists all security events and audit logs
- **Visualization**: Grafana dashboard provides real-time security intelligence
- **Intelligence**: AI component explains alerts in human-readable language

### Alert & Response Flow

```
Logs & Traffic → Processing & Analysis → PostgreSQL Storage → Grafana Alerts → AI Explanation
```

**Example Alert:**
- **Event**: SSH brute force attack detected from 10.0.0.25
- **System Response**: Generate high-severity alert
- **AI Explanation**: "A device is repeatedly guessing SSH passwords. Recommend quarantining source IP or enabling fail2ban rules."
- **Admin Action**: Review alert and implement mitigation

## The Complete Flow

1. **Data Ingestion** – Logs and network traffic collected from sensors
2. **Real-time Analysis** – Pattern matching and rule evaluation
3. **Event Storage** – Security events persisted in PostgreSQL
4. **Visualization** – Grafana dashboards display threats in real-time
5. **AI Insights** – Machine learning explains the alert and suggests remediation

## Why LoNSeMonSy?

Enterprise SIEM solutions like Splunk or IBM QRadar are powerful but expensive and complex. They're often overkill for:
- University lab environments
- Home network security
- Small research projects
- Educational demonstrations

**LoNSeMonSy solves this** by providing a lightweight, open-source SIEM-style system that combines:
- ✓ Real-time monitoring and alerting
- ✓ Intelligent threat visualization
- ✓ AI-powered explanations
- ✓ Affordable infrastructure
- ✓ Easy deployment on consumer hardware

## At Its Core

I built something that takes raw machine noise—thousands of logs, network packets, system events—and transforms it into **human-understandable intelligence**. That's real security engineering.

This is the intersection of DevOps automation, security analysis, and user-centric design—proving that sophisticated security monitoring doesn't require enterprise budgets or complexity.

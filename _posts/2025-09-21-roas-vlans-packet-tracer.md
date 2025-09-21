---
title: "Router-on-a-Stick (ROAS) with VLANs in Packet Tracer"
layout: default
published: true
nav_exclude: false
nav_order: 5
---

# ROAS: VLAN Tagging + Trunking in Packet Tracer

Before we begin, a brief note:

While this topology can be simulated on a Layer 3 switch, the Router-on-a-Stick (ROAS) method is an effective teaching exercise that clearly demonstrates VLAN tagging and trunking concepts when a dedicated L3 switch is not available.

<div style="border: 1px solid var(--color-border-muted); border-radius: 6px; overflow: hidden; margin: 1rem 0;">
  <object data="{{ '/assets/images/Inter-VLAN ROAS Routing.pdf' | relative_url | replace: ' ', '%20' }}" type="application/pdf" width="100%" height="800px">
    <p>Your browser doesn’t support embedded PDFs. <a href="{{ '/assets/images/Inter-VLAN ROAS Routing.pdf' | relative_url | replace: ' ', '%20' }}" target="_blank" rel="noopener">Open the PDF</a>.</p>
  </object>
</div>

## What You’ll Learn

- How 802.1Q tagging carries multiple VLANs over a single trunk link
- Subinterfaces on a router (ROAS) and assigning encapsulation + IPs
- Access ports vs trunk ports in a simple two-VLAN lab
- Basic inter-VLAN routing flow when you don’t have an L3 switch

## Lab Requirements

- 1x Router supporting subinterfaces
- 1x Switch configured with one trunk port to the router and access ports to PCs
- 2+ PCs on different access VLANs

## Why ROAS vs L3 Switch SVIs?

- ROAS is simple and portable, great for Packet Tracer
- Forces you to understand trunks, tags, and subinterfaces
- Scales fine for small labs; for bigger networks, SVIs on an L3 switch are cleaner



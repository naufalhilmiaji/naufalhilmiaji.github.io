---
title: broadcastio
---

## Overview

broadcastio is designed for backend systems that need to send
messages across unreliable channels with explicit failure semantics.

## Typical Use Cases

### 1. Infrastructure Alerts
- Send WhatsApp + Telegram alerts
- Fallback to email if sessions fail

### 2. Scheduled Reports
- Daily reports via messaging bots
- Time-bound delivery guarantees

## Example Integration

```python
from broadcastio import Dispatcher

dispatcher.send(
  channels=["whatsapp", "telegram"],
  message="Service down"
)
````

## Failure Handling

* Channel isolation
* Retry strategies
* Partial success reporting

## Design Decisions

* Why WhatsApp is session-based
* Why Telegram acknowledgements matter

````

This is:
- readable
- versionable
- syntax-highlighted
- expandable forever
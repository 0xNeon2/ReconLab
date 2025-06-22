# 🛡️ ReconLab — Web-Based Reconnaissance & Vulnerability Assessment Framework

![ReconLab](https://img.shields.io/badge/Built%20for-Bug%20Bounty%20Hunters-blueviolet?style=for-the-badge)
![Python](https://img.shields.io/badge/Backend-FastAPI-informational?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)

> **ReconLab** is a **one-stop GUI-powered cybersecurity toolkit** for ethical hackers and bug bounty hunters. Seamlessly execute powerful reconnaissance modules, track vulnerabilities, manage notes, and generate detailed reports — all from your browser.

---

## 👥 Authors

- **Md Nayeem Ahmed**  
- **Mimma Jahan Mim**

---

## ✨ What’s New (June 2025)
- 🌐 Fully animated landing page with **Framer Motion**
- 🧭 Sidebar upgraded with collapsible vulnerability menu
- ✅ **Per-tool session handling**
- 📦 Modular backend via **FastAPI**
- 🔄 Real-time polling for tool execution
- 🔔 Green dot indicators for **new reports**

---

## 🧩 Features Overview

### 🧭 Navigation & UI
- Clean & modern **React + Tailwind** design
- **Framer Motion** used for interactive UI
- Responsive sidebar with toggle support
- Report notification badge
- Terminal-style output viewer with copy/download support

---

### 🔧 Core Functionalities

| Feature                    | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| 🛰️ **Subdomain Enumeration** | Run `subfinder` via POST request and see results in real-time                |
| 🧪 **Endpoint Discovery**   | Uses `ffuf` with wordlists to detect hidden directories                     |
| 🔍 **Parameter Discovery**  | Integrated with `paramspider` to extract dynamic GET parameters             |
| 🧱 **CMS Scanner**          | Uses `wpscan` to detect CMS and plugins                                     |
| 🔥 **Firewall Detection**   | Uses `wafw00f` to detect Web Application Firewalls                          |
| 🛰️ **Nmap Scanning**        | 10 predefined scan types (e.g. Top Ports, Aggressive, Full TCP, etc.)       |
| 🔎 **Dorking Module**       | Includes pre-defined Google dorks + large GitHub dork DB                    |
| ⚠️ **Vulnerability Checks** | Includes: Subdomain Takeover, Open Redirect, LFI, XSS, SQLi (via scripts)   |
| 📝 **Notes**                | Write/save in-session notes, downloadable as `.txt`                         |
| ✅ **Checklist**            | Dynamic checklist with completion tracking and custom entries               |
| 📊 **Reports**              | All module outputs are auto-saved, downloadable, and trackable              |

---

## 🖼️ Screenshots

will be added soon..

---

## 🔩 Tech Stack

| Layer        | Stack                        |
|--------------|------------------------------|
| **Frontend** | React + TailwindCSS + Framer Motion |
| **Backend**  | Python + FastAPI             |
| **Command Execution** | `subprocess` (non-blocking)      |
| **Persistence** | Local File System (report storage) |
| **Output Handling** | Real-time polling per scan ID     |

---

## 🚀 How to Run

### ⚙️ Requirements
- Python 3.8+
- Linux (Ubuntu/Debian preferred)
- Node.js 16+
- All CLI tools (`subfinder`, `ffuf`, `nmap`, `wpscan`, etc.)

### 📦 Setup

```bash
# Clone the repo
git clone https://github.com/0xNeon2/ReconLab.git
cd ReconLab

# Frontend Setup
cd ReconLab
npm install
npm run dev

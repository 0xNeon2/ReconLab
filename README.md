# 🔍 ReconLab — Web-Based Reconnaissance & Vulnerability Assessment Toolkit

![ReconLab Banner](https://img.shields.io/badge/ReconLab-Powered%20by%20Python-blueviolet?style=for-the-badge)
> A modern, intuitive, and powerful web-based reconnaissance tool for ethical hackers, bug bounty hunters, and security enthusiasts.

---

### 🚀 Authors
- **Md Nayeem Ahmed**
- **Mimma Jahan Mim**

---

## 🎯 About ReconLab

ReconLab is a **web application** that unifies powerful open-source tools into a **single GUI-driven reconnaissance platform**. No more juggling terminals — this tool helps you **hunt smarter** with a clean interface, progress feedback, real-time output, and automated report generation.

---

## 🧩 Features & Modules

### 🖥️ UI Highlights
- Clean and modern landing page
- Sidebar with module navigation
- Real-time feedback via status and progress bars
- Automatic report generation & notifications

---

### 🛠️ Core Modules

#### 1. **Subdomain Enumeration**
> Tools used: `subfinder`, `assetfinder`, `amass`
- Input a domain
- Progress bar shows tool execution
- Final output: sorted, live subdomains
- Auto-generated `.txt` report

#### 2. **Network Scanning**
> Tool used: `nmap`
- Input an IP or use built-in domain-to-IP resolver
- Choose from pre-defined scan types (cards)
- Scan result shown live + saved to report

#### 3. **CMS Detection**
> Tools used: `WPScan`, `Droopescan`, `Joomscan`
- Enter target URL
- Tools run sequentially
- Outputs shown and saved

#### 4. **Dorking**
> Integrated with your default browser
- Predefined Google dork cards
- Large linked GitHub-based dork database

#### 5. **Endpoint Discovery**
> Tools: `ffuf`, `gau`, `waybackurls`
- Discovers hidden and archived endpoints
- Output shown + report saved

#### 6. **Parameter Discovery**
> Tool: `paramspider`
- Finds input parameters on target
- Live output display + report

#### 7. **Vulnerability Detection**
| Vulnerability      | Tool              |
|--------------------|-------------------|
| Subdomain Takeover | Internal logic    |
| Local File Inclusion (LFI) | LFITester |
| Open Redirect      | OpenRedireX       |
| SQL Injection      | SQLMap            |
| Cross-site Scripting (XSS) | XSStrike |

- Click-to-run cards
- Outputs shown in real-time
- Report saved after each module

#### 8. **Checklist**
- Mark completed test items
- Add custom checks
- Visual progress tracker

#### 9. **Note Taking**
- Write quick notes during assessments
- Download your notes as `.txt`

#### 10. **Reports**
- All reports saved in one place
- Green dot notification for new reports

#### 11. **Requirements**
- Auto-checks for tool availability
- One-click install for missing tools
- Red dot indicator if tools are missing

---

## ⚙️ Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | HTML, CSS, JS, React/Vue (TBD) |
| Backend   | Python (Flask/FastAPI) |
| Styling   | Tailwind CSS / Bootstrap |
| Execution | Python `subprocess`, Bash |
| Reports   | Plain `.txt` files |

> ⚠️ No session or database management — all in-memory operations with downloadable outputs.

---

## 📦 Installation

> **Requirements:**
- Python 3.8+
- Linux (Debian/Ubuntu preferred)
- All dependent CLI tools (auto-checked in app)


# Clone the repo
git clone https://github.com/0xNeon2/ReconLab.git
cd ReconLab

# Install dependencies
pip install -r requirements.txt

# Run the app
python run.py

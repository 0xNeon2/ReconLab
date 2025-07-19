# ReconLab - Cybersecurity Reconnaissance Framework

![ReconLab Logo](https://raw.githubusercontent.com/your-repo/your-image-folder/main/reconlab-logo.png) 

ReconLab is a comprehensive, AI-powered cybersecurity reconnaissance framework designed for bug hunters and security professionals. It integrates industry-standard tools with advanced features to streamline your information gathering, vulnerability assessment, and reporting workflows.

## ✨ Features

ReconLab provides a unified platform for various security testing phases, enhancing efficiency and effectiveness.

### 🛡️ Core Security Tools

Integrated and interactive modules for essential reconnaissance tasks:

*   **Subfinder**: Passive subdomain discovery using multiple sources to expand the attack surface.
*   **Dirsearch**: Web path scanner for discovering hidden directories and files, with real-time progress tracking and structured output.
*   **Arjun**: HTTP parameter discovery tool to identify hidden parameters for injection testing.
*   **CMSeek**: CMS detection and vulnerability scanner to identify CMS versions and known vulnerabilities.
*   **Wafw00f**: Web Application Firewall (WAF) detection tool to identify WAF presence for evasion planning.
*   **Nmap**: Comprehensive network discovery and security auditing, offering various scan types (port scanning, service detection, OS fingerprinting).

### 🤖 AI Security Assistant

An advanced AI-powered assistant to aid in security analysis:

*   **Cybersecurity-focused AI**: Specialized prompts for ethical hacking and penetration testing.
*   **Multiple AI Providers**: Supports OpenRouter (with DeepSeek R1 pre-configured), DeepSeek, and OpenAI.
*   **Context-Aware Analysis**: Paste scan results or reports for the AI to analyze and provide insights.
*   **Hacker-Themed Interface**: Intuitive and visually appealing terminal-style chat interface.
*   **Actionable Suggestions**: Extracts and presents actionable steps from AI responses.
*   **Chat Persistence**: Saves conversation history for continuity.
*   **Export Functionality**: Download chat logs for documentation.

### 🚀 Enhanced Workflow Features

Tools and functionalities to streamline your security testing process:

*   **Google Dorking**: Advanced search techniques for Open-Source Intelligence (OSINT) gathering.
*   **Note Keeping**: An organized documentation system to track findings, methodologies, and progress systematically.
*   **Vulnerability Checklist**: A comprehensive testing workflow tracker to ensure complete coverage of security testing phases.
*   **Reports**: Generate and manage professional security assessment reports, with options to store results in a database.

### 🔒 User Management & Reporting

Secure and personalized experience for every user:

*   **Firebase Authentication**: Secure user registration and login system.
*   **Protected Routes**: Ensures only authenticated users can access the dashboard.
*   **Per-User Data Isolation**: Each logged-in user sees and manages only their own scan results and reports.
*   **MongoDB Integration**: Store scan results persistently in a MongoDB database.
*   **Report Deletion**: Securely delete stored reports, with user verification.

## 💻 Technologies Used

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React, Framer Motion, React Router DOM.
*   **Backend**: FastAPI, Python, Motor (async MongoDB driver), Pydantic, subprocess, aiohttp.
*   **Database**: MongoDB.
*   **Authentication**: Firebase.

## 🚀 Getting Started

Follow these instructions to set up and run ReconLab on your local machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   Python 3.8+
*   npm (Node Package Manager) or Yarn
*   pip (Python Package Installer)
*   MongoDB (Community Edition recommended, running locally or accessible)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/0xNeon2/ReconLab.git 
    cd reconlab
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend # Assuming your frontend is in a 'frontend' directory, adjust if different
    npm install # or yarn install
    cd ..
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd backend 
    pip install -r requirements.txt
    cd ..
    ```

### Running the Application

1.  **Start MongoDB:**
    ```bash
    sudo systemctl start mongod
    ```

2.  **Start the Backend Server:**
    ```bash
    cd backend
    pip install -r requirements.txt
    python3 main.py
    ```
    The backend API will be accessible at `http://localhost:8000`.

3.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    npm run dev # or yarn dev
    ```
    The frontend application will be accessible at `http://localhost:5173`.

4.  **Access ReconLab:**
    Open your web browser and navigate to `http://localhost:5173`.

## 💡 Usage

### Authentication
*   **Register**: Create a new account using your email and password.
*   **Login**: Sign in with your existing credentials.
*   **Demo Mode**: You can use any email/password combination for demo purposes; Firebase will handle the account creation.

### Running Scans
1.  Navigate to any module (e.g., "Subdomain Enumeration", "Endpoint Discovery").
2.  Enter the target (domain or URL).
3.  Click the "Run" button to start the scan.
4.  View the real-time output in the terminal-like interface.
5.  Once the scan is complete, click the "Store" button to save the results to your personal database.

### AI Assistant
1.  Go to the "AI Assistant" section.
2.  The OpenRouter provider with DeepSeek R1 is pre-configured.
3.  You can optionally paste scan results or reports into the "Context" field for the AI to analyze.
4.  Type your questions or requests related to cybersecurity, attack vectors, or penetration testing.

### Reports
1.  Visit the "Reports" section.
2.  View a list of all your stored scan results and session-only results.
3.  Click the "eye" icon to view the full report content in a modal.
4.  Click the "download" icon to save the report as a text file.
5.  Click the "trash" icon to delete a stored report from your database.

## 📂 Project Structure
reconlab/
├── backend/                  # FastAPI backend application
│   ├── main.py               # Main FastAPI application and API endpoints
│   ├── requirements.txt      # Python dependencies
│   └── outputs/              # Directory for tool outputs (e.g., dirsearch results)
├── src/                      # React frontend application
│   ├── App.tsx               # Main application component and routing
│   ├── main.tsx              # Entry point for React app
│   ├── index.css             # Tailwind CSS imports
│   ├── firebase/             # Firebase configuration
│   │   └── config.ts         # Firebase project settings
│   ├── context/              # React Context for global state (e.g., AuthContext)
│   │   └── AuthContext.tsx
│   ├── pages/                # Top-level page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   └── components/           # Reusable UI components
│       ├── Sidebar.tsx
│       ├── ProtectedRoute.tsx
│       ├── DashboardHome.tsx
│       └── modules/          # Individual security tool modules
│           ├── AIChat.tsx
│           ├── CMSScanner.tsx
│           ├── Dorking.tsx
│           ├── EndpointDiscovery.tsx
│           ├── FirewallDetection.tsx
│           ├── NmapScanning.tsx
│           ├── Notes.tsx
│           ├── ParameterDiscovery.tsx
│           ├── Reports.tsx
│           ├── SubdomainEnumeration.tsx
│           └── VulnerabilityChecklist.tsx
├── public/                   # Static assets
├── index.html                # Main HTML file
├── package.json              # Frontend dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── postcss.config.js         # PostCSS configuration



## 🤝 Contributing

Contributions are welcome! If you have suggestions, bug reports, or want to contribute code, please feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.

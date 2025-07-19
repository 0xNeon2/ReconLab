from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import subprocess
import asyncio
import uuid
import json
import os
from datetime import datetime
from typing import Optional, Dict, Any, List
import tempfile
import shutil
import logging
import re
import pexpect

# MongoDB connection
MONGODB_URL = "mongodb://localhost:27017"
DATABASE_NAME = "reconlab"

# Global MongoDB client
mongodb_client: AsyncIOMotorClient = None
database = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ReconLab API", version="1.0.0")

# MongoDB startup and shutdown events
@app.on_event("startup")
async def startup_db_client():
    global mongodb_client, database
    try:
        mongodb_client = AsyncIOMotorClient(MONGODB_URL)
        database = mongodb_client[DATABASE_NAME]
        # Test connection
        await database.command("ping")
        logger.info("Connected to MongoDB successfully")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        # Continue without MongoDB for development
        mongodb_client = None
        database = None

@app.on_event("shutdown")
async def shutdown_db_client():
    global mongodb_client
    if mongodb_client:
        mongodb_client.close()
        logger.info("Disconnected from MongoDB")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for scan results
scan_results: Dict[str, Dict[str, Any]] = {}
running_processes: Dict[str, asyncio.subprocess.Process] = {}

# MongoDB Models
class StoredScanResult(BaseModel):
    scan_id: str
    tool: str
    target: str
    command: str
    output: str
    status: str
    start_time: str
    end_time: Optional[str] = None
    created_at: str
    title: str

class StoreResultRequest(BaseModel):
    scan_id: str
    user_id: str
    title: Optional[str] = None


# Create outputs directory if it doesn't exist
os.makedirs("outputs", exist_ok=True)

# Below are Pydantic models used in  FastAPI backend to define the structure of request and
# response data for  API endpoints. ---------------------------------------------------------------#

class ToolRequest(BaseModel):
    tool: str
    target: str
    command: str
    scan_type: Optional[str] = None

class ScanResponse(BaseModel):
    scan_id: str
    status: str
    message: str

class ResultResponse(BaseModel):
    scan_id: str
    status: str
    output: str
    command: Optional[str] = None

class AIRequest(BaseModel):
    message: str
    api_key: str = "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"
    provider: str = "openrouter"  # openrouter, deepseek, or openai
    context: Optional[str] = None  # scan results or report context

class AIResponse(BaseModel):
    response: str
    suggestions: List[str] = []

# home page api -------------------------------------------------------------------------------------------#

@app.get("/")
async def root():
    return {"message": "ReconLab API is running"}

# ----------------------------------------------------------------------------------------------------------#
# api for running all tools --------------------------------------------------------------------------------#

@app.post("/api/run-tool", response_model=ScanResponse)
async def run_tool(request: ToolRequest):
    """Run a security tool with the given parameters"""
    # logger.info(f"Incoming request: {request.dict()}")
    scan_id = str(uuid.uuid4())
    
    # Initialize scan result
    scan_results[scan_id] = {
        "status": "running",
        "output": f"Starting {request.tool} scan...\n",
        "command": request.command,
        "tool": request.tool,
        "target": request.target,
        "start_time": datetime.now().isoformat()
    }
  
    # Start the tool execution in background
    asyncio.create_task(execute_tool(scan_id, request))
    
    return ScanResponse(
        scan_id=scan_id,
        status="running",
        message=f"Started {request.tool} scan"
    )

# ----------------------------------------------------------------------------------------------------------#
# api for vulnerability detection module as it needs to upload file ----------------------------------------#

# @app.post("/api/run-tool-with-file")
# async def run_tool_with_file(
#     file: UploadFile = File(...),
#     tool: str = Form(...),
#     command: str = Form(...)
# ):
#     """Run a security tool with an uploaded file"""
#     scan_id = str(uuid.uuid4())
    
#     # Save uploaded file temporarily
#     temp_dir = tempfile.mkdtemp()
#     file_path = os.path.join(temp_dir, file.filename)
    
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
    
#     # Initialize scan result
#     scan_results[scan_id] = {
#         "status": "running",
#         "output": f"Starting {tool} scan with uploaded file...\n",
#         "command": command,
#         "tool": tool,
#         "file_path": file_path,
#         "temp_dir": temp_dir,
#         "start_time": datetime.now().isoformat()
#     }
    
#     # Start the tool execution in background
#     asyncio.create_task(execute_tool_with_file(scan_id, tool, command, file_path, temp_dir))
    
#     return {"scan_id": scan_id, "status": "running", "message": f"Started {tool} scan"}

# ----------------------------------------------------------------------------------------------------------#
# api for all response -------------------------------------------------------------------------------------#

@app.get("/api/result/{scan_id}", response_model=ResultResponse)
async def get_result(scan_id: str):
    """Get the result of a scan by ID"""
    if scan_id not in scan_results:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    result = scan_results[scan_id]
    return ResultResponse(
        scan_id=scan_id,
        status=result["status"],
        output=result["output"],
        command=result.get("command"),
        progress=result.get("progress")
    )
    
# Dirsearch response functionality ------------------------------------------------------------------------#

FILE_DIRECTORY = "/home/ghost/dirsearch/outputs/"

@app.get("/api/results/{scan_id}", response_model=ResultResponse)
async def get_result(scan_id: str):
    """Get the result of a scan by ID"""
    if scan_id not in scan_results:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    # Prepare the path to the file based on the scan_id
    file_path = os.path.join(FILE_DIRECTORY, f"{scan_id}.txt")
    print(f"File path for scan {scan_id}: {file_path}")
    # Read the file contents
    try:
        with open(file_path, "r") as file:
            file_contents = file.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    
    result = scan_results[scan_id]
    result["output"] = file_contents  # Include the contents of the file in the response
    
    return ResultResponse(
        scan_id=scan_id,
        status=result["status"],
        output=result["output"],
        command=result.get("command"),
        progress=result.get("progress")
    )
# ----------------------------------------------------------------------------------------------------------#
# api for report ---------------------------------------------------------------------------------------------#

def generate_report(scan_id: str):
    """
    Save the full scan output as the report without filtering.
    """
    result = scan_results.get(scan_id)
    if not result:
        return None

    output = result.get("output", "").strip()

    if not output:
        output = "No output available for this scan."

    # Store full output as the report
    scan_results[scan_id]["report"] = output
    return output


@app.get("/api/reports")
async def get_reports(user_id: str = None):
    """Get stored reports from MongoDB for a specific user"""
    reports = []
    
    if database is not None:
        try:
            # Fetch from MongoDB for specific user
            query = {"user_id": user_id} if user_id else {}
            cursor = database.scan_results.find(query).sort("created_at", -1)
            async for doc in cursor:
                reports.append({
                    "id": str(doc["_id"]),
                    "scan_id": doc["scan_id"],
                    "title": doc["title"],
                    "content": doc["output"],
                    "module": doc["tool"],
                    "target": doc["target"],
                    "date": doc["created_at"],
                    "status": doc["status"],
                    "command": doc["command"]
                })
        except Exception as e:
            logger.error(f"Error fetching reports from MongoDB: {e}")
    
    
    return {"reports": reports}

@app.delete("/api/reports/{report_id}")
async def delete_report(report_id: str, user_id: str = None):
    """Delete a stored report from MongoDB"""
    if database is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        # Build query to ensure user can only delete their own reports
        query = {"_id": ObjectId(report_id)}
        if user_id:
            query["user_id"] = user_id
        
        result = await database.scan_results.delete_one(query)
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Report not found or access denied")
        
        return {"message": "Report deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting report: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete report")

@app.get("/api/report/{scan_id}")
async def get_report(scan_id: str):
    """Fetch or generate the auto-generated report summary for a scan"""
    if scan_id not in scan_results:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    report = scan_results[scan_id].get("report")
    
    # If report not generated yet, generate now
    if not report:
        report = generate_report(scan_id)
        if not report:
            raise HTTPException(status_code=404, detail="Report not available yet")
    
    return {"scan_id": scan_id, "report": report}

# Store scan result to MongoDB
@app.post("/api/store-result")
async def store_result(request: StoreResultRequest):
    """Store a scan result to MongoDB"""
    if database is None:
        raise HTTPException(status_code=503, detail="Database not available")
    
    scan_id = request.scan_id
    if scan_id not in scan_results:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    result = scan_results[scan_id]
    
    # Generate title if not provided
    title = request.title
    if not title:
        tool_name = result.get('tool', 'Unknown Tool').title()
        target = result.get('target', 'Unknown Target')
        title = f"{tool_name} Scan - {target}"
    
    # Prepare document for MongoDB
    document = {
        "scan_id": scan_id,
        "user_id": request.user_id,
        "tool": result.get("tool", "unknown"),
        "target": result.get("target", ""),
        "command": result.get("command", ""),
        "output": result.get("output", ""),
        "status": result.get("status", ""),
        "start_time": result.get("start_time", ""),
        "end_time": datetime.now().isoformat(),
        "created_at": datetime.now().isoformat(),
        "title": title
    }
    
    try:
        # Insert into MongoDB
        insert_result = await database.scan_results.insert_one(document)
        logger.info(f"Stored scan result {scan_id} to MongoDB with ID: {insert_result.inserted_id}")
        
        return {
            "message": "Scan result stored successfully",
            "stored_id": str(insert_result.inserted_id),
            "title": title
        }
    except Exception as e:
        logger.error(f"Error storing scan result to MongoDB: {e}")
        raise HTTPException(status_code=500, detail="Failed to store scan result")

# ----------------------------------------------------------------------------------------------------------#
# api for note ---------------------------------------------------------------------------------------------#

@app.post("/api/note")
async def save_note(note_data: dict):
    """Save a note (placeholder - in real app would save to database)"""
    return {"message": "Note saved successfully", "id": str(uuid.uuid4())}

@app.get("/api/note")
async def get_notes():
    """Get all notes (placeholder - in real app would fetch from database)"""
    return {"notes": []}


# ----------------------------------------------------------------------------------------------------------#
# AI api and functions -------------------------------------------------------------------------------------#

@app.post("/api/ai-chat", response_model=AIResponse)
async def ai_chat(request: AIRequest):
    """Chat with AI assistant for security analysis"""
    try:
        if request.provider == "openrouter":
            response = await chat_with_openrouter(request.message, request.api_key, request.context)
        elif request.provider == "deepseek":
            response = await chat_with_deepseek(request.message, request.api_key, request.context)
        else:
            response = await chat_with_openai(request.message, request.api_key, request.context)
        
        return AIResponse(
            response=response["response"],
            suggestions=response.get("suggestions", [])
        )
    except Exception as e:
        logger.error(f"AI chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI chat failed: {str(e)}")


async def chat_with_openrouter(message: str, api_key: str, context: Optional[str] = None) -> Dict[str, Any]:
    """Chat with OpenRouter API using DeepSeek model"""
    import aiohttp
    
    system_prompt = """You are an elite cybersecurity expert and ethical hacker assistant. You specialize in:

🔥 ATTACK VECTOR ANALYSIS - Identify and explain exploitation paths
⚡ PENETRATION TESTING - Provide step-by-step methodologies  
🛡️ VULNERABILITY ASSESSMENT - Analyze security weaknesses
🎯 PAYLOAD CRAFTING - Help create custom exploits
📊 REPORT ANALYSIS - Deep dive into reconnaissance findings

Your responses should be:
- Technical and precise with specific commands/tools
- Focused on ethical hacking and authorized testing only
- Include actionable exploitation steps
- Provide real-world attack scenarios
- Always emphasize responsible disclosure
- Use hacker terminology and mindset

Format responses with clear sections, bullet points, and code blocks when appropriate.

⚠️ CRITICAL: Only provide guidance for authorized penetration testing and bug bounty programs."""

    if context:
        system_prompt += f"\n\n🎯 SCAN CONTEXT:\n{context}\n\nAnalyze the above findings and provide specific attack recommendations."

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://reconlab.ai",
                    "X-Title": "ReconLab AI Assistant"
                },
                json={
                    "model": "deepseek/deepseek-r1:free",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": message}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 2000
                }
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    ai_response = data["choices"][0]["message"]["content"]
                    
                    # Extract suggestions from response
                    suggestions = extract_suggestions(ai_response)
                    
                    return {
                        "response": ai_response,
                        "suggestions": suggestions
                    }
                else:
                    error_text = await response.text()
                    raise Exception(f"OpenRouter API error: {response.status} - {error_text}")
    
    except Exception as e:
        logger.error(f"OpenRouter API error: {str(e)}")
        raise Exception(f"Failed to connect to OpenRouter: {str(e)}")

async def chat_with_deepseek(message: str, api_key: str, context: Optional[str] = None) -> Dict[str, Any]:
    """Chat with DeepSeek API"""
    import aiohttp
    
    system_prompt = """You are a cybersecurity expert and ethical hacker assistant. You help security professionals analyze findings, suggest attack vectors, and provide guidance on penetration testing methodologies. 

Your responses should be:
- Technical and precise
- Focused on ethical hacking and authorized testing
- Include specific tools and techniques
- Provide actionable suggestions
- Always emphasize responsible disclosure

Format your responses with clear sections and bullet points when appropriate."""

    if context:
        system_prompt += f"\n\nContext from scan results:\n{context}"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.deepseek.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "deepseek-chat",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": message}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 1000
                }
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    ai_response = data["choices"][0]["message"]["content"]
                    
                    # Extract suggestions from response
                    suggestions = extract_suggestions(ai_response)
                    
                    return {
                        "response": ai_response,
                        "suggestions": suggestions
                    }
                else:
                    error_text = await response.text()
                    raise Exception(f"DeepSeek API error: {response.status} - {error_text}")
    
    except Exception as e:
        logger.error(f"DeepSeek API error: {str(e)}")
        raise Exception(f"Failed to connect to DeepSeek: {str(e)}")

async def chat_with_openai(message: str, api_key: str, context: Optional[str] = None) -> Dict[str, Any]:
    """Chat with OpenAI API"""
    import aiohttp
    
    system_prompt = """You are a cybersecurity expert and ethical hacker assistant. You help security professionals analyze findings, suggest attack vectors, and provide guidance on penetration testing methodologies. 

Your responses should be:
- Technical and precise
- Focused on ethical hacking and authorized testing
- Include specific tools and techniques
- Provide actionable suggestions
- Always emphasize responsible disclosure

Format your responses with clear sections and bullet points when appropriate."""

    if context:
        system_prompt += f"\n\nContext from scan results:\n{context}"

    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-4",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": message}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 1000
                }
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    ai_response = data["choices"][0]["message"]["content"]
                    
                    # Extract suggestions from response
                    suggestions = extract_suggestions(ai_response)
                    
                    return {
                        "response": ai_response,
                        "suggestions": suggestions
                    }
                else:
                    error_text = await response.text()
                    raise Exception(f"OpenAI API error: {response.status} - {error_text}")
    
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}")
        raise Exception(f"Failed to connect to OpenAI: {str(e)}")

def extract_suggestions(response: str) -> List[str]:
    """Extract actionable suggestions from AI response"""
    suggestions = []
    
    # Look for bullet points or numbered lists
    lines = response.split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('•') or line.startswith('-') or line.startswith('*'):
            suggestions.append(line[1:].strip())
        elif re.match(r'^\d+\.', line):
            suggestions.append(re.sub(r'^\d+\.\s*', '', line))
    
    # If no bullet points found, look for sentences with action words
    if not suggestions:
        action_words = ['try', 'test', 'check', 'scan', 'analyze', 'investigate', 'exploit']
        sentences = re.split(r'[.!?]', response)
        for sentence in sentences:
            sentence = sentence.strip()
            if any(word in sentence.lower() for word in action_words) and len(sentence) > 20:
                suggestions.append(sentence)
    
    return suggestions[:5]  # Limit to 5 suggestions

# ------------------------------------------------------------------------------------------------------------------#
# generic function to run any tool (like ffuf, nmap, etc.) asynchronously and stream the output live to scan_results[scan_id]["output"]. 
# It reads line-by-line while the process runs. -------------------------------------------------------------------------------------#

async def _run_subprocess_async(scan_id: str, cmd_list: list, cwd: str = None):
    try:
        logger.info(f"Executing command: {' '.join(cmd_list)}")
        
        process = await asyncio.create_subprocess_exec(
            *cmd_list,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
            cwd=cwd
        )
        
        running_processes[scan_id] = process
        
        while True:
            line = await process.stdout.readline()
            if not line:
                break
            decoded_line = line.decode('utf-8', errors='ignore')
            scan_results[scan_id]["output"] += decoded_line
        
        await process.wait()
        
        if process.returncode == 0:
            scan_results[scan_id]["status"] = "completed"
            scan_results[scan_id]["output"] += f"\nScan completed successfully (exit code: {process.returncode})\n"
        else:
            scan_results[scan_id]["status"] = "failed"
            scan_results[scan_id]["output"] += f"\nScan failed with exit code: {process.returncode}\n"

        # Generate report after scan finished
        generate_report(scan_id)
            
    except FileNotFoundError:
        scan_results[scan_id]["status"] = "failed"
        scan_results[scan_id]["output"] += f"\nError: Command '{cmd_list[0]}' not found. Tool may not be installed.\n"
        logger.error(f"Command not found: {cmd_list[0]}")
        
    except Exception as e:
        logger.error(f"Error executing subprocess: {str(e)}")
        scan_results[scan_id]["status"] = "failed"
        scan_results[scan_id]["output"] += f"\nError: {str(e)}\n"
    finally:
        if scan_id in running_processes:
            del running_processes[scan_id]

# ------------------------------------------------------------------------------------------------------------------#
# a dedicated function for dirsearch -----------------------------------------------------------------#

async def _run_dirsearch_async(scan_id: str, target: str):
    output_file = f"outputs/{scan_id}.txt"
    wordlist = "/usr/share/wordlists/dirb/test.txt"
    cmd_list = ["python3", "dirsearch.py", "-u", target, "-w", wordlist,  "-o", output_file]
    
    try:
        logger.info(f"Executing dirsearch: {' '.join(cmd_list)}")
        
        process = await asyncio.create_subprocess_exec(
            *cmd_list,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.STDOUT,
            cwd="/home/ghost/dirsearch"
        )     
        running_processes[scan_id] = process
        await process.wait()

        if process.returncode == 0:
            scan_results[scan_id]["status"] = "completed"
            scan_results[scan_id]["progress"] = 100
        else:
            scan_results[scan_id]["status"] = "failed"

        # Read file output and generate report
        if os.path.exists(output_file):
            with open(output_file, "r") as f:
                file_output = f.read()
                scan_results[scan_id]["output"] = file_output
            generate_report(scan_id)
            
    except FileNotFoundError:
        scan_results[scan_id]["status"] = "failed"
        scan_results[scan_id]["output"] = "Error: dirsearch.py not found. Tool may not be installed.\n"
        logger.error("dirsearch.py not found")
        
    except Exception as e:
        logger.error(f"Error executing dirsearch: {str(e)}")
        scan_results[scan_id]["status"] = "failed"
        scan_results[scan_id]["output"] = f"Error: {str(e)}\n"
    finally:
        if scan_id in running_processes:
            del running_processes[scan_id]
            
# -------------------------------------------------------------------------------------------#
# tool authenticity check -------------------------------------------------------------------#

async def execute_tool(scan_id: str, request: ToolRequest):
    """Execute a security tool asynchronously"""
    try:
        tool = request.tool
        target = request.target
        logger.info(f"Tool received from frontend: {tool}")

        
        # Construct command based on tool
        if tool == "subfinder":
            # Real execution example - will work if subfinder is installed
            # In WebContainer, this will show "command not found" error
            cmd_list = ["subfinder", "-d", target, "--silent"]
            await _run_subprocess_async(scan_id, cmd_list)
            
            
        elif tool == "cmseek":
            # Real execution example - will work if cmseek is installed
            # In WebContainer, this will show "command not found" error
            cmd_list = ["cmseek", "-u", target]
            scan_results[scan_id]["output"] += f"Attempting to run: {' '.join(cmd_list)}\n"
            await _run_subprocess_async(scan_id, cmd_list)
            
        elif tool == "wafw00f":
            # Real execution example - will work if wafw00f is installed
            # In WebContainer, this will show "command not found" error
            cmd_list = ["wafw00f", target]
            scan_results[scan_id]["output"] += f"Attempting to run: {' '.join(cmd_list)}\n"
            await _run_subprocess_async(scan_id, cmd_list)
            
        elif tool == "nmap":
            # Real execution example - will work if nmap is installed
            # In WebContainer, this will show "command not found" error
            scan_type = request.scan_type or "default"
            
            if scan_type == "top-ports":
                cmd_list = ["nmap", "-T4", "--top-ports", "1000", "-v", target]
            elif scan_type == "service-version":
                cmd_list = ["nmap", "-sV", target]
            elif scan_type == "aggressive":
                cmd_list = ["nmap", "-A", target]
            elif scan_type == "stealth":
                cmd_list = ["nmap", "-sS", "-Pn", "-T4", target]
            elif scan_type == "vuln":
                cmd_list = ["nmap", "--script", "vuln", target]
            elif scan_type == "http-enum":
                cmd_list = ["nmap", "-p", "80,443", "--script", "http-enum", target]
            elif scan_type == "brute-force":
                cmd_list = ["nmap", "-p", "22", "--script", "ssh-brute", target]
            elif scan_type == "full-port":
                cmd_list = ["nmap", "-p-", "-T4", target]
            else:
                cmd_list = ["nmap", "-sS", target]
                
            scan_results[scan_id]["output"] += f"Attempting to run: {' '.join(cmd_list)}\n"
            await _run_subprocess_async(scan_id, cmd_list)
            
        elif tool == "arjun":
            # Real execution for Python-based tools
            # This assumes arjun exists in the current directory
            logger.info(f"Tool received from frontend: {tool}")
            cmd_list = ["arjun", "-u", target]
            scan_results[scan_id]["output"] += f"Attempting to run: {' '.join(cmd_list)}\n"
            await _run_subprocess_async(scan_id, cmd_list)
            
        elif tool == "dirsearch":
            # Special handling for dirsearch with file-based output
            scan_results[scan_id]["output"] = "Scan is writing to file only. See /api/result/parsed/{scan_id} for structured data."
            scan_results[scan_id]["progress"] = 0
            await _run_dirsearch_async(scan_id, target)
            
        else:
            # Generic simulation for unknown tools
            scan_results[scan_id]["output"] += f"Unknown tool: {tool}. Running generic simulation.\n"
            await simulate_generic_tool(scan_id, tool, target)
            
    except Exception as e:
        logger.error(f"Error in execute_tool: {str(e)}")
        scan_results[scan_id]["status"] = "failed"
        scan_results[scan_id]["output"] += f"\nError: {str(e)}\n"

# --------------------------------------------------------------------------------------------------#

# tool not found - generic simulation code ---------------------------------------------------------#

async def simulate_generic_tool(scan_id: str, tool: str, target: str):
    """Generic tool simulation"""
    scan_results[scan_id]["output"] += f"Running {tool} simulation on {target}...\n\n"
    await asyncio.sleep(2)
    
    scan_results[scan_id]["output"] += f"Tool execution completed successfully.\n"
    scan_results[scan_id]["output"] += f"Results saved for {target}\n"
    scan_results[scan_id]["status"] = "completed"

async def simulate_generic_file_tool(scan_id: str, tool: str, file_path: str):
    """Generic file-based tool simulation"""
    scan_results[scan_id]["output"] += f"Running {tool} simulation with uploaded file...\n\n"
    await asyncio.sleep(2)
    
    scan_results[scan_id]["output"] += f"Processing file: {os.path.basename(file_path)}\n"
    scan_results[scan_id]["output"] += f"Tool execution completed successfully.\n"
    scan_results[scan_id]["status"] = "completed"

# --------------------------------------------------------------------------------------------------#

@app.on_event("shutdown")
async def shutdown_event():
    """Clean up running processes on shutdown"""
    for scan_id, process in running_processes.items():
        try:
            process.terminate()
            await process.wait()
        except Exception as e:
            logger.warning(f"Error terminating process {scan_id}: {e}")
    
    # Close MongoDB connection
    await shutdown_db_client()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

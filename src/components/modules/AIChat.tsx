import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Settings, Zap, Shield, AlertTriangle, Copy, Download } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AISettings {
  provider: 'openrouter' | 'deepseek' | 'openai';
  apiKey: string;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<AISettings>({
    provider: 'openrouter',
    apiKey: 'YOUR API KEY'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [context, setContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('reconlab_ai_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading AI settings:', error);
      }
    }

    // Load chat history
    const savedMessages = localStorage.getItem('reconlab_ai_chat');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    } else {
      // Add welcome message
      setMessages([{
        id: '1',
        type: 'ai',
        content: `🔥 **ELITE CYBER ASSISTANT ONLINE** 🔥
*Powered by DeepSeek R1 via OpenRouter*

I'm your advanced AI-powered security consultant, ready to help you dominate:

⚡ **ATTACK VECTOR ANALYSIS** - Dissect scan results and map exploitation paths
🎯 **PENETRATION TESTING** - Step-by-step methodologies for maximum impact
🛠️ **TOOL MASTERY** - Advanced techniques with specialized security tools
📊 **INTELLIGENCE ANALYSIS** - Deep dive into reconnaissance findings
💥 **PAYLOAD ENGINEERING** - Craft custom exploits and bypass techniques
🔍 **VULNERABILITY CHAINING** - Connect findings for complex attack scenarios

**⚠️ AUTHORIZED TARGETS ONLY - RESPONSIBLE DISCLOSURE ALWAYS ⚠️**

Ready to hack? What's your target analysis?`,
        timestamp: new Date(),
        suggestions: [
          'Analyze these scan results for attack vectors',
          'Chain vulnerabilities for maximum impact',
          'Suggest advanced exploitation techniques',
          'Help me bypass WAF protections',
          'Create custom payloads for this target'
        ]
      }]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const saveSettings = (newSettings: AISettings) => {
    setSettings(newSettings);
    localStorage.setItem('reconlab_ai_settings', JSON.stringify(newSettings));
  };

  const saveChatHistory = (newMessages: Message[]) => {
    localStorage.setItem('reconlab_ai_chat', JSON.stringify(newMessages));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    if (!settings.apiKey && settings.provider !== 'openrouter') {
      alert('Please configure your API key in settings first!');
      setShowSettings(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          api_key: settings.apiKey,
          provider: settings.provider,
          context: context || undefined
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        suggestions: data.suggestions
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `❌ **ERROR**: ${error instanceof Error ? error.message : 'Unknown error occurred'}\n\nPlease check your API key and try again.`,
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_chat_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('reconlab_ai_chat');
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-500/20 rounded-lg relative">
            <Bot className="w-6 h-6 text-red-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">AI Security Assistant</h1>
            <p className="text-gray-400">Advanced AI-powered cybersecurity analysis</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={exportChat}
            className="p-2 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg transition-colors"
            title="Export Chat"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={clearChat}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="Clear Chat"
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI Configuration</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                AI Provider
              </label>
              <select
                value={settings.provider}
                onChange={(e) => saveSettings({...settings, provider: e.target.value as 'deepseek' | 'openai'})}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="openrouter">OpenRouter (DeepSeek R1)</option>
                <option value="deepseek">DeepSeek</option>
                <option value="openai">OpenAI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key {settings.provider === 'openrouter' && <span className="text-green-400">(Pre-configured)</span>}
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => saveSettings({...settings, apiKey: e.target.value})}
                placeholder={settings.provider === 'openrouter' ? 'Using pre-configured key' : 'Enter your API key'}
                disabled={settings.provider === 'openrouter'}
                className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Context (Optional - paste scan results or reports)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Paste scan results, reports, or any context you want the AI to analyze..."
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-24 resize-none"
            />
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100%-8rem)] bg-dark-800/50 rounded-xl border border-dark-700">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-center space-x-2 mb-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'ai' && (
                    <div className="p-1 bg-red-500/20 rounded">
                      <Bot className="w-4 h-4 text-red-400" />
                    </div>
                  )}
                  <span className="text-xs text-gray-400">
                    {message.type === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.type === 'ai' && (
                    <button
                      onClick={() => copyMessage(message.content)}
                      className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Copy message"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30'
                      : 'bg-gradient-to-r from-red-500/10 to-orange-500/10 text-gray-100 border border-red-500/30'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-mono text-sm">
                    {message.content}
                  </div>
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-dark-600">
                      <p className="text-xs text-gray-400 mb-2">💡 Quick Actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 text-gray-300 rounded-full text-xs transition-all duration-200 border border-red-500/30"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="p-1 bg-red-500/20 rounded">
                    <Bot className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xs text-gray-400">AI Assistant</span>
                </div>
                <div className="p-4 bg-dark-700/50 border border-dark-600 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    <span className="text-gray-400 text-sm ml-2">Analyzing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-dark-700">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your target, paste scan results, or ask for advanced exploitation techniques..."
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

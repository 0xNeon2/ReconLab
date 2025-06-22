import React, { useState, useEffect } from 'react';
import { FileText, Save, Download, Trash2 } from 'lucide-react';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<Array<{id: string, title: string, content: string, date: string}>>([]);

  useEffect(() => {
    // Load notes from localStorage on component mount
    const saved = localStorage.getItem('reconlab_notes');
    if (saved) {
      try {
        setSavedNotes(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, []);

  const saveNotes = () => {
    if (!notes.trim()) {
      alert('Please enter some notes before saving');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: notes.split('\n')[0].substring(0, 50) || 'Untitled Note',
      content: notes,
      date: new Date().toISOString()
    };

    const updatedNotes = [newNote, ...savedNotes];
    setSavedNotes(updatedNotes);
    localStorage.setItem('reconlab_notes', JSON.stringify(updatedNotes));
    setNotes('');
    
    // Show success message
    alert('Notes saved successfully!');
  };

  const downloadNotes = () => {
    if (!notes.trim()) {
      alert('Please enter some notes before downloading');
      return;
    }

    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reconlab_notes_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSavedNote = (note: any) => {
    const blob = new Blob([note.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = savedNotes.filter(note => note.id !== id);
      setSavedNotes(updatedNotes);
      localStorage.setItem('reconlab_notes', JSON.stringify(updatedNotes));
    }
  };

  const loadNote = (note: any) => {
    setNotes(note.content);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <FileText className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Notes</h1>
          <p className="text-gray-400">Take and manage your reconnaissance notes</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Note Editor */}
        <div className="lg:col-span-2">
          <div className="bg-dark-800/50 rounded-xl border border-dark-700">
            <div className="p-4 border-b border-dark-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Note Editor</h3>
              <div className="flex space-x-2">
                <button
                  onClick={saveNotes}
                  className="flex items-center px-3 py-1.5 bg-primary hover:bg-primary/80 text-dark-900 rounded-lg font-medium transition-colors text-sm"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={downloadNotes}
                  className="flex items-center px-3 py-1.5 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded-lg font-medium transition-colors text-sm"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Start taking your reconnaissance notes here...

Example:
Target: example.com
Date: 2025-01-XX

Subdomain Enumeration:
- Found admin.example.com
- Found api.example.com
- Found dev.example.com (interesting!)

Port Scan Results:
- Port 22 (SSH) - Open
- Port 80 (HTTP) - Open
- Port 443 (HTTPS) - Open

Vulnerabilities Found:
- Open redirect on /redirect endpoint
- Directory listing enabled on /backup/

Next Steps:
- Test admin panel access
- Check for default credentials
- Analyze backup directory contents"
                className="w-full h-96 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Saved Notes */}
        <div>
          <div className="bg-dark-800/50 rounded-xl border border-dark-700">
            <div className="p-4 border-b border-dark-700">
              <h3 className="text-lg font-semibold text-white">Saved Notes</h3>
              <p className="text-sm text-gray-400">Click to load, download, or delete</p>
            </div>
            <div className="p-4">
              {savedNotes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No saved notes yet</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-dark-700/50 rounded-lg p-3 border border-dark-600 hover:border-dark-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 
                          className="font-medium text-white text-sm cursor-pointer hover:text-primary transition-colors"
                          onClick={() => loadNote(note)}
                          title="Click to load this note"
                        >
                          {note.title}
                        </h4>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => downloadSavedNote(note)}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                            title="Download note"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(note.date).toLocaleDateString()} {new Date(note.date).toLocaleTimeString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {note.content.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/20">
            <h4 className="font-semibold text-white mb-2">Tips</h4>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>• Use clear headings to organize your notes</li>
              <li>• Include timestamps for important findings</li>
              <li>• Document both successful and failed attempts</li>
              <li>• Save notes regularly to avoid losing work</li>
              <li>• Use the download feature for backup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
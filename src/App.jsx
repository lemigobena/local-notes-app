import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MarkdownEditor from './editor/MarkdownEditor';
import { storage } from './core/storage/indexeddb';
import { encryptionManager } from './core/encryption/manager';
import { versioning } from './core/versioning/history';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const allNotes = await storage.getAllNotes();
    setNotes(allNotes);
    if (allNotes.length > 0 && !activeNote) {
      setActiveNote(allNotes[0]);
    }
    setLoading(false);
  };

  const handleNoteChange = async (content) => {
    if (!activeNote) return;
    
    const updatedNote = { ...activeNote, content };
    setActiveNote(updatedNote);
    
    // Save locally
    await storage.saveNote(updatedNote);
    
    // Debounced snapshot for history (simplified here)
    await versioning.saveSnapshot(activeNote.id, content);
  };

  const handleNewNote = async () => {
    const newNote = {
      title: 'Untitled Note',
      content: '',
      tags: [],
      notebookId: 1
    };
    const id = await storage.saveNote(newNote);
    const createdNote = { ...newNote, id };
    setNotes([createdNote, ...notes]);
    setActiveNote(createdNote);
  };

  if (loading) return <div className="loading">Initializing Secure Vault...</div>;

  return (
    <div className="app-container">
      <Sidebar 
        notes={notes} 
        activeNoteId={activeNote?.id} 
        onNoteSelect={setActiveNote}
        onNewNote={handleNewNote}
      />
      <main className="main-content fade-in">
        <MarkdownEditor 
          content={activeNote?.content || ''} 
          onChange={handleNoteChange} 
        />
      </main>
    </div>
  );
}

export default App;

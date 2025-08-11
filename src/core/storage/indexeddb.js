import Dexie from 'dexie';
import { encryptionManager } from '../encryption/manager';

const MASTER_KEY = 'demo-key'; // In a real app, this would be derived from user password

export const db = new Dexie('NotesAppDB');

db.version(1).stores({
  notes: '++id, title, notebookId, updatedAt, version, *tags',
  notebooks: '++id, name, createdAt',
  history: '++id, noteId, createdAt',
});

export const storage = {
  // Notes
  async getAllNotes() {
    const notes = await db.notes.toArray();
    return notes.map(note => ({
      ...note,
      content: encryptionManager.decrypt(note.content, MASTER_KEY)
    }));
  },
  
  async getNoteById(id) {
    const note = await db.notes.get(id);
    if (note && note.content) {
      note.content = encryptionManager.decrypt(note.content, MASTER_KEY);
    }
    return note;
  },
  
  async saveNote(note) {
    const encryptedContent = encryptionManager.encrypt(note.content, MASTER_KEY);
    const id = await db.notes.put({
      ...note,
      content: encryptedContent,
      updatedAt: new Date().toISOString(),
      version: (note.version || 0) + 1
    });
    return id;
  },
  
  async deleteNote(id) {
    await db.notes.delete(id);
  },
  
  // Notebooks
  async getAllNotebooks() {
    return await db.notebooks.toArray();
  },
  
  async createNotebook(name) {
    return await db.notebooks.add({
      name,
      createdAt: new Date().toISOString()
    });
  }
};

import { db } from '../storage/indexeddb';

export const versioning = {
  async saveSnapshot(noteId, content) {
    await db.history.add({
      noteId,
      snapshot: content,
      createdAt: new Date().toISOString()
    });
    
    // Keep only last 50 versions to save space
    const count = await db.history.where('noteId').equals(noteId).count();
    if (count > 50) {
      const oldest = await db.history
        .where('noteId').equals(noteId)
        .sortBy('createdAt');
      await db.history.delete(oldest[0].id);
    }
  },

  async getHistory(noteId) {
    return await db.history
      .where('noteId').equals(noteId)
      .reverse()
      .sortBy('createdAt');
  },

  async restoreVersion(historyId) {
    const entry = await db.history.get(historyId);
    if (!entry) return null;
    
    const note = await db.notes.get(entry.noteId);
    if (!note) return null;
    
    await db.notes.update(entry.noteId, {
      content: entry.snapshot,
      updatedAt: new Date().toISOString(),
      version: (note.version || 0) + 1
    });
    
    return entry.snapshot;
  }
};

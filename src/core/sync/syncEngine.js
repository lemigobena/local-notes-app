import { storage } from '../storage/indexeddb';

export const syncEngine = {
  isOnline: navigator.onLine,

  async startSync() {
    if (!this.isOnline) {
      console.log('Offline. Sync postponed.');
      return;
    }

    console.log('Starting sync...');
    const localNotes = await storage.getAllNotes();
    
    // In a real app, we'd compare versions with the server
    // For this project, we simulate a delta sync
    for (const note of localNotes) {
      if (note.needsSync) {
        await this.syncNote(note);
      }
    }
    console.log('Sync complete.');
  },

  async syncNote(note) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(async () => {
        console.log(`Synced note: ${note.title}`);
        // Mark as synced locally
        // await storage.saveNote({ ...note, needsSync: false });
        resolve(true);
      }, 500);
    });
  },

  handleConnectivityChange() {
    this.isOnline = navigator.onLine;
    if (this.isOnline) {
      this.startSync();
    }
  }
};

window.addEventListener('online', () => syncEngine.handleConnectivityChange());
window.addEventListener('offline', () => syncEngine.handleConnectivityChange());

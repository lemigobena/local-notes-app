import React from 'react';
import { Plus, Search, Book, Tag, Settings, Hash } from 'lucide-react';

const Sidebar = ({ notes, activeNoteId, onNoteSelect, onNewNote }) => {
  return (
    <div className="sidebar glass">
      <div className="sidebar-header">
        <h1>Shadow Notes</h1>
        <button className="btn btn-primary" onClick={onNewNote}>
          <Plus size={18} /> New Note
        </button>
      </div>

      <div className="sidebar-search">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search notes..." />
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="section-title"><Book size={14} /> Notebooks</div>
          <div className="nav-item active">Personal</div>
          <div className="nav-item">Work</div>
          <div className="nav-item">Research</div>
        </div>

        <div className="nav-section">
          <div className="section-title"><Tag size={14} /> Tags</div>
          <div className="tag-cloud">
            <span className="tag">#linux</span>
            <span className="tag">#ideas</span>
            <span className="tag">#todo</span>
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item"><Settings size={18} /> Settings</div>
      </div>
    </div>
  );
};

export default Sidebar;

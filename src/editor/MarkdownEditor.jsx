import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bold, Italic, List, ListOrdered, Image, Table, Code, Eye, Edit3 } from 'lucide-react';
import './MarkdownEditor.css';

const MarkdownEditor = ({ content, onChange }) => {
  const [view, setView] = useState('split'); // 'edit', 'preview', 'split'

  const insertText = (before, after = '') => {
    const textarea = document.getElementById('markdown-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    const newText = `${beforeText}${before}${selectedText}${after}${afterText}`;
    onChange(newText);
    
    // Reset focus and selection (simplified)
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="editor-container glass">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button onClick={() => insertText('**', '**')} title="Bold"><Bold size={18} /></button>
          <button onClick={() => insertText('_', '_')} title="Italic"><Italic size={18} /></button>
          <div className="divider"></div>
          <button onClick={() => insertText('- ')} title="Unordered List"><List size={18} /></button>
          <button onClick={() => insertText('1. ')} title="Ordered List"><ListOrdered size={18} /></button>
          <div className="divider"></div>
          <button onClick={() => insertText('```\n', '\n```')} title="Code Block"><Code size={18} /></button>
          <button onClick={() => insertText('| Header | Header |\n| --- | --- |\n| Cell | Cell |')} title="Table"><Table size={18} /></button>
          <button onClick={() => insertText('![Alt text](', ')')} title="Image"><Image size={18} /></button>
        </div>
        
        <div className="toolbar-group view-toggle">
          <button 
            className={view === 'edit' ? 'active' : ''} 
            onClick={() => setView('edit')}
          ><Edit3 size={18} /> Edit</button>
          <button 
            className={view === 'preview' ? 'active' : ''} 
            onClick={() => setView('preview')}
          ><Eye size={18} /> Preview</button>
          <button 
            className={view === 'split' ? 'active' : ''} 
            onClick={() => setView('split')}
          >Split</button>
        </div>
      </div>

      <div className={`editor-content ${view}`}>
        {(view === 'edit' || view === 'split') && (
          <textarea
            id="markdown-textarea"
            className="editor-textarea"
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your masterpiece..."
          />
        )}
        {(view === 'preview' || view === 'split') && (
          <div className="editor-preview markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || '*No content to preview*'}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;

export const searchNotes = (notes, query) => {
  if (!query) return notes;
  
  const lowerQuery = query.toLowerCase();
  return notes.filter(note => {
    const titleMatch = note.title?.toLowerCase().includes(lowerQuery);
    const contentMatch = note.content?.toLowerCase().includes(lowerQuery);
    const tagMatch = note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
    
    return titleMatch || contentMatch || tagMatch;
  });
};

export const filterByTag = (notes, tag) => {
  if (!tag) return notes;
  return notes.filter(note => note.tags?.includes(tag));
};

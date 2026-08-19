// ---- Note class: represents a single note ----
class Note {
  constructor(id, title, content, imageData) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.imageData = imageData || null;
    this.pinned = false;
    this.archived = false;
    this.createdAt = new Date().toISOString();
  }

  togglePin() {
    this.pinned = !this.pinned;
  }

  toggleArchive() {
    this.archived = !this.archived;
  }
}

// ---- Grab elements from the page ----
const notesList = document.getElementById('notes-list');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const newNoteBtn = document.getElementById('new-note-btn');
const noteEditor = document.getElementById('note-editor');
const titleInput = document.getElementById('note-title-input');
const contentInput = document.getElementById('note-content-input');
const imageInput = document.getElementById('image-input');
const imageFilename = document.getElementById('image-filename');
const saveNoteBtn = document.getElementById('save-note-btn');
const cancelNoteBtn = document.getElementById('cancel-note-btn');
const tabs = document.querySelectorAll('.tab');

// ---- App state ----
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentView = 'all';
let editingNoteId = null;
let pendingImageData = null;

// ---- Save notes to Local Storage ----
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// ---- Open the editor ----
function openEditor(note) {
  noteEditor.classList.remove('hidden');
  errorMessage.textContent = '';

  if (note) {
    editingNoteId = note.id;
    titleInput.value = note.title;
    contentInput.value = note.content;
    pendingImageData = note.imageData;
    imageFilename.textContent = note.imageData ? 'Image attached' : '';
  } else {
    editingNoteId = null;
    titleInput.value = '';
    contentInput.value = '';
    pendingImageData = null;
    imageFilename.textContent = '';
  }

  titleInput.focus();
}

function closeEditor() {
  noteEditor.classList.add('hidden');
  editingNoteId = null;
  pendingImageData = null;
  imageInput.value = '';
}

// ---- Handle image selection ----
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    pendingImageData = reader.result;
    imageFilename.textContent = file.name;
  };
  reader.readAsDataURL(file);
});

// ---- Save a note (new or edited) ----
saveNoteBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === '' && content === '') {
    errorMessage.textContent = 'Please add a title or some content before saving.';
    return;
  }

  if (editingNoteId) {
    const note = notes.find(n => n.id === editingNoteId);
    note.title = title;
    note.content = content;
    note.imageData = pendingImageData;
  } else {
    const newNote = new Note(Date.now(), title, content, pendingImageData);
    notes.unshift(newNote);
  }

  saveNotes();
  closeEditor();
  renderNotes();
});

cancelNoteBtn.addEventListener('click', closeEditor);
newNoteBtn.addEventListener('click', () => openEditor(null));

// ---- Delete a note ----
function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  renderNotes();
}

// ---- Toggle pin ----
function togglePin(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    note.togglePin();
    saveNotes();
    renderNotes();
  }
}

// ---- Toggle archive ----
function toggleArchive(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    note.toggleArchive();
    saveNotes();
    renderNotes();
  }
}

// ---- Tab switching ----
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentView = tab.dataset.view;
    renderNotes();
  });
});

// ---- Search ----
searchInput.addEventListener('input', renderNotes);

// ---- Render notes onto the page ----
function renderNotes() {
  notesList.innerHTML = '';

  const keyword = searchInput.value.trim().toLowerCase();

  let visibleNotes = notes.filter(note => {
    if (currentView === 'pinned' && !note.pinned) return false;
    if (currentView === 'archived' && !note.archived) return false;
    if (currentView !== 'archived' && note.archived) return false;

    if (keyword !== '') {
      const inTitle = note.title.toLowerCase().includes(keyword);
      const inContent = note.content.toLowerCase().includes(keyword);
      if (!inTitle && !inContent) return false;
    }

    return true;
  });

  visibleNotes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  visibleNotes.forEach(note => {
    const row = document.createElement('div');
    row.className = 'note-row';

    const dateLabel = new Date(note.createdAt).toLocaleDateString();
    const snippet = note.content.slice(0, 60);

    row.innerHTML = `
      <button class="pin-icon ${note.pinned ? 'pinned' : ''}">📌</button>
      ${note.imageData ? `<img class="note-thumb" src="${note.imageData}">` : ''}
      <div class="note-info">
        <div class="note-title-row">
          <span class="note-title"></span>
          <span class="note-date">${dateLabel}</span>
        </div>
        <p class="note-snippet"></p>
      </div>
      <div class="note-actions">
        <button class="edit-btn">✎</button>
        <button class="archive-btn">${note.archived ? '↩️' : '🗄️'}</button>
        <button class="delete-btn">✕</button>
      </div>
    `;

    row.querySelector('.note-title').textContent = note.title || '(untitled)';
    row.querySelector('.note-snippet').textContent = snippet;

    row.querySelector('.pin-icon').addEventListener('click', (e) => {
      e.stopPropagation();
      togglePin(note.id);
    });

    row.querySelector('.edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openEditor(note);
    });

    row.querySelector('.archive-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleArchive(note.id);
    });

    row.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteNote(note.id);
    });

    row.addEventListener('click', () => openEditor(note));

    notesList.appendChild(row);
  });
}

// ---- Initial render on page load ----
renderNotes();
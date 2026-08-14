# NOTE-APP # Notes Application

## Project Requirements

1. The user can create a new note.
2. The user can view all saved notes.
3. The user can edit an existing note.
4. The user can delete a note.
5. The user can search notes by title or keyword.
6. The app saves notes so they remain after refreshing the page.

## Classes/Functions Needed

- class Note
  - (represents a single note, with a title and content)
- addNote(title, content)
- deleteNote(id)
- editNote(id, newTitle, newContent)
- searchNotes(keyword)
- saveToStorage()
- loadFromStorage()

## Input/Output Sketch

| Feature | Input | Output |
|---|---|---|
| Add note | Title and content typed, Save clicked | New note appears in the list |
| Display notes | Page loads | All saved notes shown |
| Edit note | Note clicked, new text entered | Note updates in the list |
| Delete note | Delete button clicked | Note removed from the list |
| Search notes | Text typed in search box | Only matching notes shown |
| Save/Load | Any change to notes | Notes persist after refresh |
| Empty note | Save clicked with no title/content | Warning shown, no note saved |

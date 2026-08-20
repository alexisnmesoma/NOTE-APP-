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
## Testing Results

The app was tested with normal input and with unusual/edge-case input before submission.

### Normal Input Testing

| Test | Steps | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| Create note | Enter title and content, click Save | New note appears in the list | New note appeared in the list | Pass |
| Display notes | Open/refresh the app | All saved notes are shown | All saved notes displayed correctly | Pass |
| Edit note | Click a note, change title/content, save | Note updates in the list | Note updated correctly | Pass |
| Delete note | Click delete on a note | Note is removed from the list | Note removed successfully | Pass |
| Search notes | Type a keyword in the search box | Only matching notes are shown | Only matching notes displayed | Pass |
| Local Storage persistence | Add notes, refresh the page | Notes remain after refresh | Notes persisted after refresh | Pass |
| Pin note | Click the pin icon on a note | Note moves to the top of the list | Note moved to top | Pass |
| Archive note | Click archive on a note | Note moves to Archived tab, hidden from All | Note moved to Archived tab | Pass |
| Attach image | Add an image while creating a note | Image displays with the note | Image displayed correctly | Pass |

### Edge-Case / Unusual Input Testing

| Test | Steps | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| Empty note | Click Save with no title or content entered | Note is not saved; warning shown | Empty note was blocked, warning shown | Pass |
| Very long title | Enter a title with 100+ characters | Layout stays intact, text wraps/truncates cleanly | Layout remained intact | Pass |
| Search with no matches | Type a keyword that matches no notes | Empty state shown, no errors | Empty state shown correctly | Pass |
| Refresh after edits | Edit a note, refresh the page | Edited version persists | Edited version persisted correctly | Pass |

### Bugs Found and Fixed

**Bug 1: JavaScript syntax error breaking all buttons**
While building the note rendering logic in `script.js`, an `<img>` tag was inserted into a template literal without the surrounding backticks. This caused a JavaScript syntax error that broke every button on the page, not just the image feature.
- **Fix:** Added the missing backticks before `<img` and after the closing `>`, which resolved the syntax error and restored all button functionality.

**Bug 2: Missing closing brace in CSS**
A closing curly brace `}` was missing at the very end of `style.css`, after the responsive `@media` block. This caused a CSS parsing warning and could have affected the responsive styles on smaller screens.
- **Fix:** Added the missing `}` at the end of the file, resolving the warning and confirming the responsive layout worked correctly.

## How to Run

This app runs entirely in the browser — no installation, server, or build tools required.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html` (or right-click and choose "Open with" your preferred browser, e.g. Chrome or Edge).
4. The app will load directly in your browser.

All notes are saved automatically to your browser's Local Storage, so your notes will still be there the next time you open the app on the same browser and computer.s
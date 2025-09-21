## autosave notepad application


Create an autosave notepad application, where:

i) there will be a large text area for typing notes, a note can have max 200 words.Show live counts below the text.(like 10/200)

ii) Whatever the user 
types should auto-save to localStorage every 2 seconds of inactivity.
Show a small status message:
"All changes saved" (after save) or, "Saving..." (while typing and before the timer finishes)

iii) On page reload, the note should load from localStorage.

iv) A button "Save Now" that instantly saves text to localStorage and updates status.

v) A "Clear" button to remove draft from screen and localStorage.

vi) Allow creating multiple notes (like tabs or a list), switching between them, each one persisted separately, and show them in a sidebar. (take first line as title)

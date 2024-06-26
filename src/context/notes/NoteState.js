import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'Please authenticate using a valid token') {
        } else {
          console.error("Unexpected error:", errorData.error);
          setNotes([]);
        }
        return;
      }

      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Expected an array, but got:", json);
        setNotes([]);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };


  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
  
      const json = await response.json();
      console.log("Server response:", json); // Log the entire response
  
      console.log("Added note with ID:", json._id); // Log the ID
      const note = {
        _id: json._id,
        user: json.user,
        title,
        description,
        tag,
        date: json.date,
        __v: json.__v
      };
  
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };
  


  // Delete a Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token') // Using stored token
        }
      });
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token') // Using stored token
        },
        body: JSON.stringify({ title, description, tag })
      });

      const json = await response.json();
      console.log("Edited note with ID:", id); // Log the ID
      let newNotes = JSON.parse(JSON.stringify(notes));
      // Logic to edit notes
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
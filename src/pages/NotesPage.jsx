//import {fakeData as notes } from "../assets/FakeData"
import NoteCard from "../components/NoteCard";
import {db} from "../appwrite/databases.js";
import {databases} from "../appwrite/config.js";
import { useState, useEffect} from "react";
//import { NotesContext } from "../context/NotesContext";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  
  useEffect(()=>{
    init();
  },[]);

  const init = async () => {
    const response = await db.notes.list();
    setNotes(response.documents);
  }

  return (
  <div>
    {notes.map((note) => (
      <NoteCard key={note.$id} note={note}/>
    ))}
  </div>
  );
};

export default NotesPage;

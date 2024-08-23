import NoteCard from "../components/NoteCard";
import {db} from "../appwrite/databases.js";
import {databases} from "../appwrite/config.js";
import { useState, useEffect,useContext} from "react";
import { NotesContext } from "../context/NotesContext";
import Controls from "../components/Controls.jsx";

const NotesPage = () => {
  const {notes,setNotes} = useContext(NotesContext);
  //const [notes, setNotes] = useState([]);
  //
  //useEffect(()=>{
  //  init();
  //},[]);
//
  //const init = async () => {
  //  const response = await db.notes.list();
  //  setNotes(response.documents);
  //}

  return (
  <div>
    {notes.map((note) => (
      <NoteCard key={note.$id} note={note}/>
    ))}
    <Controls />
  </div>
  );
};

export default NotesPage;

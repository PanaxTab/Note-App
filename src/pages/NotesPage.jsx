import {fakeData as notes } from "../assets/FakeData"
import NoteCard from "../components/NoteCard";
//import { useContext } from "react";
//import { NotesContext } from "../context/NotesContext";

const NotesPage = () => {
  //const {notes} = useContext(NotesContext);
  return (
  <div>
    {notes.map((note) => (
      <NoteCard note={note} key={note.$id}/>
    ))}
  </div>
  );
};

export default NotesPage;
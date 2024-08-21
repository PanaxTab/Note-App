import {fakeData as notes } from "../assets/FakeData.js"
import NoteCard from "../components/NoteCard.jsx";

const NotesPage = () => {
  return (
  <div>
    {notes.map((note) => (
      <NoteCard note={note} key={note.$id}/>
    ))}
  </div>
  );
};

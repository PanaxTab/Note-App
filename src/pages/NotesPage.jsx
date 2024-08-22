import {fakeData as notes } from "../assets/FakeData"
import NoteCard from "../components/NoteCard";

const NotesPage = () => {
  return (
  <div>
    {notes.map((note) => (
      <NoteCard note={note} key={note.$id}/>
    ))}
  </div>
  );
};

export default NotesPage;
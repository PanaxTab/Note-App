const NoteCard = ({note}) => {
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  
  return (
  <div className="card" style={backgroundColor:color.colorBody,}>
    {body}
  </div>
  );
}

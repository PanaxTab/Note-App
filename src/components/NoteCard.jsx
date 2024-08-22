import Trash from "../icons/Trash.jsx"
const NoteCard = ({note}) => {
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  
  return (
  <div className="card" style={{backgroundColor:color.colorBody,}}>
    <div className="card-header" style={{
        backgroundColor:colors.colorHeader,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}>
        <Trash />
    </div>
    <div className="card-body">
      <textarea style={{color:colors.colorText}} defeaultValue={body}>
      </textarea>
    </div>
  </div>
  );
}

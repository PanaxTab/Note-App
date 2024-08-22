import Trash from "../icons/Trash.jsx"

useEffect(() => {
  autoGrow(textAreaRef);
}, [])

//Changes position of a note from a static variable to a static hook
const [position,setPosition] = useState(JSON.parase(note.position));

//Starting position of where the mouse clicked and then moved
let mouseStartPos = {x:0,y:0};
const cardRef = useRef(null);

function autoGrow(textAreaRef){
  const {current} = textAreaRef;
  current.style.height = "auto";
  current.style.height = scrollHeight + "px";
}

const mouseUp = () => {
  document.removeEventListener("mousemove",mouseMove);
  document.removeEventListener("mouseup", mouseUp)
};

const mouseDown = (e) =>{
  mouseStartPos.x = e.clientX;
  mouseStartPos.y = e.clientY;
  document.addEventListener("mousemove",mouseMove);
}

const mouseMove = (e) =>{
  let mouseMoveDir = {
  x: mouseStartPos.x - e.clientX, 
  y: mouseStartPos.y - e.clientY,
  };
  mouseStartPos.x = e.clientX;
  mouseStartPos.y = e.clientY;

  setPosition({
    x: cardRef.current.offsetLeft - mouseMoveDir.x,
    y: cardRef.current.offsetLeft - mouseMoveDir.y,
  });
};

const textAreaRef = useRef(null);
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
      }}
      onMouseDown = {mouseDown}
      >
        <Trash />
    </div>
    <div className="card-body">
      <textarea 
        style={{color:colors.colorText}} 
        defeaultValue={body} 
        ref={textAreaRef}>
        onInput={()=>{
          autoGrow(textAreaRef);
        }}
      </textarea>
    </div>
  </div>
  );
}

export default Notecard;

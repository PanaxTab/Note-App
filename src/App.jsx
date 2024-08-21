import NotesPage from "./pages/NotesPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="app">
        <NotesPage />
      </div>
    </>
  )
}

export default App

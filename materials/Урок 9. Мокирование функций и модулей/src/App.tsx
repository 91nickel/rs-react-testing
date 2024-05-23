import { useState } from "react"
import { Input } from "./components/Input"
import { AddButton } from "./components/AddButton";
import { Notifier } from "./components/Notifier";


import './styles.css'

export const App = () => {
  const [inputValue, setinputValue] = useState("");
  const [notifierOpen, setNotifierOpen] = useState(false);
  

  const handleAddButtonClick = () => {
    console.log('Button was clicked!');
  }

  const handleNotifierClose = () => {
    setNotifierOpen(false);
  }

  return (
    <div className="root-container">
      <Notifier
        open={notifierOpen}
        task="Любая задача"
        onClose={handleNotifierClose}
      />
      <Input
        defaultValue={inputValue}
        onChange={(val) => setinputValue(val)}
      />
      <AddButton onClick={handleAddButtonClick} />
      <button onClick={() => setNotifierOpen(true)}>Показать нотификацию</button>
    </div>
  )
}

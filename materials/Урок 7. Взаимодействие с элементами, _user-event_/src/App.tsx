import { useState } from "react"
import { Input } from "./components/Input"
import { AddButton } from "./components/AddButton";
import './styles.css'

export const App = () => {
  const [inputValue, setinputValue] = useState("");

  const handleAddButtonClick = () => {
    console.log('Button was clicked!');
  }

  return (
    <div className="root-container">
      <Input
        defaultValue={inputValue}
        onChange={(val) => setinputValue(val)}
      />
      <AddButton onClick={handleAddButtonClick} />
    </div>
  )
}

import { useState } from "react"
import { Input } from "./components/Input"

export const App = () => {
  const [inputValue, setinputValue] = useState("");

  return (
    <Input value={inputValue} onChange={(val) => setinputValue(val)} />
  )
}

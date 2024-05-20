import { ChangeEvent, useState } from "react";

import './style.css';

type Props = {
    value: string,
    onChange: (value: string) => void;
}

export const Input = ({ value, onChange }: Props) => {
  const [labelValue, setlabelValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    if (val.length > 32) {
        setlabelValue(`Превышена максимальная длина заголовка ${val.length}`);
    } else {
        setlabelValue("");
        onChange(val);
    }
  }

  return (
    <div className="input-field">
        <span>Введите заголовок</span>
        <input type="text" value={value} onChange={handleChange} />
        <label>{labelValue}</label>
    </div>
  )
}

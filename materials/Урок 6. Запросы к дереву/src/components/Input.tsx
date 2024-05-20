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
        onChange(`${val}`);
    }
  }

  return (
    <div className="input-field">
        <label
          htmlFor="input-header-field-id"
          data-testid="input-label"
        >
          Введите заголовок
        </label>
        <input
          id="input-header-field-id"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={`например, введите "купить молоко"`}
          alt="поле для ввода заголовка задачи"
          title="поле для заголовка"
          data-testid="input-field"
        />
        <span data-testid="input-hint-text">{labelValue}</span>
    </div>
  )
}

import React from "react";
import styled from "styled-components";
import { Input, InputBorder } from "./_c_exports";

const InputContainer = styled.div`
  display: flex;
  width: 100%;
`;
interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  onChange?: (val: string) => void;
  value?: string;
  readonly?: boolean;
}
export const InputField: React.FC<InputFieldProps> = ({
  type,
  onChange,
  value,
  readonly,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <InputContainer>
      <InputBorder>
        <Input
          type={type ?? "text"}
          placeholder={"00.00"}
          value={value}
          onChange={handleChange}
          readOnly={readonly}
        />
      </InputBorder>
    </InputContainer>
  );
};

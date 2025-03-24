import { Dispatch, SetStateAction, useState } from "react";

export const useToggle = (
  initialState: boolean = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle, setState];
};

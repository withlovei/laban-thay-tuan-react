import { useState } from "react";

export const useToggle = (
  initialState: boolean = false
): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

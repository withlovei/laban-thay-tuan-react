import { useState } from "react";

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => {
    setIsVisible(false);
  };

  const onOpen = () => {
    setIsVisible(true);
  };
  return {
    isVisible,
    onClose,
    onOpen,
  };
};

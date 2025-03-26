import React, { useEffect, useState } from "react";
import { InteractionManager } from "react-native";

interface AfterAnimationsProps {
  children: React.ReactNode;
}

export const AfterAnimations: React.FC<AfterAnimationsProps> = ({
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setShouldRender(true);
    });
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
};

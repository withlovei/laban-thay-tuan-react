import React, { createContext, useContext, useState } from 'react';

type InformationContextType = {
  isInformationVisible: boolean;
  showInformation: () => void;
  hideInformation: () => void;
};

const InformationContext = createContext<InformationContextType | undefined>(undefined);

export const InformationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInformationVisible, setIsInformationVisible] = useState(false);

  const showInformation = () => setIsInformationVisible(true);
  const hideInformation = () => setIsInformationVisible(false);

  return (
    <InformationContext.Provider
      value={{
        isInformationVisible,
        showInformation,
        hideInformation,
      }}
    >
      {children}
    </InformationContext.Provider>
  );
};

export const useInformation = () => {
  const context = useContext(InformationContext);
  if (context === undefined) {
    throw new Error('useInformation must be used within an InformationProvider');
  }
  return context;
}; 
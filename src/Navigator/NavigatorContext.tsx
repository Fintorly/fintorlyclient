import React, {createContext, ReactElement} from 'react';

export type StackType = 'splash' | 'auth' | 'postLogin' | 'home' | 'profile' ;

type NavigatorValues = {
  activeStack: StackType;
  setActiveStack: (stackType: StackType) => void;
};

const NavigatorContext = createContext<NavigatorValues>({
  activeStack: 'splash',
  setActiveStack: () => {},
});

export const NavigatorProvider = ({children}: {children: ReactElement}) => {
  const [activeStack, setActiveStack] = React.useState<StackType>('splash');

  return (
    <NavigatorContext.Provider
      value={{
        activeStack,
        setActiveStack: (stackType: StackType) => {
          setActiveStack(stackType);
        },
      }}>
      {children}
    </NavigatorContext.Provider>
  );
};

export default NavigatorContext;

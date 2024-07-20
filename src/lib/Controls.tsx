import { OrbitControls } from "@react-three/drei";
import { createContext, ReactNode, useContext, useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type ControlsProps = {
  children: ReactNode;
};

const ControlsContext = createContext<OrbitControlsImpl | null>(null);

export const ControlsProvider = ({ children }: ControlsProps) => {
  const orbitControls = useRef<OrbitControlsImpl>(null);
  return (
    <ControlsContext.Provider value={orbitControls.current}>
      {children}
      <OrbitControls ref={orbitControls} />
    </ControlsContext.Provider>
  );
};

export const useControls = () => {
  return useContext(ControlsContext);
};

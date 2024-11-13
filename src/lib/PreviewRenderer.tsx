import { Canvas } from "@react-three/fiber";
import { PropsWithChildren } from "react";

export const PreviewRenderer = ({ children }: PropsWithChildren) => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      {children}
    </Canvas>
  );
};

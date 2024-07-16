import { ReactNode } from "react";
import { Canvas as FiberCanvas } from "@react-three/fiber";

type CanvasProps = {
  children: ReactNode;
};

export const Canvas = ({ children }: CanvasProps) => {
  return <FiberCanvas>{children}</FiberCanvas>;
};

import { useGesture } from "react-use-gesture";
import { ReactNode, useState } from "react";
import { MeshProps, ThreeElements, useThree } from "@react-three/fiber";
import { useControls } from "./Controls";

type Props = ThreeElements["mesh"] & {
  children: ReactNode;
};

export const DraggableMesh = ({ children, ...rest }: Props) => {
  const controls = useControls();
  const [position, setPosition] = useState<MeshProps["position"]>();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      if (controls) {
        controls.enabled = false;
      }
      setPosition([x / aspect, -y / aspect, 0]);
    },
    onDragEnd: () => {
      if (controls) {
        controls.enabled = true;
      }
    },
  });

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <mesh {...rest} {...(bind() as any)} position={position}>
      {children}
    </mesh>
  );
};

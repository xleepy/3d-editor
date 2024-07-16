import { ThreeElements, useThree } from "@react-three/fiber";
import { useState } from "react";
import { useGesture } from "react-use-gesture";
import { Color } from "three";

type MeshProps = ThreeElements["mesh"];

export const ColorNames = Color.NAMES;

export const Box = ({
  color,
  ...rest
}: MeshProps & { color: keyof typeof ColorNames }) => {
  const [position, setPosition] = useState<MeshProps["position"]>();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      setPosition([x / aspect, -y / aspect, 0]);
    },
  });

  console.log("in component", color);

  return (
    <mesh {...rest} {...bind()} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

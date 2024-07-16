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

  return (
    // types mismatch between bind and mesh
    // https://github.com/pmndrs/use-gesture/issues/374
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <mesh {...rest} {...(bind() as any)} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

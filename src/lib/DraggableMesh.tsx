import { useGesture } from "@use-gesture/react";
import { ReactNode, useState } from "react";
import { MeshProps, ThreeElements } from "@react-three/fiber";
import { useControls } from "./Controls";
import { Vector3, Plane } from "three";
import { ground } from "../constants";

type Props = ThreeElements["mesh"] & {
  children: ReactNode;
};

export const DraggableMesh = ({
  children,
  position: initialPosition,
  ...rest
}: Props) => {
  const controls = useControls();
  const [position, setPosition] =
    useState<MeshProps["position"]>(initialPosition);

  const bind = useGesture({
    onDrag: ({ event }) => {
      if (controls) {
        controls.enabled = false;
      }
      const floorPlane = new Plane(new Vector3(0, 1, 0), 0);
      const planeIntersectPoint = new Vector3();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event as any).ray.intersectPlane(floorPlane, planeIntersectPoint);
      setPosition([planeIntersectPoint.x, ground, planeIntersectPoint.z]);
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

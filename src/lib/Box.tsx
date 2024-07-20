import { Color } from "three";
import { EditorObjectProps } from "../App";
import { DraggableMesh } from "./DraggableMesh";

export const ColorNames = Color.NAMES;

export const Box = ({ color, ...rest }: EditorObjectProps) => {
  return (
    // types mismatch between bind and mesh
    // https://github.com/pmndrs/use-gesture/issues/374
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <DraggableMesh {...rest}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </DraggableMesh>
  );
};

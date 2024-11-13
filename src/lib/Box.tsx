import { Color } from "three";
import { EditorObjectProps } from "../App";
import { DraggableMesh } from "./DraggableMesh";
import { memo } from "react";

export const ColorNames = Color.NAMES;

export const Box = memo(
  ({ color, draggable = true, ...rest }: EditorObjectProps) => {
    const DraggableWrapper = draggable ? DraggableMesh : "mesh";
    return (
      // types mismatch between bind and mesh
      // https://github.com/pmndrs/use-gesture/issues/374
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <DraggableWrapper {...rest}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </DraggableWrapper>
    );
  }
);

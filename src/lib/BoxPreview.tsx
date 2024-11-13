import { Color } from "three";
import { ColorNames } from "../App";
import { Box } from "./Box";
import { PreviewRenderer } from "./PreviewRenderer";

const colorKeys = Object.keys(Color.NAMES);

export const BoxPreview = () => {
  const randomColor = colorKeys[
    Math.round(Math.random() * colorKeys.length - 1)
  ] as ColorNames;
  return (
    <div>
      <p>Drag box to canvas</p>
      <div
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData("color", randomColor);
        }}
      >
        <PreviewRenderer>
          <Box
            draggable={false}
            color={randomColor}
            rotation={[10, 4, 0]}
            position={[0, 0, 3]}
          />
        </PreviewRenderer>
      </div>
    </div>
  );
};

import { ReactNode, useState } from "react";
import { Box, ColorNames } from "./lib/Box";
import { Canvas } from "./lib/Canvas";
import { Grid, Stats } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { ControlsProvider } from "./lib/Controls";

const colorKeys = Object.keys(ColorNames);

export type EditorObjectProps = ThreeElements["mesh"] & {
  color: keyof typeof ColorNames;
};

type EditorObject = {
  component: (props: EditorObjectProps) => ReactNode;
  props: EditorObjectProps;
};

function App() {
  const [elements, setElements] = useState<EditorObject[]>([]);
  return (
    <div className="flex flex-1">
      <div className="flex-half">
        <button
          onClick={() =>
            setElements((elems) => {
              const randomColor = colorKeys[
                Math.round(Math.random() * colorKeys.length - 1)
              ] as keyof typeof ColorNames;
              return [
                ...elems,
                { component: Box, props: { color: randomColor } },
              ];
            })
          }
        >
          Create Box
        </button>
      </div>
      <Canvas>
        <ControlsProvider>
          <ambientLight intensity={Math.PI / 2} />
          {elements.map(({ component, props }, idx) => {
            const Component = component;
            return <Component key={idx} {...props} />;
          })}
        </ControlsProvider>
        <Grid infiniteGrid />
        <Stats className="position-right" />
      </Canvas>
    </div>
  );
}

export default App;

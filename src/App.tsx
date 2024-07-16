import { ReactNode, useState } from "react";
import { Box, ColorNames } from "./lib/Box";
import { Canvas } from "./lib/Canvas";
import { Stats } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

const colorKeys = Object.keys(ColorNames);

type EditorObjectProps = ThreeElements["mesh"] & {
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
        <ambientLight intensity={Math.PI / 2} />
        {elements.map(({ component, props }, idx) => {
          const Component = component;
          return <Component key={idx} {...props} />;
        })}
        {/* <OrbitControls /> */}
        <Stats className="position-right" />
      </Canvas>
    </div>
  );
}

export default App;

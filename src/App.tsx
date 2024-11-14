import { ReactNode, useRef, useState } from "react";
import { Box, ColorNames } from "./lib/Box";
import { Stats } from "@react-three/drei";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { ControlsProvider } from "./lib/Controls";
import { BoxPreview } from "./lib/BoxPreview";
import { Camera, Mesh, Raycaster, Vector2 } from "three";

export type ColorNames = keyof typeof ColorNames;

export type EditorObjectProps = ThreeElements["mesh"] & {
  color: ColorNames;
  draggable?: boolean;
};

type EditorObject = {
  component: (props: EditorObjectProps) => ReactNode;
  props: EditorObjectProps;
};

function App() {
  const [elements, setElements] = useState<EditorObject[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groundRef = useRef<Mesh>(null);
  const [camera, setCamera] = useState<Camera | null>(null);

  const dragOverCanvas = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropOnCanvas = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const color = (event.dataTransfer.getData("color") ?? "aqua") as ColorNames;
    const rect = canvasRef.current?.getBoundingClientRect();
    const ground = groundRef.current;
    if (!rect || !camera || !ground) {
      return;
    }
    const mouse = new Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, camera); // Assuming you have a camera reference
    const intersects = raycaster.intersectObject(ground); // Assuming you have a ground reference
    if (intersects.length > 0) {
      const { point } = intersects[0];
      setElements((elems) => {
        return [
          ...elems,
          {
            component: Box,
            props: { color, position: [point.x, point.y + 0.5, point.z] },
          },
        ];
      });
    }
  };
  return (
    <div className="flex flex-1">
      <div className="flex-half side-panel">
        <BoxPreview />
      </div>
      <div className="flex-1" onDrop={dropOnCanvas} onDragOver={dragOverCanvas}>
        <Canvas
          onCreated={(state) => {
            setCamera(state.camera);
          }}
          ref={canvasRef}
        >
          <ControlsProvider>
            <ambientLight intensity={Math.PI / 2} />
            <mesh ref={groundRef} rotation-x={-Math.PI / 2} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshBasicMaterial />
            </mesh>
            {elements.map(({ component, props }, idx) => {
              const Component = component;
              return <Component key={idx} {...props} />;
            })}
          </ControlsProvider>
          <Stats className="position-right" />
        </Canvas>
      </div>
    </div>
  );
}

export default App;

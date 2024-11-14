import { Canvas } from "@react-three/fiber";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { WebGLRenderer } from "three";

export const PreviewRenderer = ({ children }: PropsWithChildren) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderedImg, setRenderedImg] = useState<string | null>(null);

  // prevent Canvas from rerendering on each reference change
  const initGl = useCallback((canvas: HTMLCanvasElement | OffscreenCanvas) => {
    const renderer = new WebGLRenderer({
      canvas: canvas as HTMLCanvasElement,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    return renderer;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const img = canvas.toDataURL("img/png");
      setRenderedImg(img);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (renderedImg) {
    console.log("renderedImg", renderedImg);
    return <img src={renderedImg} alt="rendered preview" />;
  }

  return (
    <Canvas gl={initGl} ref={canvasRef}>
      <ambientLight intensity={Math.PI / 2} />
      {children}
    </Canvas>
  );
};

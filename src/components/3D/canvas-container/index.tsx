import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

interface CanvasContainerProps {
  autoRotate?: boolean
  camera?: number
  children: JSX.Element
}

export const CanvasContainer = ({
  children,
  camera = 50,
  autoRotate = true
}: CanvasContainerProps) => {
  const ref = useRef()
  return (
    <Canvas resize={{ scroll: false }} shadows dpr={[1, 2]} camera={{ fov: camera }}>
      <OrbitControls
        enableZoom={false}
        ref={ref}
        autoRotate={autoRotate}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={1}
      />
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <Environment path="/" files="potsdamer_platz_1k.hdr" />
        <spotLight intensity={1} position={[5, 20, 20]} />
        {children}
      </Suspense>
    </Canvas>
  )
}

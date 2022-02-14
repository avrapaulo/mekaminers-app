import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { ErrorBoundary } from 'react-error-boundary'

interface CanvasContainerProps {
  autoRotate?: boolean
  camera?: any
  children: JSX.Element
}

const ErrorFallback = () => {
  return (
    <div className="text-center text-white">
      <p>Something went wrong</p>
    </div>
  )
}

export const CanvasContainer = ({ children, camera, autoRotate = true }: CanvasContainerProps) => {
  const ref = useRef()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Canvas resize={{ scroll: false }} shadows dpr={[1, 2]} camera={{ ...camera }}>
        <OrbitControls
          enableZoom={false}
          ref={ref}
          autoRotate={autoRotate}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={1}
        />
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <Environment preset="city" />
          <spotLight intensity={1} position={[5, 20, 20]} />
          {children}
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  )
}

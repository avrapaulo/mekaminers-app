import { Suspense, useRef, Component, ErrorInfo, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

interface CanvasContainerProps {
  autoRotate?: boolean
  camera?: any
  children: JSX.Element
}

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <h1 className="text-white text-center">Sorry.. there was an error</h1>
    }

    return this.props.children
  }
}

export const CanvasContainer = ({ children, camera, autoRotate = true }: CanvasContainerProps) => {
  const ref = useRef()

  return (
    <ErrorBoundary>
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

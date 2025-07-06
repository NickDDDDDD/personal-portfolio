import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { useState, useRef } from "react";
const ToolBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="aspect-[4/3] h-[80vh] bg-red-500">
      <Canvas shadows camera={{ position: [1.5, 1.5, 1.5], fov: 60 }}>
        <hemisphereLight
          skyColor={"#ffffff"}
          groundColor={"#444444"}
          intensity={1}
        />
        <CameraLight />

        <ToolboxModel isOpen={isOpen} toggleOpen={toggleOpen} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};
const ToolboxModel = ({ isOpen, toggleOpen }) => {
  const lidGroupRef = useRef();
  const boxRef = useRef();

  // 参数
  const baseHeight = 0.4;
  const lidHeight = 0.2;
  const boxWidth = 2;
  const boxDepth = 1;

  const cornerRadius = 0.01;
  const smoothness = 10;

  const lockWidth = 0.2;
  const lockHalfHeight = 0.1;
  const lockDepth = 0.03;
  const lockCornerRadius = 0.01; // 新增：锁的圆角
  const lockSmoothness = 8;

  const baseY = 0;
  const lidY = (baseHeight + lidHeight) / 2;

  // 动画
  useFrame(() => {
    if (lidGroupRef.current) {
      const target = isOpen ? -Math.PI / 2 : 0;
      lidGroupRef.current.rotation.x +=
        (target - lidGroupRef.current.rotation.x) * 0.1;
    }

    if (boxRef.current) {
      const targetY = isOpen ? -0.55 : 0;
      boxRef.current.position.y += (targetY - boxRef.current.position.y) * 0.1;
    }
  });

  return (
    <group ref={boxRef}>
      {/* 底座组 ➜ 包含底座和锁下半 */}
      <group position={[0, baseY, 0]}>
        {/* 底座本体 */}
        <RoundedBox
          args={[boxWidth, baseHeight, boxDepth]}
          radius={cornerRadius}
          smoothness={smoothness}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#9CA3AF"
            metalness={0.6}
            roughness={0.3}
          />
        </RoundedBox>

        {/* 锁下半部分 */}
        <RoundedBox
          args={[lockWidth, lockHalfHeight, lockDepth]}
          radius={lockCornerRadius}
          smoothness={lockSmoothness}
          position={[
            0,
            baseHeight / 2 - lockHalfHeight / 2,
            boxDepth / 2 + lockDepth / 2,
          ]}
          onClick={(e) => {
            e.stopPropagation();
            toggleOpen();
          }}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#6B7280"
            metalness={0.5}
            roughness={0.4}
          />
        </RoundedBox>
      </group>

      {/* 盖子组 ➜ 可旋转，包括盖子和锁上半 */}
      <group
        ref={lidGroupRef}
        position={[0, lidY - lidHeight / 2, -boxDepth / 2]}
      >
        {/* 这个内部 pivotShiftGroup 用来把下沿对齐到 lidGroupRef 的原点 */}
        <group position={[0, lidHeight / 2, 0]}>
          {/* 盖子本体 */}
          <RoundedBox
            args={[boxWidth, lidHeight, boxDepth]}
            radius={cornerRadius}
            smoothness={smoothness}
            position={[0, 0, boxDepth / 2]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#9CA3AF"
              metalness={0.6}
              roughness={0.3}
            />
          </RoundedBox>

          {/* 锁上半部分 */}
          <RoundedBox
            args={[lockWidth, lockHalfHeight, lockDepth]}
            radius={lockCornerRadius}
            smoothness={lockSmoothness}
            position={[
              0,
              -lidHeight / 2 + lockHalfHeight / 2,
              boxDepth + lockDepth / 2,
            ]}
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color="#6B7280"
              metalness={0.5}
              roughness={0.4}
            />
          </RoundedBox>
        </group>
      </group>
    </group>
  );
};

const CameraLight = () => {
  const lightRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={2}
      color={"#ffffff"}
      castShadow
    />
  );
};

export default ToolBox;

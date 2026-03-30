import * as THREE from "three";

const VOID_COLOR = new THREE.Color("#03050f");
const ELECTRIC_BLUE = new THREE.Color("#1af0ff");
const DEEP_VIOLET = new THREE.Color("#7b2fff");
const GHOST_WHITE = new THREE.Color("#e0eaff");

export function initSpaceScene(container, reducedMotion = false) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, reducedMotion ? 1.3 : 1.8));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = "space-canvas";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(VOID_COLOR, 0.0095);

  const camera = new THREE.PerspectiveCamera(
    48,
    container.clientWidth / container.clientHeight,
    0.1,
    420,
  );
  camera.position.set(0, 0, 44);

  const atlas = createAtlas({
    backgroundCount: reducedMotion ? 1500 : 2800,
    nodeCount: reducedMotion ? 380 : 640,
  });
  scene.add(atlas.root);

  const singularity = createSingularity();
  scene.add(singularity.group);

  const signalStreams = createSignalStreams(atlas.nodes, reducedMotion ? 3 : 5);
  scene.add(signalStreams.group);

  scene.add(new THREE.AmbientLight(0x304060, 0.45));

  const pointer = new THREE.Vector2(0, 0);
  let scrollProgress = 0;
  let frameId = 0;

  function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
  }

  function onResize() {
    const { clientWidth, clientHeight } = container;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, reducedMotion ? 1.3 : 1.8));
    renderer.setSize(clientWidth, clientHeight);
    updateSingularityLayout(clientWidth);
  }

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("resize", onResize);

  updateSingularityLayout(container.clientWidth);

  const clock = new THREE.Clock();

  function animate() {
    const elapsed = clock.getElapsedTime();
    const depthProgress = THREE.MathUtils.smoothstep(scrollProgress, 0, 1);

    updateAtlas(atlas, elapsed, pointer, depthProgress, reducedMotion);
    updateSignalStreams(signalStreams, atlas.nodes, elapsed);

    singularity.group.position.x += (
      (singularity.anchor.x + pointer.x * (singularity.isCompact ? 1.25 : 2.35))
      - singularity.group.position.x
    ) * 0.045;
    singularity.group.position.y += (
      (singularity.anchor.y + pointer.y * (singularity.isCompact ? 0.8 : 1.35))
      - singularity.group.position.y
    ) * 0.045;
    singularity.group.position.z = singularity.anchor.z;

    singularity.group.rotation.y += reducedMotion ? 0.0008 : 0.0012;
    singularity.ring.rotation.z += reducedMotion ? 0.0025 : 0.004;
    singularity.ring.material.uniforms.uTime.value = elapsed;
    singularity.lensing.material.uniforms.uTime.value = elapsed;
    singularity.lensing.lookAt(camera.position);
    singularity.core.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.022);
    singularity.glowCore.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.18);
    singularity.innerShell.scale.setScalar(1 + Math.sin(elapsed * 0.75) * 0.04);
    singularity.innerShell.rotation.y += reducedMotion ? 0.0018 : 0.0028;
    singularity.innerShell.rotation.x += reducedMotion ? 0.0007 : 0.0012;
    singularity.outerShell.scale.setScalar(1 + Math.sin(elapsed * 0.75) * 0.04);
    singularity.outerShell.rotation.y -= reducedMotion ? 0.0012 : 0.002;
    singularity.outerShell.rotation.z += reducedMotion ? 0.001 : 0.0015;
    singularity.orbitPrimary.rotation.z += reducedMotion ? 0.0027 : 0.004;
    singularity.orbitSecondary.rotation.z -= reducedMotion ? 0.002 : 0.003;
    singularity.orbitTertiary.rotation.z += reducedMotion ? 0.0012 : 0.0018;

    camera.position.z = THREE.MathUtils.lerp(44, 26, depthProgress);
    camera.position.x += ((pointer.x * 2.4) - camera.position.x) * 0.035;
    camera.position.y += ((pointer.y * 1.6) - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  }

  animate();

  return {
    setScrollProgress(nextProgress) {
      scrollProgress = THREE.MathUtils.clamp(nextProgress, 0, 1);
    },
    destroy() {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      disposeAtlas(atlas);
      disposeSignalStreams(signalStreams);
      disposeSingularity(singularity);
      renderer.dispose();
      container.replaceChildren();
    },
  };

  function updateSingularityLayout(width) {
    const compact = width < 900;
    singularity.isCompact = compact;
    singularity.anchor.set(compact ? 0.6 : 10.6, compact ? -2.8 : 1.7, compact ? -2.6 : -3.6);
    singularity.group.position.copy(singularity.anchor);
    singularity.group.scale.setScalar(compact ? 0.78 : 1);
  }
}

function createAtlas({ backgroundCount, nodeCount }) {
  const root = new THREE.Group();

  const backgroundLayers = [
    createBackgroundLayer(backgroundCount * 0.46, 88, 0.32),
    createBackgroundLayer(backgroundCount * 0.32, 62, 0.68),
    createBackgroundLayer(backgroundCount * 0.22, 38, 1),
  ];

  backgroundLayers.forEach((layer) => root.add(layer.points));

  const constellation = createConstellations(nodeCount);
  root.add(constellation.lines);
  root.add(constellation.points);

  return {
    root,
    nodes: constellation.nodes,
    nodeMeta: constellation.meta,
    connections: constellation.connections,
    nodeGeometry: constellation.geometry,
    backgroundLayers,
    lineGeometry: constellation.lineGeometry,
    lineMaterial: constellation.lineMaterial,
    pointMaterial: constellation.pointMaterial,
  };
}

function createBackgroundLayer(count, radius, depthMultiplier) {
  const total = Math.floor(count);
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const base = new Float32Array(total * 3);

  for (let i = 0; i < total; i += 1) {
    const position = randomPointInShell(radius * 0.45, radius, depthMultiplier);
    const index = i * 3;
    const shade = Math.random();
    const color = shade > 0.88
      ? ELECTRIC_BLUE.clone().lerp(GHOST_WHITE, 0.35)
      : shade > 0.74
        ? DEEP_VIOLET.clone().lerp(GHOST_WHITE, 0.25)
        : GHOST_WHITE.clone().lerp(ELECTRIC_BLUE, 0.1 + Math.random() * 0.12);

    positions[index] = position.x;
    positions[index + 1] = position.y;
    positions[index + 2] = position.z;
    base[index] = position.x;
    base[index + 1] = position.y;
    base[index + 2] = position.z;
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.42 * depthMultiplier,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const points = new THREE.Points(geometry, material);

  return {
    points,
    geometry,
    material,
    positions,
    base,
    depthMultiplier,
  };
}

function createConstellations(nodeCount) {
  const nodes = [];
  const meta = [];
  const connections = [];
  const positions = [];
  const colors = [];
  const linePositions = [];
  const lineColors = [];
  const clusterCount = Math.max(18, Math.floor(nodeCount / 18));
  let createdNodes = 0;

  for (let clusterIndex = 0; clusterIndex < clusterCount; clusterIndex += 1) {
    const clusterCenter = randomPointInShell(18, 70, 1.2);
    const clusterNodes = Math.min(
      20,
      Math.max(8, Math.floor(nodeCount / clusterCount + Math.random() * 4)),
    );

    const localNodes = [];

    for (
      let localIndex = 0;
      localIndex < clusterNodes && createdNodes < nodeCount;
      localIndex += 1
    ) {
      const radius = 1.6 + Math.random() * 7.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const node = new THREE.Vector3(
        clusterCenter.x + Math.sin(phi) * Math.cos(theta) * radius,
        clusterCenter.y + Math.sin(phi) * Math.sin(theta) * radius,
        clusterCenter.z + Math.cos(phi) * radius * 0.8,
      );

      nodes.push(node);
      localNodes.push({
        point: node,
        index: nodes.length - 1,
      });
      meta.push({
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.18 + Math.random() * 0.32,
      });

      const nodeColor = Math.random() > 0.78
        ? DEEP_VIOLET.clone().lerp(GHOST_WHITE, 0.18)
        : ELECTRIC_BLUE.clone().lerp(GHOST_WHITE, Math.random() * 0.35);

      positions.push(node.x, node.y, node.z);
      colors.push(nodeColor.r, nodeColor.g, nodeColor.b);
      createdNodes += 1;
    }

    for (let i = 1; i < localNodes.length; i += 1) {
      const previous = localNodes[i - 1];
      const current = localNodes[i];
      pushLineSegment(linePositions, lineColors, previous.point, current.point);
      connections.push([previous.index, current.index]);

      if (i > 1 && Math.random() > 0.58) {
        const alternate = localNodes[Math.max(0, i - 2)];
        pushLineSegment(linePositions, lineColors, alternate.point, current.point);
        connections.push([alternate.index, current.index]);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const pointMaterial = new THREE.PointsMaterial({
    size: 0.72,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const points = new THREE.Points(geometry, pointMaterial);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

  return {
    nodes,
    meta,
    connections,
    geometry,
    pointMaterial,
    points,
    lineGeometry,
    lineMaterial,
    lines,
  };
}

function createSingularity() {
  const group = new THREE.Group();
  const anchor = new THREE.Vector3(10.6, 1.7, -3.6);
  group.position.copy(anchor);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(5.8, 48, 48),
    new THREE.MeshPhysicalMaterial({
      color: 0x02020a,
      roughness: 1,
      metalness: 0,
      transmission: 0,
      clearcoat: 0,
    }),
  );
  group.add(core);

  const glowCore = new THREE.Mesh(
    new THREE.SphereGeometry(1.45, 18, 18),
    new THREE.MeshBasicMaterial({
      color: 0x1af0ff,
      transparent: true,
      opacity: 0.08,
    }),
  );
  group.add(glowCore);

  const innerShell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7.4, 1),
    new THREE.MeshBasicMaterial({
      color: 0x1af0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    }),
  );
  group.add(innerShell);

  const outerShell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(11.8, 1),
    new THREE.MeshBasicMaterial({
      color: 0x7b2fff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    }),
  );
  group.add(outerShell);

  const ringMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: ELECTRIC_BLUE },
      uColorB: { value: DEEP_VIOLET },
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 displaced = position + normal * sin((uv.x * 30.0) + (uTime * 2.4)) * 0.18;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;

      void main() {
        float sweep = sin((vUv.x * 42.0) - (uTime * 4.2));
        float pulse = 0.55 + 0.45 * sin((uTime * 2.6) + (vUv.y * 6.2831));
        float edge = smoothstep(0.0, 0.3, vUv.y) * (1.0 - smoothstep(0.7, 1.0, vUv.y));
        vec3 color = mix(uColorA, uColorB, 0.5 + 0.5 * sweep);
        float alpha = (0.12 + pulse * 0.28 + max(sweep, 0.0) * 0.18) * edge;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

  const ring = new THREE.Mesh(new THREE.TorusGeometry(8.8, 1.1, 30, 160), ringMaterial);
  ring.rotation.x = Math.PI / 2.8;
  ring.rotation.y = Math.PI / 6;
  group.add(ring);

  const orbitPrimary = new THREE.Mesh(
    new THREE.TorusGeometry(10.8, 0.28, 3, 96),
    new THREE.MeshBasicMaterial({
      color: 0x1af0ff,
      transparent: true,
      opacity: 0.19,
    }),
  );
  orbitPrimary.rotation.x = Math.PI / 2.4;
  group.add(orbitPrimary);

  const orbitSecondary = new THREE.Mesh(
    new THREE.TorusGeometry(13, 0.18, 3, 96),
    new THREE.MeshBasicMaterial({
      color: 0x7b2fff,
      transparent: true,
      opacity: 0.1,
    }),
  );
  orbitSecondary.rotation.x = Math.PI / 2.4;
  orbitSecondary.rotation.z = 0.45;
  group.add(orbitSecondary);

  const orbitTertiary = new THREE.Mesh(
    new THREE.TorusGeometry(15.2, 0.14, 3, 96),
    new THREE.MeshBasicMaterial({
      color: 0x1af0ff,
      transparent: true,
      opacity: 0.05,
    }),
  );
  orbitTertiary.rotation.x = Math.PI / 3;
  orbitTertiary.rotation.z = 0.9;
  group.add(orbitTertiary);

  const lensingMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: ELECTRIC_BLUE.clone().lerp(GHOST_WHITE, 0.22) },
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;

      void main() {
        vec2 centered = (vUv - 0.5) * 2.0;
        float radius = length(centered);
        float ring = smoothstep(0.88, 0.22, abs(radius - 0.62));
        float shimmer = 0.55 + 0.45 * sin((radius * 24.0) - (uTime * 2.2));
        float alpha = ring * shimmer * 0.07;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });

  const lensing = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), lensingMaterial);
  group.add(lensing);

  return {
    group,
    anchor,
    isCompact: false,
    core,
    glowCore,
    innerShell,
    outerShell,
    ring,
    orbitPrimary,
    orbitSecondary,
    orbitTertiary,
    lensing,
  };
}

function createSignalStreams(nodes, count) {
  const group = new THREE.Group();
  const streams = [];

  for (let i = 0; i < count; i += 1) {
    const stream = buildStream(nodes);
    group.add(stream.line);
    streams.push(stream);
  }

  return {
    group,
    streams,
  };
}

function buildStream(nodes) {
  const start = nodes[Math.floor(Math.random() * nodes.length)];
  const end = nodes[Math.floor(Math.random() * nodes.length)];
  const control = start
    .clone()
    .lerp(end, 0.5)
    .add(
      new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(8),
        THREE.MathUtils.randFloatSpread(8),
        THREE.MathUtils.randFloatSpread(8),
      ),
    );

  const curve = new THREE.CatmullRomCurve3([start, control, end]);
  const points = curve.getPoints(36);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  geometry.setDrawRange(0, 0);

  const material = new THREE.LineBasicMaterial({
    color: Math.random() > 0.5 ? ELECTRIC_BLUE : DEEP_VIOLET,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
  });

  return {
    line: new THREE.Line(geometry, material),
    geometry,
    material,
    life: Math.random(),
    speed: 0.35 + Math.random() * 0.35,
  };
}

function updateAtlas(atlas, elapsed, pointer, scrollProgress, reducedMotion) {
  atlas.root.rotation.y = THREE.MathUtils.lerp(
    atlas.root.rotation.y,
    pointer.x * 0.28,
    0.035,
  );
  atlas.root.rotation.x = THREE.MathUtils.lerp(
    atlas.root.rotation.x,
    pointer.y * 0.18,
    0.035,
  );
  atlas.root.position.z = THREE.MathUtils.lerp(-3, -16, scrollProgress);

  atlas.backgroundLayers.forEach((layer, index) => {
    const positions = layer.geometry.attributes.position.array;
    const rotationFactor = 0.0006 + index * 0.00035;
    layer.points.rotation.z += rotationFactor;
    layer.points.rotation.y -= rotationFactor * 0.8;
    layer.points.position.x = pointer.x * (index + 1) * 0.9;
    layer.points.position.y = pointer.y * (index + 1) * 0.6;

    for (let i = 0; i < positions.length; i += 3) {
      const baseX = layer.base[i];
      const baseY = layer.base[i + 1];
      const baseZ = layer.base[i + 2];
      const radius = Math.hypot(baseX, baseY, baseZ);
      const lensInfluence = Math.max(0, 1 - radius / 26);
      const swirl = (elapsed * 0.25) + radius * 0.04;
      const angle = swirl * lensInfluence * (reducedMotion ? 0.4 : 1);

      positions[i] = baseX + Math.cos(angle) * lensInfluence * 1.8;
      positions[i + 1] = baseY + Math.sin(angle) * lensInfluence * 1.8;
      positions[i + 2] = baseZ - lensInfluence * 1.6;
    }

    layer.geometry.attributes.position.needsUpdate = true;
  });

  const nodePositions = atlas.nodeGeometry.attributes.position.array;
  const linePositions = atlas.lineGeometry.attributes.position.array;

  atlas.nodes.forEach((node, index) => {
    const meta = atlas.nodeMeta[index];
    const drift = Math.sin(elapsed * 0.8 + meta.phase) * meta.amplitude;
    nodePositions[index * 3] = node.x + drift;
    nodePositions[index * 3 + 1] = node.y + Math.cos(elapsed * 0.7 + meta.phase) * meta.amplitude;
    nodePositions[index * 3 + 2] = node.z + Math.sin(elapsed * 0.5 + meta.phase) * meta.amplitude;
  });

  atlas.nodeGeometry.attributes.position.needsUpdate = true;
  atlas.connections.forEach(([startIndex, endIndex], connectionIndex) => {
    const lineOffset = connectionIndex * 6;
    const startOffset = startIndex * 3;
    const endOffset = endIndex * 3;

    linePositions[lineOffset] = nodePositions[startOffset];
    linePositions[lineOffset + 1] = nodePositions[startOffset + 1];
    linePositions[lineOffset + 2] = nodePositions[startOffset + 2];
    linePositions[lineOffset + 3] = nodePositions[endOffset];
    linePositions[lineOffset + 4] = nodePositions[endOffset + 1];
    linePositions[lineOffset + 5] = nodePositions[endOffset + 2];
  });
  atlas.lineGeometry.attributes.position.needsUpdate = true;
  atlas.lineMaterial.opacity = reducedMotion ? 0.1 : 0.16 + scrollProgress * 0.05;
}

function updateSignalStreams(signalStreams, nodes, elapsed) {
  signalStreams.streams.forEach((stream) => {
    stream.life += stream.speed * 0.01;
    const pulse = stream.life % 1;
    const drawCount = Math.max(2, Math.floor(stream.geometry.attributes.position.count * pulse));

    stream.geometry.setDrawRange(0, drawCount);
    stream.material.opacity = pulse < 0.85
      ? Math.sin(pulse * Math.PI) * 0.55
      : (1 - pulse) * 3.3;

    if (pulse > 0.995) {
      const replacement = buildStream(nodes);
      stream.line.geometry.dispose();
      stream.line.material.dispose();
      stream.line.geometry = replacement.geometry;
      stream.line.material = replacement.material;
      stream.geometry = replacement.geometry;
      stream.material = replacement.material;
      stream.life = Math.random() * 0.12;
      stream.speed = replacement.speed;
    }

    stream.line.rotation.z = Math.sin(elapsed * 0.1) * 0.04;
  });
}

function disposeAtlas(atlas) {
  atlas.backgroundLayers.forEach((layer) => {
    layer.geometry.dispose();
    layer.material.dispose();
  });
  atlas.nodeGeometry.dispose();
  atlas.lineGeometry.dispose();
  atlas.pointMaterial.dispose();
  atlas.lineMaterial.dispose();
}

function disposeSingularity(singularity) {
  singularity.core.geometry.dispose();
  singularity.core.material.dispose();
  singularity.glowCore.geometry.dispose();
  singularity.glowCore.material.dispose();
  singularity.innerShell.geometry.dispose();
  singularity.innerShell.material.dispose();
  singularity.outerShell.geometry.dispose();
  singularity.outerShell.material.dispose();
  singularity.ring.geometry.dispose();
  singularity.ring.material.dispose();
  singularity.orbitPrimary.geometry.dispose();
  singularity.orbitPrimary.material.dispose();
  singularity.orbitSecondary.geometry.dispose();
  singularity.orbitSecondary.material.dispose();
  singularity.orbitTertiary.geometry.dispose();
  singularity.orbitTertiary.material.dispose();
  singularity.lensing.geometry.dispose();
  singularity.lensing.material.dispose();
}

function disposeSignalStreams(signalStreams) {
  signalStreams.streams.forEach((stream) => {
    stream.line.geometry.dispose();
    stream.line.material.dispose();
  });
}

function pushLineSegment(positions, colors, start, end) {
  positions.push(start.x, start.y, start.z, end.x, end.y, end.z);

  const startColor = ELECTRIC_BLUE.clone().lerp(GHOST_WHITE, 0.28);
  const endColor = DEEP_VIOLET.clone().lerp(GHOST_WHITE, 0.25);
  colors.push(
    startColor.r,
    startColor.g,
    startColor.b,
    endColor.r,
    endColor.g,
    endColor.b,
  );
}

function randomPointInShell(innerRadius, outerRadius, depthMultiplier) {
  const radius = THREE.MathUtils.randFloat(innerRadius, outerRadius);
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi) * depthMultiplier,
  );
}

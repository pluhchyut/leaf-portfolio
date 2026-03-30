(function(){
  const body=document.body;
  initCursor();
  initClock();
  initCoords();
  initDropdowns();
  initReveal();
  initBackground();

  function initCursor(){
    if(window.matchMedia("(pointer: coarse)").matches) return;

    const cur=document.getElementById("cur");
    const ring=document.getElementById("cur-r");
    if(!cur||!ring) return;

    let mx=window.innerWidth/2;
    let my=window.innerHeight/2;
    let cx=mx;
    let cy=my;

    document.addEventListener("mousemove",(event)=>{
      mx=event.clientX;
      my=event.clientY;
      cur.style.left=`${mx}px`;
      cur.style.top=`${my}px`;

      if(!body.classList.contains("cursor-ready")){
        cx=mx;
        cy=my;
        ring.style.left=`${cx}px`;
        ring.style.top=`${cy}px`;
        body.classList.add("cursor-ready");
      }
    });

    document.addEventListener("mousedown",()=>body.classList.add("clicking"));
    document.addEventListener("mouseup",()=>body.classList.remove("clicking"));
    document.addEventListener("mouseleave",()=>body.classList.remove("clicking"));

    document.addEventListener("mouseover",(event)=>{
      body.classList.toggle(
        "hov",
        Boolean(event.target.closest("a,button,.panel,.route-card,.topic-card,.post-card,.capability-card,.stat-card,.article-sidebar,.placeholder-block,.nav-dropdown__trigger,.signal-panel,.archive-panel,.metric,.card,.hero-note,.lab,.footer-note,.topbar,.challenge-meta,.badge")),
      );
    });

    (function animate(){
      cx+=(mx-cx)*0.11;
      cy+=(my-cy)*0.11;
      ring.style.left=`${cx}px`;
      ring.style.top=`${cy}px`;
      requestAnimationFrame(animate);
    }());
  }

  function initClock(){
    const clock=document.getElementById("clock");
    if(!clock) return;

    const tick=()=>{
      const now=new Date();
      const h=String(now.getUTCHours()).padStart(2,"0");
      const m=String(now.getUTCMinutes()).padStart(2,"0");
      const s=String(now.getUTCSeconds()).padStart(2,"0");
      clock.textContent=`${h}:${m}:${s} UTC`;
    };

    tick();
    window.setInterval(tick,1000);
  }

  function initCoords(){
    const lat=document.getElementById("lat");
    const lon=document.getElementById("lon");
    if(lat) lat.textContent=`LAT ${body.dataset.lat||"40.7128° N"}`;
    if(lon) lon.textContent=`LON ${body.dataset.lon||"74.0060° W"}`;
  }

  function initDropdowns(){
    document.querySelectorAll(".nav-dropdown").forEach((dropdown)=>{
      const trigger=dropdown.querySelector(".nav-dropdown__trigger");
      if(!trigger) return;

      trigger.addEventListener("click",(event)=>{
        event.stopPropagation();
        const open=dropdown.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded",String(open));
      });
    });

    document.addEventListener("click",()=>{
      document.querySelectorAll(".nav-dropdown").forEach((dropdown)=>{
        dropdown.classList.remove("is-open");
        const trigger=dropdown.querySelector(".nav-dropdown__trigger");
        if(trigger) trigger.setAttribute("aria-expanded","false");
      });
    });

    document.addEventListener("keydown",(event)=>{
      if(event.key!=="Escape") return;
      document.querySelectorAll(".nav-dropdown").forEach((dropdown)=>{
        dropdown.classList.remove("is-open");
      });
    });
  }

  function initReveal(){
    const items=[...document.querySelectorAll(".reveal")];
    if(!items.length) return;

    const observer=new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add("vis");
        observer.unobserve(entry.target);
      });
    },{threshold:0.16});

    items.forEach((item)=>observer.observe(item));
  }

  function initBackground(){
    if(!window.THREE) return;
    const canvas=document.getElementById("c");
    if(!canvas) return;

    const THREE=window.THREE;
    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(0x000000,0);

    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,3000);
    camera.position.z=540;

    let tgX=0;
    let tgY=0;
    let cX=0;
    let cY=0;
    let scrollZ=0;

    document.addEventListener("mousemove",(event)=>{
      tgX=(event.clientX/window.innerWidth-.5)*34;
      tgY=-((event.clientY/window.innerHeight-.5)*26);
    });
    window.addEventListener("scroll",()=>{scrollZ=window.scrollY*0.08;},{passive:true});

    const dustGeometry=new THREE.BufferGeometry();
    const dustArray=new Float32Array(2400*3);
    for(let i=0;i<2400;i++){
      dustArray[i*3]=(Math.random()-.5)*2300;
      dustArray[i*3+1]=(Math.random()-.5)*1800;
      dustArray[i*3+2]=(Math.random()-.5)*900-120;
    }
    dustGeometry.setAttribute("position",new THREE.BufferAttribute(dustArray,3));
    const dustMaterial=new THREE.PointsMaterial({
      color:0xb8ac8a,
      size:1.05,
      sizeAttenuation:true,
      transparent:true,
      opacity:.32,
    });
    const dustCloud=new THREE.Points(dustGeometry,dustMaterial);
    scene.add(dustCloud);

    const pollenGeometry=new THREE.BufferGeometry();
    const pollenArray=new Float32Array(560*3);
    const pollenMeta=[];
    for(let i=0;i<560;i++){
      const x=(Math.random()-.5)*1400;
      const y=(Math.random()-.5)*1200;
      const z=(Math.random()-.5)*420;
      pollenArray[i*3]=x;
      pollenArray[i*3+1]=y;
      pollenArray[i*3+2]=z;
      pollenMeta.push({
        x,
        y,
        z,
        phase:Math.random()*Math.PI*2,
        sway:.003+Math.random()*.0035,
      });
    }
    pollenGeometry.setAttribute("position",new THREE.BufferAttribute(pollenArray,3));
    const pollenMaterial=new THREE.PointsMaterial({
      color:0x7aa36a,
      size:1.8,
      sizeAttenuation:true,
      transparent:true,
      opacity:.3,
    });
    const pollenCloud=new THREE.Points(pollenGeometry,pollenMaterial);
    scene.add(pollenCloud);

    const center=new THREE.Vector3(160,10,-30);
    const wreath=new THREE.Group();
    scene.add(wreath);

    const leafShape=new THREE.Shape();
    leafShape.moveTo(0,32);
    leafShape.bezierCurveTo(13,18,16,-14,0,-32);
    leafShape.bezierCurveTo(-16,-14,-13,18,0,32);
    const leafGeometry=new THREE.ShapeGeometry(leafShape,20);
    const veinGeometry=new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0,-28,0),
      new THREE.Vector3(0,26,0),
    ]);
    const leafPalette=[0x7aa36a,0x92b37f,0x9db886,0xc7b282,0x8ea070];
    const leafEntities=[];

    for(let i=0;i<18;i++){
      const group=new THREE.Group();
      const color=leafPalette[i%leafPalette.length];
      const leaf=new THREE.Mesh(
        leafGeometry,
        new THREE.MeshBasicMaterial({
          color,
          transparent:true,
          opacity:0.16+Math.random()*.08,
          side:THREE.DoubleSide,
          depthWrite:false,
        }),
      );
      leaf.scale.set(0.82+Math.random()*.38,1.2+Math.random()*.8,1);

      const vein=new THREE.Line(
        veinGeometry,
        new THREE.LineBasicMaterial({
          color:0x8f7d5c,
          transparent:true,
          opacity:.24,
        }),
      );

      group.add(leaf);
      group.add(vein);

      const radius=36+Math.random()*150;
      const angle=Math.random()*Math.PI*2;
      const lift=(Math.random()-.5)*130;
      const depth=(Math.random()-.5)*120;
      group.position.set(
        center.x+Math.cos(angle)*radius,
        center.y+lift,
        center.z+depth,
      );
      group.rotation.set(
        (Math.random()-.5)*0.65,
        (Math.random()-.5)*0.55,
        Math.random()*Math.PI*2,
      );
      const scale=0.7+Math.random()*1.05;
      group.scale.setScalar(scale);
      wreath.add(group);

      leafEntities.push({
        group,
        baseX:group.position.x,
        baseY:group.position.y,
        baseZ:group.position.z,
        baseRotX:group.rotation.x,
        baseRotY:group.rotation.y,
        baseRotZ:group.rotation.z,
        phase:Math.random()*Math.PI*2,
        speed:.6+Math.random()*1.1,
        sway:4+Math.random()*6,
      });
    }

    const ribbonA=new THREE.Mesh(
      new THREE.TorusGeometry(86,1.1,6,100),
      new THREE.MeshBasicMaterial({color:0x8ea070,transparent:true,opacity:.14}),
    );
    ribbonA.position.copy(center);
    ribbonA.rotation.set(Math.PI/2.8,.18,.25);
    scene.add(ribbonA);

    const ribbonB=new THREE.Mesh(
      new THREE.TorusGeometry(112,.7,6,100),
      new THREE.MeshBasicMaterial({color:0xc7b282,transparent:true,opacity:.12}),
    );
    ribbonB.position.copy(center);
    ribbonB.rotation.set(Math.PI/2.3,-.34,.8);
    scene.add(ribbonB);

    const seedCore=new THREE.Mesh(
      new THREE.SphereGeometry(18,18,18),
      new THREE.MeshBasicMaterial({color:0xd9cdb3,transparent:true,opacity:.3}),
    );
    seedCore.position.copy(center);
    scene.add(seedCore);

    const seedHalo=new THREE.Mesh(
      new THREE.TorusGeometry(44,2.2,8,80),
      new THREE.MeshBasicMaterial({color:0x7aa36a,transparent:true,opacity:.1}),
    );
    seedHalo.position.copy(center);
    seedHalo.rotation.set(Math.PI/2.2,.24,.3);
    scene.add(seedHalo);

    const shards=[];
    const SHARD_LIFETIME_MIN=950;
    const SHARD_LIFETIME_MAX=2200;

    document.addEventListener("mousedown",(event)=>{
      spawnSparks(event.clientX,event.clientY);
      triggerExplosion();
    });

    function triggerExplosion(){
      const bornAt=performance.now();
      const burstCount=12+Math.floor(Math.random()*8);
      for(let i=0;i<burstCount;i++){
        const mesh=new THREE.Mesh(
          leafGeometry,
          new THREE.MeshBasicMaterial({
            color:leafPalette[Math.floor(Math.random()*leafPalette.length)],
            transparent:true,
            opacity:.75,
            side:THREE.DoubleSide,
            depthWrite:false,
          }),
        );
        mesh.position.copy(center);
        mesh.position.x+=(Math.random()-.5)*26;
        mesh.position.y+=(Math.random()-.5)*18;
        mesh.position.z+=(Math.random()-.5)*18;

        const vel=new THREE.Vector3(
          (Math.random()-.5)*1.8,
          (Math.random()-.5)*1.4,
          (Math.random()-.5)*1.1,
        );

        const baseScale=.06+Math.random()*.16;
        mesh.scale.set(baseScale*(0.8+Math.random()*0.5),baseScale*(1.2+Math.random()*0.7),baseScale);
        mesh.rotation.set(
          (Math.random()-.5)*0.6,
          (Math.random()-.5)*0.6,
          Math.random()*Math.PI*2,
        );
        scene.add(mesh);

        shards.push({
          mesh,
          vel,
          bornAt,
          baseScale,
          lifetime:SHARD_LIFETIME_MIN+Math.random()*(SHARD_LIFETIME_MAX-SHARD_LIFETIME_MIN),
          drag:.92+Math.random()*.05,
          opacityBoost:.7+Math.random()*.45,
          scaleBoost:.65+Math.random()*.8,
          spin:new THREE.Vector3((Math.random()-.5)*.28,(Math.random()-.5)*.28,(Math.random()-.5)*.28),
        });
      }
    }

    let t=0;
    function animate(){
      requestAnimationFrame(animate);
      t+=.005;
      const now=performance.now();

      cX+=(tgX-cX)*.04;
      cY+=(tgY-cY)*.04;
      camera.position.x=cX;
      camera.position.y=cY;
      camera.position.z=540-scrollZ;
      camera.lookAt(scene.position);

      dustCloud.rotation.y+=.00018;
      dustCloud.rotation.x=.06+Math.sin(t*.25)*.02;

      const pollenPositions=pollenGeometry.attributes.position.array;
      for(let i=0;i<pollenMeta.length;i++){
        const mote=pollenMeta[i];
        pollenPositions[i*3]=mote.x+Math.cos(t*120*mote.sway+mote.phase)*6;
        pollenPositions[i*3+1]=mote.y+Math.sin(t*140*mote.sway+mote.phase)*8;
        pollenPositions[i*3+2]=mote.z+Math.sin(t*90*mote.sway+mote.phase)*4;
      }
      pollenGeometry.attributes.position.needsUpdate=true;

      wreath.rotation.y+=.0011;
      wreath.rotation.z=Math.sin(t*.5)*.05;
      for(let i=0;i<leafEntities.length;i++){
        const leaf=leafEntities[i];
        leaf.group.position.x=leaf.baseX+Math.cos(t*leaf.speed+leaf.phase)*leaf.sway*.55;
        leaf.group.position.y=leaf.baseY+Math.sin(t*leaf.speed+leaf.phase)*leaf.sway;
        leaf.group.position.z=leaf.baseZ+Math.cos(t*leaf.speed*.6+leaf.phase)*leaf.sway*.38;
        leaf.group.rotation.x=leaf.baseRotX+Math.cos(t*leaf.speed+leaf.phase)*.06;
        leaf.group.rotation.y=leaf.baseRotY+Math.sin(t*leaf.speed*.7+leaf.phase)*.08;
        leaf.group.rotation.z=leaf.baseRotZ+Math.sin(t*leaf.speed+leaf.phase)*.18;
      }

      const breath=1+Math.sin(t*.8)*.035;
      seedCore.scale.setScalar(breath);
      seedHalo.rotation.z+=.0022;
      ribbonA.rotation.z+=.0016;
      ribbonB.rotation.z-=.0012;

      for(let i=shards.length-1;i>=0;i--){
        const shard=shards[i];
        const progress=Math.min(1,(now-shard.bornAt)/shard.lifetime);
        shard.mesh.position.addScaledVector(shard.vel,1);
        shard.mesh.rotation.x+=shard.spin.x;
        shard.mesh.rotation.y+=shard.spin.y;
        shard.mesh.rotation.z+=shard.spin.z;
        shard.vel.multiplyScalar(shard.drag);
        const glow=Math.pow(1-progress,1.35);
        shard.mesh.material.opacity=Math.max(0,glow*shard.opacityBoost);
        shard.mesh.scale.setScalar(shard.baseScale*(.45+glow*shard.scaleBoost));
        if(progress>=1){
          scene.remove(shard.mesh);
          shard.mesh.geometry.dispose();
          shard.mesh.material.dispose();
          shards.splice(i,1);
        }
      }

      dustMaterial.opacity=.24+Math.sin(t*.35)*.04;
      pollenMaterial.opacity=.22+Math.sin(t*.9)*.06;
      seedCore.material.opacity=.22+Math.sin(t*1.2)*.05;

      renderer.render(scene,camera);
    }

    animate();

    window.addEventListener("resize",()=>{
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
      camera.aspect=window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth,window.innerHeight);
    });

    window.addEventListener("beforeunload",()=>{
      renderer.dispose();
    });
  }

  function spawnSparks(x,y){
    const count=10;
    const colors=["#7aa36a","#b6976f","#efe4d2","#97b883"];
    for(let i=0;i<count;i++){
      const spark=document.createElement("div");
      spark.className="spark";
      const angle=(i/count)*Math.PI*2;
      const dist=28+Math.random()*40;
      spark.style.left=`${x}px`;
      spark.style.top=`${y}px`;
      spark.style.setProperty("--dx",`${Math.cos(angle)*dist}px`);
      spark.style.setProperty("--dy",`${Math.sin(angle)*dist}px`);
      spark.style.background=colors[Math.floor(Math.random()*colors.length)];
      spark.style.animationDuration=`${0.4+Math.random()*0.25}s`;
      document.body.appendChild(spark);
      spark.addEventListener("animationend",()=>spark.remove(),{once:true});
    }
  }
}());

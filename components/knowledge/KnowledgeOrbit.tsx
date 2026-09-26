"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const LABELS = ["AI","CODE","SCIENCE","CYBER","TECH","BUSINESS"];

export default function KnowledgeOrbit({ activeIndex = 0 }: { activeIndex?: number }) {
  const mount = useRef<HTMLDivElement>(null);
  const active = useRef(activeIndex);
  useEffect(() => { active.current = activeIndex; }, [activeIndex]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    // The cover screen must never depend on WebGL. If WebGL 2 is unavailable,
    // keep this scene optional instead of allowing a renderer error to break the page.
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.z = 8.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:"low-power" });
    } catch {
      return;
    }

    const mobile = window.matchMedia("(max-width: 680px)");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile.matches ? 1.15 : 1.3));
    renderer.setSize(host.clientWidth,host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const core = new THREE.Group();
    root.add(core);
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(.78,2),new THREE.MeshBasicMaterial({color:0x9ce2ff,wireframe:true,transparent:true,opacity:.72}));
    const inner = new THREE.Mesh(new THREE.SphereGeometry(.46,20,20),new THREE.MeshBasicMaterial({color:0x65caff,transparent:true,opacity:.09}));
    const halo = new THREE.Mesh(new THREE.SphereGeometry(1.1,20,20),new THREE.MeshBasicMaterial({color:0x55bfff,wireframe:true,transparent:true,opacity:.035}));
    core.add(wire,inner,halo);

    const rings: THREE.Mesh[] = [];
    [[1.55,.32,.23,.12],[2.12,-.72,.17,-.08],[2.72,1.02,.11,.055]].forEach(([radius,tilt,opacity,speed],i)=>{
      const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,i===0?.012:.008,8,128),new THREE.MeshBasicMaterial({color:i===1?0xa4a2ff:0x8bd7ff,transparent:true,opacity}));
      ring.rotation.x=tilt; ring.userData.speed=speed; root.add(ring); rings.push(ring);
    });

    const nodes: THREE.Mesh[]=[];
    const lines: THREE.Line[]=[];
    const materials: THREE.LineBasicMaterial[]=[];
    LABELS.forEach((_,i)=>{
      const a=i/LABELS.length*Math.PI*2;
      const node=new THREE.Mesh(new THREE.SphereGeometry(.09,12,12),new THREE.MeshBasicMaterial({color:0xa9e4ff,transparent:true,opacity:.75}));
      node.position.set(Math.cos(a)*2.18,Math.sin(a)*1.1,Math.sin(a*1.7)*.48);
      nodes.push(node); root.add(node);
      const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0),node.position.clone()]);
      const mat=new THREE.LineBasicMaterial({color:0x83d8ff,transparent:true,opacity:.06});
      const line=new THREE.Line(geo,mat);
      lines.push(line); materials.push(mat); root.add(line);
    });

    const pg=new THREE.BufferGeometry();
    const count=mobile.matches ? 150 : 260, pos=new Float32Array(count*3);
    for(let i=0;i<count;i++){const j=i*3,r=2.6+Math.random()*2.7,t=Math.random()*Math.PI*2,p=Math.acos(2*Math.random()-1);pos[j]=r*Math.sin(p)*Math.cos(t);pos[j+1]=r*Math.cos(p)*.72;pos[j+2]=r*Math.sin(p)*Math.sin(t);}
    pg.setAttribute("position",new THREE.BufferAttribute(pos,3));
    const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x9edfff,size:.022,transparent:true,opacity:.4}));
    scene.add(particles);

    const target=new THREE.Vector2();
    const move=(e:PointerEvent)=>{const r=host.getBoundingClientRect();target.set(((e.clientX-r.left)/r.width-.5)*.26,((e.clientY-r.top)/r.height-.5)*-.22);};
    host.addEventListener("pointermove",move,{passive:true});

    const ro=new ResizeObserver(()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);});
    ro.observe(host);

    const clock=new THREE.Clock(); let frame=0; let paused=false;
    const setPaused=(value:boolean)=>{paused=value;};
    const visibility=()=>setPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange",visibility);
    const io=new IntersectionObserver(([entry])=>setPaused(!entry.isIntersecting),{threshold:0.02});
    io.observe(host);
    const tick=()=>{
      const t=clock.getElapsedTime();
      root.rotation.y += (target.x+t*.012-root.rotation.y)*.025;
      root.rotation.x += (target.y+Math.sin(t*.2)*.03-root.rotation.x)*.025;
      root.position.y=Math.sin(t*.5)*.04;
      wire.rotation.x=t*.16; wire.rotation.z=t*.1;
      inner.scale.setScalar(1+Math.sin(t*1.8)*.05); halo.rotation.z=-t*.05;
      rings.forEach(r=>{r.rotation.y+=r.userData.speed*.012;});
      nodes.forEach((n,i)=>{const on=i===active.current,s=on?1.45+Math.sin(t*4)*.08:1;n.scale.lerp(new THREE.Vector3(s,s,s),.12);(n.material as THREE.MeshBasicMaterial).opacity+=((on?1:.55)-(n.material as THREE.MeshBasicMaterial).opacity)*.08;});
      materials.forEach((m,i)=>m.opacity+=((i===active.current ? .3 : .055)-m.opacity)*.08);
      particles.rotation.y=t*.006;
      renderer.render(scene,camera);
      frame=requestAnimationFrame(tick);
    };
    tick();

    return ()=>{
      cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange",visibility); host.removeEventListener("pointermove",move); renderer.dispose();
      [wire,inner,halo,...rings,...nodes].forEach((m)=>{m.geometry.dispose();(m.material as THREE.Material).dispose();});
      lines.forEach(l=>l.geometry.dispose()); materials.forEach(m=>m.dispose()); pg.dispose();(particles.material as THREE.Material).dispose();
      if(renderer.domElement.parentNode===host)host.removeChild(renderer.domElement);
    };
  },[]);

  return <div ref={mount} className="knowledge-orbit-3d" role="img" aria-label="3D constellation of Azka's interests" />;
}

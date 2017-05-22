// 环境粒子效果
var particleSystem ,particleCount,particles,pMaterial,particlesHeight;
function createParticle(){
    // 创建粒子geometry
    particleCount = 1800;
    particlesHeight = 150;
    particles = new THREE.Geometry();
    pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 5,
        map: THREE.ImageUtils.loadTexture(
          "../assets/textures/particles/snowflake2.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
      });
    // 依次创建单个粒子
    for(var p = 0; p < particleCount; p++) {
      // 粒子范围在-250到250之间
      var pX = Math.random() * 500 - 250,
          pY = Math.random() * 500 - 250,
          pZ = Math.random() * particlesHeight,
          particle = new THREE.Vector3(pX, pY, pZ);
      particle.velocityZ = Math.random() * 0.6;
      particle.velocityX = Math.random() * 0.6;
      particle.velocityY = Math.random() * 0.6;
      // 将粒子加入粒子geometry
      particles.vertices.push(particle);
    }
    // 创建粒子系统
    particleSystem =
      new THREE.ParticleSystem(
        particles,
        pMaterial);
    particleSystem.sortParticles = true;
    // 将粒子系统加入场景
    scene.add(particleSystem); 
}
// 环境粒子更新
function particleUpdate(){

  var pCount = particleCount;
  while(pCount--) {
    // 获取单个粒子
    var particle = particles.vertices[pCount];
    // 检查是否需要重置
    particle.z -= particle.velocityZ;
    if(particle.z < 0) {
      particle.z = particlesHeight;
    }
    // 用随机数更新水平速度分量，并根据速度更新位置
    particle.velocityY -= Math.random() * .1;
    // particle.position.addSelf(velocityY);
  }
}
function testShowParticle(){

}
function wastepaperParticle(){
  
}
const canvas = document.querySelector("#water");
const gl = canvas.getContext("webgl", {
  antialias: false,
  alpha: false,
  depth: false,
  stencil: false,
  preserveDrawingBuffer: false,
});

if (!gl) {
  document.body.insertAdjacentHTML("beforeend", "<p class=\"webgl-warning\">WebGL is needed for this water surface.</p>");
  throw new Error("WebGL unavailable");
}

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_ripples[20];
uniform int u_rippleCount;
uniform vec2 u_pointer;
uniform float u_pointerActive;
uniform float u_theme;

varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.52;
  mat2 rot = mat2(0.82, -0.57, 0.57, 0.82);

  for (int i = 0; i < 5; i++) {
    value += noise(p) * amp;
    p = rot * p * 2.04 + 17.7;
    amp *= 0.48;
  }

  return value;
}

float rippleHeight(vec2 uv) {
  float height = 0.0;

  for (int i = 0; i < 20; i++) {
    if (i >= u_rippleCount) {
      break;
    }

    vec4 ripple = u_ripples[i];
    vec2 origin = ripple.xy;
    float age = ripple.z;
    float strength = ripple.w;
    float dist = distance(uv, origin);
    float radius = age * 0.34;
    float ring = sin((dist - radius) * 96.0);
    float envelope = exp(-abs(dist - radius) * 18.0) * exp(-age * 1.35);
    height += ring * envelope * strength;
  }

  if (u_pointerActive > 0.5) {
    float hover = distance(uv, u_pointer);
    height += exp(-hover * 28.0) * 0.035;
  }

  return height;
}

float rippleMask(vec2 uv) {
  float mask = 0.0;

  for (int i = 0; i < 20; i++) {
    if (i >= u_rippleCount) {
      break;
    }

    vec4 ripple = u_ripples[i];
    float dist = distance(uv, ripple.xy);
    float radius = ripple.z * 0.34;
    float envelope = exp(-abs(dist - radius) * 13.0) * exp(-ripple.z * 0.92);
    mask += envelope * ripple.w;
  }

  if (u_pointerActive > 0.5) {
    mask += exp(-distance(uv, u_pointer) * 13.5) * 0.55;
  }

  return clamp(mask, 0.0, 1.0);
}

float waterHeight(vec2 uv) {
  vec2 aspectUv = vec2(uv.x * u_resolution.x / u_resolution.y, uv.y);
  float t = u_time;

  float swell =
    sin(aspectUv.x * 7.3 + aspectUv.y * 2.2 - t * 0.45) * 0.011 +
    sin(aspectUv.x * -4.8 + aspectUv.y * 8.8 + t * 0.38) * 0.008 +
    sin((aspectUv.x + aspectUv.y) * 13.0 - t * 0.62) * 0.004;

  float chop = fbm(aspectUv * 5.4 + vec2(t * 0.025, -t * 0.018)) * 0.013;
  float fine = fbm(aspectUv * 18.0 + vec2(-t * 0.08, t * 0.05)) * 0.004;

  return swell + chop + fine + rippleHeight(uv);
}

vec3 getNormal(vec2 uv) {
  vec2 texel = vec2(1.0 / u_resolution.x, 1.0 / u_resolution.y) * 2.2;
  float h = waterHeight(uv);
  float hx = waterHeight(uv + vec2(texel.x, 0.0));
  float hy = waterHeight(uv + vec2(0.0, texel.y));
  return normalize(vec3((h - hx) * 7.5, (h - hy) * 7.5, 1.0));
}

vec3 skyColor(vec2 uv, vec3 normal) {
  float horizon = smoothstep(0.1, 1.0, uv.y + normal.y * 0.24);
  vec3 cyanShade = vec3(0.045, 0.45, 0.49);
  vec3 paleCyan = vec3(0.12, 0.68, 0.70);
  vec3 cyanSky = mix(cyanShade, paleCyan, horizon) * 0.42;
  vec3 darkSky = mix(vec3(0.006, 0.011, 0.014), vec3(0.025, 0.045, 0.052), horizon);
  return mix(cyanSky, darkSky, u_theme);
}

void main() {
  vec2 uv = v_uv;
  vec2 centered = uv - 0.5;
  centered.x *= u_resolution.x / u_resolution.y;

  vec3 normal = getNormal(uv);
  float reveal = rippleMask(uv);
  vec3 viewDir = normalize(vec3(centered * -0.7, 1.35));
  vec3 lightDir = normalize(vec3(-0.42, 0.62, 0.66));
  vec3 halfDir = normalize(lightDir + viewDir);

  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  float spec = pow(max(dot(normal, halfDir), 0.0), 128.0);
  float sparkle = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 420.0);

  vec2 refractUv = uv + normal.xy * 0.075;
  float depth = smoothstep(0.0, 1.0, uv.y);
  float sandLight = fbm(refractUv * 7.5 + vec2(0.0, u_time * 0.025));
  vec3 cyanShallow = vec3(0.03, 0.62, 0.66);
  vec3 cyanDeep = vec3(0.012, 0.34, 0.39);
  vec3 darkShallow = vec3(0.018, 0.04, 0.045);
  vec3 darkDeep = vec3(0.004, 0.007, 0.009);
  vec3 shallow = mix(cyanShallow, darkShallow, u_theme);
  vec3 deep = mix(cyanDeep, darkDeep, u_theme);
  vec3 water = mix(shallow, deep, depth * 0.74 + length(centered) * 0.18);

  float causticA = sin((refractUv.x + normal.x * 0.7) * 48.0 + u_time * 1.55);
  float causticB = sin((refractUv.y - normal.y * 0.6) * 54.0 - u_time * 1.25);
  float caustics = pow(max(causticA * causticB, 0.0), 2.6) * (1.0 - depth * 0.62);

  vec3 reflection = skyColor(uv + normal.xy * 0.18, normal);
  vec3 sandTint = mix(vec3(0.008, 0.045, 0.04), vec3(0.004, 0.01, 0.009), u_theme);
  vec3 color = mix(water + sandLight * sandTint, reflection, 0.02 + fresnel * mix(0.04, 0.08, u_theme));
  vec3 sunsetGold = vec3(1.0, 0.56, 0.13);
  vec3 paleGold = vec3(1.0, 0.84, 0.34);
  vec3 darkCaustic = vec3(0.14, 0.38, 0.42);
  vec3 darkSpec = vec3(0.86, 0.98, 1.0);
  vec3 darkSparkle = vec3(0.68, 0.95, 1.0);
  color += caustics * mix(sunsetGold * 0.82, darkCaustic, u_theme) * reveal;
  color += spec * mix(paleGold * 1.45, darkSpec * 1.15, u_theme) * reveal;
  color += sparkle * mix(vec3(1.0, 0.72, 0.2) * 2.1, darkSparkle * 1.75, u_theme) * reveal;
  color += reveal * mix(vec3(0.16, 0.065, 0.005), vec3(0.018, 0.075, 0.085), u_theme);

  for (int i = 0; i < 20; i++) {
    if (i >= u_rippleCount) {
      break;
    }

    vec4 ripple = u_ripples[i];
    float dist = distance(uv, ripple.xy);
    float ring = abs(dist - ripple.z * 0.34);
    float foam = exp(-ring * 95.0) * exp(-ripple.z * 1.45) * ripple.w;
    color += foam * mix(vec3(1.0, 0.68, 0.18) * 0.34, vec3(0.42, 0.86, 0.95) * 0.24, u_theme);
  }

  float vignette = smoothstep(0.92, 0.25, length(centered));
  color *= 0.62 + vignette * 0.58;
  color = pow(color, vec3(0.92));

  gl_FragColor = vec4(color, 1.0);
}
`;

const pointer = {
  x: 0.5,
  y: 0.5,
  lastX: 0.5,
  lastY: 0.5,
  active: 0,
};

let width = 0;
let height = 0;
let dpr = 1;
let start = performance.now();
let ripples = [];

function createShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
  }

  return shader;
}

function createProgram() {
  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl.VERTEX_SHADER, vertexShaderSource));
  gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fragmentShaderSource));
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
  }

  return program;
}

const program = createProgram();
const positionBuffer = gl.createBuffer();
const locations = {
  position: gl.getAttribLocation(program, "a_position"),
  resolution: gl.getUniformLocation(program, "u_resolution"),
  time: gl.getUniformLocation(program, "u_time"),
  ripples: gl.getUniformLocation(program, "u_ripples"),
  rippleCount: gl.getUniformLocation(program, "u_rippleCount"),
  pointer: gl.getUniformLocation(program, "u_pointer"),
  pointerActive: gl.getUniformLocation(program, "u_pointerActive"),
  theme: gl.getUniformLocation(program, "u_theme"),
};

const toggle = document.querySelector(".theme-toggle");
let themeTarget = document.body.dataset.theme === "dark" ? 1 : 0;
let themeValue = themeTarget;

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
  gl.STATIC_DRAW,
);

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function addRipple(clientX, clientY, strength = 1) {
  ripples.push({
    x: clientX / width,
    y: 1 - clientY / height,
    born: (performance.now() - start) / 1000,
    strength,
  });

  if (ripples.length > 20) {
    ripples.shift();
  }
}

function updatePointer(event) {
  const touch = event.touches?.[0] || event.changedTouches?.[0];
  const clientX = touch ? touch.clientX : event.clientX;
  const clientY = touch ? touch.clientY : event.clientY;
  const x = clientX / width;
  const y = 1 - clientY / height;
  const movement = Math.hypot(x - pointer.lastX, y - pointer.lastY);

  pointer.x = x;
  pointer.y = y;
  pointer.active = 1;

  if (movement > 0.012) {
    addRipple(clientX, clientY, Math.min(1.9, 0.45 + movement * 11.0));
    pointer.lastX = x;
    pointer.lastY = y;
  }
}

function render() {
  const now = (performance.now() - start) / 1000;
  ripples = ripples.filter((ripple) => now - ripple.born < 3.2);
  themeValue += (themeTarget - themeValue) * 0.08;

  const rippleData = new Float32Array(20 * 4);
  ripples.forEach((ripple, index) => {
    rippleData[index * 4] = ripple.x;
    rippleData[index * 4 + 1] = ripple.y;
    rippleData[index * 4 + 2] = now - ripple.born;
    rippleData[index * 4 + 3] = ripple.strength;
  });

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(locations.position);
  gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(locations.resolution, canvas.width, canvas.height);
  gl.uniform1f(locations.time, now);
  gl.uniform4fv(locations.ripples, rippleData);
  gl.uniform1i(locations.rippleCount, ripples.length);
  gl.uniform2f(locations.pointer, pointer.x, pointer.y);
  gl.uniform1f(locations.pointerActive, pointer.active);
  gl.uniform1f(locations.theme, themeValue);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(render);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", updatePointer, { passive: true });
window.addEventListener("pointerdown", (event) => {
  updatePointer(event);
  addRipple(event.clientX, event.clientY, 2.2);
});
window.addEventListener("touchmove", updatePointer, { passive: true });

toggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "cyan" ? "dark" : "cyan";
  document.body.dataset.theme = nextTheme;
  toggle.setAttribute("aria-label", nextTheme === "cyan" ? "Switch to dark water mode" : "Switch to cyan water mode");
  themeTarget = nextTheme === "dark" ? 1 : 0;
});

resize();
render();

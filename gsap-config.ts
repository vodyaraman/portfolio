// gsap-config.ts
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Регистрация плагина
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export { gsap };
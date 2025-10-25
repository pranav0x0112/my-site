// Simple index of local posts stored under public/posts/<slug>.md
// Add new posts here (slug must match the filename in public/posts)
const posts = [
  {
    slug: "resona-v100-rust-riscv-dsp-kernels",
    title: "Resona: Rust, RISC-V Assembly, and DSP Kernels",
    description:
      "My first blog! A deep dive into building a tiny DSP-inspired simulator using Rust and hand-written RISC-V Assembly.",
    date: "2024-04-05",
    url: "/blogs/resona-v100-rust-riscv-dsp-kernels"
  },
  {
    slug: "aetheron-bringing-my-own-soc-to-life",
    title: "Aetheron: Bringing My Own SoC to Life",
    description:
      "My journey building a RISC-V SoC from scratch — designed in Bluespec and capable of running real C code.",
    date: "2024-07-10",
    url: "/blogs/aetheron-bringing-my-own-soc-to-life"
  }
];

export default posts;

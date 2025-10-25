---
title: "Resona: Rust, RISC-V Assembly, and DSP Kernels"
date: "2024-04-05"
description: "A deep dive into building a tiny DSP-inspired simulator using Rust and hand-written RISC-V Assembly."
tags: [rust, riscv, dsp]
---

# Resona: Rust, RISC-V Assembly, and DSP Kernels

This is a sample copy of one of my Hashnode posts. Paste your full Hashnode markdown here when you're ready.

## TL;DR

- Built a tiny DSP-inspired simulator in Rust.
- Hand-wrote some RISC-V assembly kernels for testing.

## Example code

```rust
fn dot(a: &[f32], b: &[f32]) -> f32 {
    a.iter().zip(b.iter()).map(|(x,y)| x*y).sum()
}
```

> This is a sample blockquote to show styling.

![Sample image](https://via.placeholder.com/800x300.png?text=Resona+Cover)

More content...

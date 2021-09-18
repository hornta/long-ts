import fs from "fs";
const wasmBuffer = Uint8Array.from(fs.readFileSync("./src/wasm.wasm"));
console.log(wasmBuffer.join(","));

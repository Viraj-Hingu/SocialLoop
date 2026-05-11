const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..", "..");
const frontendDist = path.join(rootDir, "Frontend", "dist");
const backendPublic = path.join(rootDir, "Backend", "public");

if (!fs.existsSync(frontendDist)) {
  console.error(`Frontend build folder not found: ${frontendDist}`);
  process.exit(1);
}

fs.rmSync(backendPublic, { recursive: true, force: true });
fs.mkdirSync(backendPublic, { recursive: true });
fs.cpSync(frontendDist, backendPublic, { recursive: true, force: true });

console.log("Frontend dist synced to Backend/public");

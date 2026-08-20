import { execSync, spawn } from "node:child_process";

const onCI = Boolean(process.env.VERCEL || process.env.CI);

function nextDevRunning() {
    try {
        execSync("pgrep -f '[n]ext dev'", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

const env = { ...process.env };
if (!onCI && nextDevRunning() && !env.NEXT_DIST_DIR) {
    env.NEXT_DIST_DIR = ".next-precheck";
    console.warn(
        "next dev is running — building to .next-precheck so the local server stays up."
    );
}

const child = spawn("next", ["build"], { stdio: "inherit", env, shell: true });
child.on("exit", (code) => process.exit(code ?? 1));

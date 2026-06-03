#!/usr/bin/env node
/**
 * One-step deploy: build locally, commit everything, and push to both remotes.
 *
 * AppSpace serves the committed `build/` output (it can't compile in-container),
 * so we rebuild here where there's enough memory, then publish.
 *
 * Usage:
 *   npm run deploy "your commit message"
 *
 * After it finishes: go to AppSpace -> Deployments -> Promote the new build.
 */
const { execSync, execFileSync } = require("child_process");

const DEPLOY_BRANCH = "main";

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function capture(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

const currentBranch = capture("git rev-parse --abbrev-ref HEAD");
if (currentBranch !== DEPLOY_BRANCH) {
  console.error(
    `\nRefusing to deploy from "${currentBranch}". Switch to "${DEPLOY_BRANCH}" first (git checkout ${DEPLOY_BRANCH}).`
  );
  process.exit(1);
}

const message = process.argv.slice(2).join(" ").trim() || "Deploy build";

// 1. Build locally (where there's enough memory). Fails fast on a broken build.
run("npm run build");

// 2. Stage everything (source changes + regenerated build/ output).
run("git add -A");

// 3. Commit only if there is something to commit.
const hasStagedChanges = (() => {
  try {
    execSync("git diff --cached --quiet");
    return false;
  } catch {
    return true;
  }
})();

if (hasStagedChanges) {
  execFileSync("git", ["commit", "-m", message], { stdio: "inherit" });
} else {
  console.log("\nNo changes to commit; deploying existing commit.");
}

// 4. Push the same commit to both remotes.
run(`git push origin ${DEPLOY_BRANCH}`);
run(`git push appspace ${DEPLOY_BRANCH}`);

console.log(
  "\nDone. Now go to AppSpace -> Deployments and Promote the new build to make it live."
);

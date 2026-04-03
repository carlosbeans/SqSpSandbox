/* Debug session c6c038 — dependency tree probes (agent instrumentation) */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LOG = path.join(ROOT, ".cursor", "debug-c6c038.log");
const ENDPOINT =
  "http://127.0.0.1:7242/ingest/52d2e7f1-8d19-45b3-8e45-84e69bbf4642";

function send(payload) {
  const body = JSON.stringify({
    sessionId: "c6c038",
    runId: process.env.DEBUG_RUN || "deps-probe",
    ...payload,
    timestamp: Date.now(),
  });

  try {
    // #region agent log
    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "c6c038",
      },
      body,
    })
      .then(() => {})
      .catch(() => {
        fs.mkdirSync(path.dirname(LOG), { recursive: true });
        fs.appendFileSync(LOG, body + "\n");
      });
    // #endregion
  } catch (_) {
    fs.mkdirSync(path.dirname(LOG), { recursive: true });
    fs.appendFileSync(LOG, body + "\n");
  }
}

function run(cmd, hypothesisId, message) {
  let out = "";
  let code = 0;
  try {
    out = execSync(cmd, { encoding: "utf8", cwd: ROOT, maxBuffer: 5 * 1024 * 1024 });
  } catch (e) {
    code = e.status || 1;
    out =
      (e.stdout && e.stdout.toString()) ||
      (e.stderr && e.stderr.toString()) ||
      String(e.message);
  }
  send({
    hypothesisId,
    location: "scripts/debug-ingest-deps.cjs",
    message,
    data: { cmd, exitCode: code, output: out.slice(0, 6000) },
  });
  console.log(out);
  return { code, out };
}

run("npm ls 2>&1", "A", "full npm ls (peer invalid / ELSPROBLEMS)");
run("npm ls @sqs/rosetta-compositions 2>&1", "B", "npm ls rosetta-compositions (duplicates)");

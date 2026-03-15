// Auto-generated from docs.html
export interface DocSection {
  id: string
  label: string
  html: string
}

export const docSections: DocSection[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    html: `  <a href="index.html" class="back-link">&larr; Back to Home</a>
  <h1>Getting Started with Axiom</h1>
  <p class="lead">Axiom is a local, cross-platform orchestration hub for AI agents. It provides two interfaces that work on the same data store simultaneously.</p>

  <h2>What is Axiom?</h2>
  <ul>
    <li><strong><code>axiom</code> (CLI)</strong> &mdash; A command-line tool used by AI agents and power users. Agents register, claim tasks, send messages, and share state through structured CLI commands.</li>
    <li><strong><code>axiom-app</code> (GUI)</strong> &mdash; A desktop application for human users. Provides a visual dashboard, kanban task board, agent panel, memory viewer, message panel, and log viewer.</li>
  </ul>
  <p>Both interfaces work simultaneously on the same <code>.axiom/</code> project data. Changes made by agents via the CLI are reflected live in the GUI, and vice versa.</p>
  <p><strong>Axiom is 100% local.</strong> No data ever leaves your machine. No telemetry. No cloud. No subscriptions.</p>

  <h2>Step 1: Initialize a Project</h2>
  <pre><code>cd /path/to/your/project
axiom init --name "My Project"</code></pre>
  <p>This creates a <code>.axiom/</code> directory containing all orchestration state. It also creates/updates <code>.gitignore</code>, registers the project globally, and generates <code>.axiom/AGENT_ONBOARDING.md</code>.</p>

  <h2>Step 2: Register an Orchestrator</h2>
  <pre><code>axiom register --name "Lead" --role orchestrator</code></pre>
  <p>Every project needs at least one orchestrator &mdash; the agent that creates tasks and coordinates workers.</p>

  <h2>Step 3: Register Workers</h2>
  <pre><code>axiom register --name "Backend Dev" --role backend-developer --collaborators "lead"
axiom register --name "Frontend Dev" --role frontend-developer --collaborators "lead"</code></pre>
  <p>The <code>--collaborators "lead"</code> flag lets workers send messages to the orchestrator. The <code>--role</code> flag applies a template with sensible tag scoping defaults.</p>

  <h2>Step 4: Create Tasks</h2>
  <pre><code># Create tasks with dependencies
axiom task create \\
  --title "Build user API" \\
  --description "Create REST endpoints for user CRUD operations" \\
  --tags "backend,api" \\
  --priority high \\
  --as lead

axiom task create \\
  --title "Build login page" \\
  --tags "frontend,ui" \\
  --priority medium \\
  --depends-on "task-build-user-api" \\
  --as lead</code></pre>
  <p>The second task depends on the first &mdash; it can't be started until "Build user API" is marked <code>done</code>.</p>

  <h2>Step 5: Workers Claim and Execute Tasks</h2>
  <pre><code># Backend Dev checks for available work
axiom task next --as backend-dev

# Claim the task
axiom task claim task-build-user-api --as backend-dev

# Start working
axiom task status task-build-user-api in_progress --as backend-dev

# Log progress
axiom log "Implemented user model and migrations" --as backend-dev

# Store a decision in shared memory
axiom memory set api.baseUrl "/api/v1" --as backend-dev

# Mark as done
axiom task status task-build-user-api done --as backend-dev</code></pre>
  <p>Now the frontend task is unblocked. Frontend Dev can claim it and read the API info from shared memory:</p>
  <pre><code>axiom task next --as frontend-dev
axiom task claim task-build-login-page --as frontend-dev
axiom memory get api.baseUrl  # Returns: "/api/v1"</code></pre>

  <h2>Step 6: Check Project Status</h2>
  <pre><code>axiom status --pretty</code></pre>

  <h2>Step 7: Use the GUI (Optional)</h2>
  <pre><code>axiom-app</code></pre>
  <p>The GUI opens to a Project Picker. Select your project to see the Dashboard with agents, tasks, memory, messages, and logs &mdash; all updating in real time.</p>

  <h2>JSON Output Format</h2>
  <p>All CLI commands return structured JSON to stdout:</p>
  <pre><code>// Success
{ "ok": true, "data": { ... } }

// Error
{ "ok": false, "error": "ERROR_CODE", "message": "Human-readable description" }</code></pre>
  <p>Use <code>--pretty</code> on any command for indented output.</p>

  <h2>Key Concepts</h2>
  <table>
    <thead><tr><th>Concept</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Agents</strong></td><td>AI tools or processes with permission levels: <code>orchestrator</code>, <code>worker</code>, <code>reviewer</code>, <code>observer</code></td></tr>
      <tr><td><strong>Tasks</strong></td><td>Units of work following a state machine: queued &rarr; assigned &rarr; in_progress &rarr; in_review &rarr; done</td></tr>
      <tr><td><strong>Tag scoping</strong></td><td>Controls which agents can claim which tasks based on allowed/blocked tags</td></tr>
      <tr><td><strong>Memory</strong></td><td>Shared key-value store for cross-agent coordination</td></tr>
      <tr><td><strong>Messages</strong></td><td>Direct agent-to-agent communication with collaboration constraints</td></tr>
      <tr><td><strong>Templates</strong></td><td>Reusable agent configurations (role presets)</td></tr>
      <tr><td><strong>Logs</strong></td><td>Structured logging system for tracking agent activity</td></tr>
      <tr><td><strong>Managed Launch</strong></td><td>Auto-launch agents from the GUI when work is available</td></tr>
    </tbody>
  </table>
</div>

<!-- ==================== INSTALLATION ==================== -->`,
  },
  {
    id: "installation",
    label: "Installation",
    html: `  <h1>Installing Axiom</h1>
  <p class="lead">Install the Axiom CLI and GUI via curl, PowerShell, or manual download. Supports Windows, macOS, and Linux.</p>

  <h2>Quick Install</h2>
  <h3>macOS and Linux</h3>
  <pre><code>curl -fsSL https://github.com/ethan03805/axiom4.0_experimental/releases/latest/download/install.sh | sh</code></pre>
  <p>Auto-detects OS and architecture, downloads the correct binary, and installs to <code>~/.local/bin</code> by default. Set <code>AXIOM_INSTALL_DIR</code> to customize.</p>

  <h3>Windows</h3>
  <pre><code>irm https://github.com/ethan03805/axiom4.0_experimental/releases/latest/download/install.ps1 | iex</code></pre>
  <p>Downloads both the CLI and GUI binaries, installs to <code>%LOCALAPPDATA%\\Programs\\Axiom\\bin</code>, and updates PATH automatically.</p>

  <h2>Manual Download</h2>
  <p>Download binaries directly from <a href="https://github.com/ethan03805/axiom4.0_experimental/releases/latest" target="_blank">GitHub Releases</a>:</p>
  <table>
    <thead><tr><th>Platform</th><th>CLI</th><th>GUI</th></tr></thead>
    <tbody>
      <tr><td>Linux x64</td><td><code>axiom-linux-amd64</code></td><td>&mdash;</td></tr>
      <tr><td>Linux ARM64</td><td><code>axiom-linux-arm64</code></td><td>&mdash;</td></tr>
      <tr><td>macOS Intel</td><td><code>axiom-darwin-amd64</code></td><td>&mdash;</td></tr>
      <tr><td>macOS Apple Silicon</td><td><code>axiom-darwin-arm64</code></td><td>&mdash;</td></tr>
      <tr><td>Windows x64</td><td><code>axiom.exe</code></td><td><code>axiom-app.exe</code></td></tr>
      <tr><td>Windows ARM64</td><td><code>axiom-windows-arm64.exe</code></td><td>&mdash;</td></tr>
    </tbody>
  </table>
  <p>After downloading, rename the binary to <code>axiom</code>, make it executable (<code>chmod +x axiom</code>), and move it to a directory on your PATH.</p>

  <h2>Verifying the Install</h2>
  <pre><code>axiom version</code></pre>

  <h2>Updating</h2>
  <p>Re-run the installer script to download the latest release, or manually download the new binary from <a href="https://github.com/ethan03805/axiom4.0_experimental/releases/latest" target="_blank">GitHub Releases</a>.</p>

  <h2>Uninstalling</h2>
  <pre><code># macOS / Linux
rm ~/.local/bin/axiom

# Remove global config
rm -rf ~/.axiom</code></pre>
</div>

<!-- ==================== AGENTS ==================== -->`,
  },
  {
    id: "agents",
    label: "Agents",
    html: `  <h1>Agents</h1>
  <p class="lead">An agent in Axiom represents any AI tool or process that participates in the project. Agents can be manually operated, auto-launched by the GUI, or mirrored from Claude subagents.</p>

  <h2>Registration</h2>
  <pre><code>axiom register \\
  --name "Code Monkey Claude" \\
  --role backend-developer \\
  --tools "git,docker,psql" \\
  --collaborators "lead"</code></pre>

  <h3>Full Registration Example</h3>
  <pre><code>axiom register \\
  --name "API Builder" \\
  --permission worker \\
  --prompt "You build REST APIs using Express.js. Follow project coding standards." \\
  --tools "git,docker,psql" \\
  --allowed-tags "backend,api,database" \\
  --blocked-tags "frontend,ui" \\
  --collaborators "lead,reviewer-bot" \\
  --runtime-profile claude-code \\
  --auto-launch</code></pre>

  <h2>Registration Flags</h2>
  <table>
    <thead><tr><th>Flag</th><th>Required</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>--name</code></td><td>Yes</td><td>Human-readable agent name (used to generate slug ID)</td></tr>
      <tr><td><code>--role</code></td><td>No</td><td>Role template slug (e.g., <code>backend-developer</code>, <code>orchestrator</code>)</td></tr>
      <tr><td><code>--permission</code></td><td>No</td><td><code>orchestrator</code>, <code>worker</code> (default), <code>reviewer</code>, or <code>observer</code></td></tr>
      <tr><td><code>--prompt</code></td><td>No</td><td>Natural language instructions for the agent</td></tr>
      <tr><td><code>--tools</code></td><td>No</td><td>Comma-separated informational tool list</td></tr>
      <tr><td><code>--allowed-tags</code></td><td>No</td><td>Task tag whitelist (only claim matching tasks)</td></tr>
      <tr><td><code>--blocked-tags</code></td><td>No</td><td>Task tag blacklist (never claim matching tasks)</td></tr>
      <tr><td><code>--collaborators</code></td><td>No</td><td>Direct-message allowlist (agent IDs)</td></tr>
      <tr><td><code>--runtime-profile</code></td><td>No</td><td>Managed launch profile: <code>claude-code</code>, <code>codex</code></td></tr>
      <tr><td><code>--auto-launch</code></td><td>No</td><td>Enable auto-launching from GUI when eligible work exists</td></tr>
    </tbody>
  </table>

  <h2>Permission Levels</h2>
  <table>
    <thead><tr><th>Capability</th><th>orchestrator</th><th>worker</th><th>reviewer</th><th>observer</th></tr></thead>
    <tbody>
      <tr><td>Create tasks</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Assign tasks</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Update task fields</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Claim tasks</td><td>Yes</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Execute tasks</td><td>Yes</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Review tasks</td><td>Yes</td><td>&mdash;</td><td>Yes</td><td>&mdash;</td></tr>
      <tr><td>Register/unregister agents</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Update any agent</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Update own agent</td><td>Yes</td><td>Yes</td><td>Yes</td><td>&mdash;</td></tr>
      <tr><td>Message anyone</td><td>Yes</td><td>&mdash;</td><td>&mdash;</td><td>&mdash;</td></tr>
      <tr><td>Message collaborators</td><td>Yes</td><td>Yes</td><td>Yes</td><td>&mdash;</td></tr>
      <tr><td>Read project state</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
      <tr><td>Write to memory</td><td>Yes</td><td>Yes</td><td>Yes</td><td>&mdash;</td></tr>
      <tr><td>Write logs</td><td>Yes</td><td>Yes</td><td>Yes</td><td>&mdash;</td></tr>
    </tbody>
  </table>

  <h3>When to Use Each Level</h3>
  <ul>
    <li><strong>Orchestrator</strong>: The "project manager" agent. Creates tasks, assigns work, coordinates the team.</li>
    <li><strong>Worker</strong>: The "developer" agent. Claims tasks, does the work, reports status.</li>
    <li><strong>Reviewer</strong>: A "code reviewer" agent. Can approve or reject tasks in <code>in_review</code> status.</li>
    <li><strong>Observer</strong>: Read-only access. Useful for monitoring dashboards or audit agents.</li>
  </ul>

  <h2>Agent Identity Resolution</h2>
  <p>Axiom resolves the active agent in this priority order:</p>
  <ol>
    <li><code>--as &lt;agent-slug&gt;</code> flag (highest priority)</li>
    <li><code>AXIOM_AGENT</code> environment variable</li>
    <li><code>.axiom/.session</code> file (set when you register)</li>
  </ol>

  <h2>Tag-Based Scoping</h2>
  <p>Tags control which tasks an agent can claim. Evaluated in order:</p>
  <ol>
    <li>If any task tag matches <code>blocked_tags</code> &rarr; <strong>not eligible</strong></li>
    <li>If agent has <code>allowed_tags</code> and no task tag matches &rarr; <strong>not eligible</strong></li>
    <li>Otherwise &rarr; <strong>eligible</strong></li>
  </ol>
  <p>Orchestrators bypass all tag restrictions.</p>

  <h3>Tag Scoping Example</h3>
  <pre><code># Agent with allowed_tags: [backend, api] and blocked_tags: [frontend]

# Task tagged "backend,api"    → eligible (matches allowed_tags)
# Task tagged "frontend,ui"    → blocked (matches blocked_tags)
# Task tagged "devops"         → blocked (not in allowed_tags)
# Task with no tags            → blocked (has allowed_tags but no match)</code></pre>

  <h2>Agent Status</h2>
  <table>
    <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><code>idle</code></td><td>No in-progress tasks, last transition wasn't <code>failed</code></td></tr>
      <tr><td><code>working</code></td><td>At least one <code>in_progress</code> task</td></tr>
      <tr><td><code>error</code></td><td>Most recent task transition was to <code>failed</code></td></tr>
      <tr><td><code>offline</code></td><td>Set manually when agent is unavailable</td></tr>
    </tbody>
  </table>

  <h2>Viewing &amp; Updating Agents</h2>
  <pre><code># List all agents
axiom who --pretty

# Filter by status
axiom who --status working --pretty

# View a single agent
axiom agent backend-dev --pretty

# Update an agent's configuration
axiom agent update --id backend-dev --prompt "Focus on PostgreSQL" --as lead

# Update tags
axiom agent update --id backend-dev --allowed-tags "backend,api,database,devops" --as lead

# Update collaborators
axiom agent update --id backend-dev --collaborators "lead,frontend-dev" --as lead</code></pre>
  <p>Note: <code>--tools</code>, <code>--allowed-tags</code>, <code>--blocked-tags</code>, and <code>--collaborators</code> <strong>replace</strong> existing values (they don't append).</p>

  <h2>Deregistration</h2>
  <pre><code>axiom unregister --id backend-dev</code></pre>
  <p>Removes the agent file, clears the session, removes from task assignments, and deletes the inbox. Use <code>--force</code> if the agent has in-progress tasks.</p>
</div>
<!-- ==================== AGENT ONBOARDING ==================== -->`,
  },
  {
    id: "agent-onboarding",
    label: "Agent Onboarding",
    html: `  <h1>Agent Onboarding</h1>
  <p class="lead">Axiom includes a built-in onboarding system that teaches new agents how to operate inside an Axiom-managed project.</p>

  <h2>The Onboarding File</h2>
  <p>Every Axiom project contains <code>.axiom/AGENT_ONBOARDING.md</code>. It is regenerated whenever the agent roster changes and contains:</p>
  <ol>
    <li>Identity discovery and setup</li>
    <li>Situational awareness (read messages, memory, tasks first)</li>
    <li>Mandatory behaviors (logging, status updates, collaboration)</li>
    <li>Managed launch context (<code>AXIOM_LAUNCH_PACKET</code>, env variables)</li>
    <li>Role-specific workflows</li>
    <li>Task state machine and tag scoping</li>
  </ol>

  <h2>Managed Launch Environment Variables</h2>
  <table>
    <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><code>AXIOM_AGENT</code></td><td>The active Axiom agent slug</td></tr>
      <tr><td><code>AXIOM_PROJECT</code></td><td>Project root</td></tr>
      <tr><td><code>AXIOM_ONBOARDING_FILE</code></td><td>Path to <code>.axiom/AGENT_ONBOARDING.md</code></td></tr>
      <tr><td><code>AXIOM_AGENT_FILE</code></td><td>Path to the agent JSON file</td></tr>
      <tr><td><code>AXIOM_LAUNCH_PACKET</code></td><td>Path to the generated launch packet</td></tr>
      <tr><td><code>OPENCODE_CONFIG</code></td><td>Path to the generated OpenCode config</td></tr>
    </tbody>
  </table>

  <h2>Auto-Launched Startup Sequence</h2>
  <ol>
    <li>Read <code>AXIOM_LAUNCH_PACKET</code></li>
    <li>Read <code>AXIOM_ONBOARDING_FILE</code></li>
    <li>Read <code>AXIOM_AGENT_FILE</code> or run <code>axiom agent &lt;slug&gt; --pretty</code></li>
    <li>Read <code>axiom messages --as &lt;you&gt;</code></li>
    <li>Read <code>axiom memory list</code> and relevant keys</li>
    <li>Pull or continue work from Axiom</li>
    <li>After task completion, check Axiom again instead of waiting for a human</li>
  </ol>

  <h2>Orientation Prompt vs. Onboarding File</h2>
  <table>
    <thead><tr><th>Layer</th><th>Location</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>Onboarding file</td><td><code>.axiom/AGENT_ONBOARDING.md</code></td><td>Project-wide startup rules for any agent</td></tr>
      <tr><td>Orientation prompt</td><td>Agent <code>natural_language</code> field</td><td>Role-specific operating rules and command examples</td></tr>
    </tbody>
  </table>

  <h2>Operator Checklist</h2>
  <ol>
    <li>Register the agent</li>
    <li>Confirm the agent can identify itself</li>
    <li>Ensure it reads <code>.axiom/AGENT_ONBOARDING.md</code></li>
    <li>If managed launch, set Runtime Profile and open <code>axiom-app</code></li>
    <li>For OpenCode, verify local install and provider auth</li>
    <li>Verify the agent reads messages and memory before touching tasks</li>
    <li>Verify the agent updates task status and writes logs</li>
    <li>Verify the agent loops back to Axiom after completing work</li>
  </ol>
</div>

<!-- ==================== MANAGED AGENT LAUNCH ==================== -->`,
  },
  {
    id: "managed-agent-launch",
    label: "Managed Agent Launch",
    html: `  <h1>Managed Agent Launch</h1>
  <p class="lead">Axiom stores managed launch intent on agent records and lets <code>axiom-app</code> perform the actual process spawn.</p>

  <h2>Supported Profiles</h2>
  <table>
    <thead><tr><th>Profile</th><th>CLI</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td><code>opencode</code></td><td>OpenCode</td><td>Preferred default</td></tr>
      <tr><td><code>codex</code></td><td>Codex CLI</td><td>Supported</td></tr>
      <tr><td><code>claude-code</code></td><td>Claude Code</td><td>Supported</td></tr>
    </tbody>
  </table>

  <h2>Runtime Metadata</h2>
  <table>
    <thead><tr><th>Field</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><code>profile</code></td><td>Which launcher to use</td></tr>
      <tr><td><code>auto_launch</code></td><td>Whether GUI should auto-start</td></tr>
      <tr><td><code>model</code></td><td>Default OpenCode model</td></tr>
      <tr><td><code>small_model</code></td><td>Default OpenCode small model</td></tr>
      <tr><td><code>tool_permissions</code></td><td>OpenCode tool permission overrides</td></tr>
    </tbody>
  </table>

  <h2>Task-Level Model Overrides</h2>
  <pre><code>axiom task create \\
  --title "Review auth middleware" \\
  --assign reviewer-opencode \\
  --model openrouter/anthropic/claude-sonnet-4.5 \\
  --as orchestrator</code></pre>

  <h3>Precedence</h3>
  <ol>
    <li>Highest-priority active assigned task override</li>
    <li>Oldest task among same-priority overrides</li>
    <li>Agent runtime default</li>
  </ol>

  <h2>Tool Permissions</h2>
  <p>Axiom enforces role-aware baselines:</p>
  <ul>
    <li><code>task=deny</code> for every OpenCode agent</li>
    <li><code>question=deny</code> for non-orchestrators</li>
    <li><code>bash=deny</code>, <code>edit=deny</code>, <code>todowrite=deny</code> for observers</li>
  </ul>

  <h2>Auto-Launch Conditions</h2>
  <ol>
    <li><code>runtime.profile</code> is set</li>
    <li><code>runtime.auto_launch</code> is <code>true</code></li>
    <li>Profile is launchable</li>
    <li>Agent has assigned/in-progress work (or is orchestrator)</li>
    <li>Launch cooldown has expired</li>
  </ol>
</div>

<!-- ==================== OPENCODE RUNTIME ==================== -->`,
  },
  {
    id: "opencode-runtime",
    label: "OpenCode Runtime",
    html: `  <h1>OpenCode Runtime</h1>
  <p class="lead">Model-flexible managed runtime. Axiom launches OpenCode agents while choosing OpenRouter models per agent and per task.</p>

  <h2>Requirements</h2>
  <ol>
    <li>Install <code>opencode</code> locally</li>
    <li>Configure OpenCode authentication and provider access</li>
    <li>Confirm <code>opencode models openrouter</code> works</li>
  </ol>

  <h2>Model Discovery</h2>
  <pre><code>axiom models list --provider openrouter
axiom models list --provider openrouter --refresh</code></pre>

  <h2>Creating an OpenCode Agent</h2>
  <pre><code>axiom register \\
  --name "Backend OpenCode" \\
  --role backend-developer \\
  --runtime-profile opencode \\
  --runtime-model openrouter/google/gemini-2.5-flash \\
  --auto-launch \\
  --as orchestrator</code></pre>

  <h2>Permission Model</h2>
  <table>
    <thead><tr><th>Axiom Role</th><th>Baseline OpenCode Behavior</th></tr></thead>
    <tbody>
      <tr><td><code>orchestrator</code></td><td><code>question=ask</code>, <code>task=deny</code></td></tr>
      <tr><td><code>worker</code></td><td><code>question=deny</code>, <code>task=deny</code></td></tr>
      <tr><td><code>reviewer</code></td><td><code>question=deny</code>, <code>task=deny</code></td></tr>
      <tr><td><code>observer</code></td><td><code>question=deny</code>, <code>task=deny</code>, <code>bash=deny</code>, <code>edit=deny</code></td></tr>
    </tbody>
  </table>

  <h2>Generated Artifacts</h2>
  <p>Before launching, Axiom writes per-agent:</p>
  <pre><code>.axiom/runtime/launch/&lt;agent-id&gt;/launch-packet.md
.axiom/runtime/launch/&lt;agent-id&gt;/opencode-instructions.md
.axiom/runtime/launch/&lt;agent-id&gt;/opencode.json</code></pre>

  <h2>Troubleshooting</h2>
  <ul>
    <li><strong>opencode not found</strong>: Install OpenCode or set <code>AXIOM_OPENCODE_BIN</code></li>
    <li><strong>No models returned</strong>: Check <code>opencode models openrouter</code> locally</li>
    <li><strong>Wrong model</strong>: Check agent default, task overrides, and launch packet</li>
    <li><strong>Agent asks human</strong>: Verify <code>question=deny</code> in generated config</li>
  </ul>
</div>

<!-- ==================== GUI DASHBOARD ==================== -->`,
  },
  {
    id: "gui-dashboard",
    label: "GUI Dashboard",
    html: `  <h1>GUI Dashboard</h1>
  <p class="lead">Desktop GUI application that works against the same <code>.axiom/</code> data store as the CLI. Also hosts the managed runtime loop for auto-launching agents.</p>

  <h2>Launching</h2>
  <pre><code>axiom-app</code></pre>

  <h2>Architecture</h2>
  <ul>
    <li>Wails bindings for frontend-to-Go calls</li>
    <li>Filesystem watcher for real-time CLI sync</li>
    <li>Managed runtime loop for auto-launching agents</li>
    <li>Claude hook helper for subagent mirroring</li>
    <li>Embedded React frontend</li>
  </ul>

  <h2>Canvas</h2>
  <p>Interactive graph view where agents and tasks appear as draggable nodes on an infinite pannable, zoomable surface.</p>
  <table>
    <thead><tr><th>Permission</th><th>Node Color</th></tr></thead>
    <tbody>
      <tr><td>orchestrator</td><td>Purple</td></tr>
      <tr><td>worker</td><td>Teal</td></tr>
      <tr><td>reviewer</td><td>Amber</td></tr>
      <tr><td>observer</td><td>Gray</td></tr>
    </tbody>
  </table>
  <p><strong>Connections:</strong> Collaborator edges (solid teal) and assignment edges (dashed purple). Draw connections by dragging between agent handles. Node positions persist to <code>.axiom/canvas-layout.json</code>.</p>

  <h2>Agent Panel</h2>
  <p>Left panel lists agents with status, name, and permission. Right panel shows all agent fields including managed runtime config. Supports registration, editing, model picker, and one-click launch.</p>

  <h2>Task Board</h2>
  <p>Kanban view with columns: queued, assigned, in_progress, in_review, done, failed, blocked. Drag-and-drop follows the same state machine as the CLI. Supports task editing, model overrides, and inline comments.</p>

  <h2>Other Views</h2>
  <ul>
    <li><strong>Memory Viewer</strong> &mdash; Browse, create, and delete key-value entries</li>
    <li><strong>Message Panel</strong> &mdash; Conversation-style messaging with orchestrator authority</li>
    <li><strong>Log Viewer</strong> &mdash; Filter by date, agent, and level</li>
    <li><strong>Documentation Viewer</strong> &mdash; Embedded markdown docs inside the app</li>
  </ul>
</div>

<!-- ==================== TASKS ==================== -->`,
  },
  {
    id: "tasks",
    label: "Tasks",
    html: `  <h1>Tasks</h1>
  <p class="lead">Tasks are the units of work in Axiom. They have a title, tags, priority, dependencies, and follow a strict state machine.</p>

  <h2>Creating Tasks</h2>
  <pre><code>axiom task create \\
  --title "Build hero section" \\
  --description "Create responsive hero with CTA buttons" \\
  --tags "frontend,ui" \\
  --priority high \\
  --as lead</code></pre>

  <h3>Create Flags</h3>
  <table>
    <thead><tr><th>Flag</th><th>Required</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>--title</code></td><td>Yes</td><td>Task title (used to generate ID)</td></tr>
      <tr><td><code>--description</code></td><td>No</td><td>Detailed description or acceptance criteria</td></tr>
      <tr><td><code>--tags</code></td><td>No</td><td>Comma-separated tags for routing to agents</td></tr>
      <tr><td><code>--priority</code></td><td>No</td><td><code>critical</code>, <code>high</code>, <code>medium</code> (default), <code>low</code></td></tr>
      <tr><td><code>--depends-on</code></td><td>No</td><td>Comma-separated task IDs that must be <code>done</code> first</td></tr>
      <tr><td><code>--assign</code></td><td>No</td><td>Comma-separated agent IDs (task starts as <code>assigned</code>)</td></tr>
    </tbody>
  </table>

  <h3>Pre-Assigning Tasks</h3>
  <pre><code>axiom task create \\
  --title "Review auth middleware" \\
  --tags "backend,security" \\
  --assign "backend-dev" \\
  --as lead</code></pre>
  <p>The task starts with status <code>assigned</code> instead of <code>queued</code>.</p>

  <h2>State Machine</h2>
  <pre><code>queued &rarr; assigned &rarr; in_progress &rarr; in_review &rarr; done
                            &darr;              &darr;
                          failed          failed
                            &darr;              &darr;
                          blocked        blocked
                            &darr;              &darr;
                          queued          queued</code></pre>

  <h2>Valid Transitions</h2>
  <table>
    <thead><tr><th>From</th><th>To</th><th>Who Can Do It</th></tr></thead>
    <tbody>
      <tr><td><code>queued</code></td><td><code>assigned</code></td><td>Orchestrator, or any eligible agent via <code>task claim</code></td></tr>
      <tr><td><code>assigned</code></td><td><code>in_progress</code></td><td>Assigned worker or orchestrator</td></tr>
      <tr><td><code>assigned</code></td><td><code>queued</code></td><td>Orchestrator (re-queue)</td></tr>
      <tr><td><code>in_progress</code></td><td><code>in_review</code></td><td>Assigned worker or orchestrator</td></tr>
      <tr><td><code>in_progress</code></td><td><code>done</code></td><td>Assigned worker or orchestrator (skip review)</td></tr>
      <tr><td><code>in_progress</code></td><td><code>failed</code></td><td>Assigned worker or orchestrator</td></tr>
      <tr><td><code>in_progress</code></td><td><code>blocked</code></td><td>Assigned worker or orchestrator</td></tr>
      <tr><td><code>in_review</code></td><td><code>done</code></td><td>Reviewer or orchestrator</td></tr>
      <tr><td><code>in_review</code></td><td><code>failed</code></td><td>Reviewer or orchestrator</td></tr>
      <tr><td><code>in_review</code></td><td><code>blocked</code></td><td>Reviewer or orchestrator</td></tr>
      <tr><td><code>failed</code></td><td><code>queued</code></td><td>Orchestrator (retry)</td></tr>
      <tr><td><code>blocked</code></td><td><code>queued</code></td><td>Orchestrator (unblock)</td></tr>
    </tbody>
  </table>

  <h2>Changing Task Status</h2>
  <pre><code># Start working
axiom task status task-build-hero-section in_progress --as frontend-dev

# Submit for review
axiom task status task-build-hero-section in_review --as frontend-dev

# Reviewer approves
axiom task status task-build-hero-section done --as reviewer-bot

# Orchestrator retries a failed task
axiom task status task-build-hero-section queued --as lead</code></pre>

  <h2>Claiming Tasks</h2>
  <pre><code>axiom task claim task-build-hero-section --as frontend-dev</code></pre>
  <p>Validates tag scope, dependency status, and that the task is <code>queued</code>. Moves the task to <code>assigned</code>.</p>

  <h2>Finding Work with <code>task next</code></h2>
  <pre><code>axiom task next --as backend-dev --pretty</code></pre>
  <p>Returns the highest-priority eligible task, sorted by priority then creation time (oldest first).</p>

  <h3>Task Pull Strategies</h3>
  <table>
    <thead><tr><th>Strategy</th><th>Behavior</th></tr></thead>
    <tbody>
      <tr><td><code>queued_first</code> (default)</td><td>Prefers unassigned queued tasks, falls back to assigned</td></tr>
      <tr><td><code>assigned_only</code></td><td>Only returns tasks assigned to the caller</td></tr>
      <tr><td><code>all_eligible</code></td><td>All queued + assigned tasks in one pool</td></tr>
    </tbody>
  </table>
  <pre><code>axiom task next --strategy assigned_only --as backend-dev</code></pre>

  <h2>Listing Tasks</h2>
  <pre><code># List all tasks
axiom task list --pretty

# Filter by status, tag, agent, or priority
axiom task list --status queued --tag backend --priority high --pretty
axiom task list --assigned backend-dev --pretty</code></pre>

  <h2>Updating Task Fields</h2>
  <pre><code>axiom task update task-build-hero-section \\
  --title "Build hero section v2" \\
  --tags "frontend,ui,responsive" \\
  --priority critical \\
  --as lead</code></pre>
  <p>Only orchestrators can update task fields. Task ID, <code>created_by</code>, <code>created_at</code>, and <code>status</code> are immutable through this command.</p>

  <h2>Dependencies</h2>
  <pre><code>axiom task create --title "Setup database" --tags "backend" --as lead
axiom task create --title "Build user model" --depends-on "task-setup-database" --as lead</code></pre>
  <p>A task with unmet dependencies cannot be claimed. Returns <code>DEPENDENCY_NOT_MET</code> error.</p>

  <h2>Priority Levels</h2>
  <table>
    <thead><tr><th>Priority</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><code>critical</code></td><td>Production-down, security issues, blocking all work</td></tr>
      <tr><td><code>high</code></td><td>Important features, blockers for other tasks</td></tr>
      <tr><td><code>medium</code></td><td>Standard development work (default)</td></tr>
      <tr><td><code>low</code></td><td>Nice-to-haves, documentation, minor improvements</td></tr>
    </tbody>
  </table>
</div>

<!-- ==================== MEMORY ==================== -->`,
  },
  {
    id: "memory",
    label: "Memory",
    html: `  <h1>Memory</h1>
  <p class="lead">A project-scoped shared key-value store for cross-agent coordination. Not a replacement for agent built-in memory &mdash; specifically for shared decisions and context.</p>

  <h2>Setting Values</h2>
  <pre><code>axiom memory set &lt;key&gt; &lt;value&gt; --as &lt;agent&gt;</code></pre>

  <h3>Type Resolution</h3>
  <p>Values are auto-parsed as JSON. If parsing fails, stored as a string.</p>
  <table>
    <thead><tr><th>Command</th><th>Stored As</th><th>Type</th></tr></thead>
    <tbody>
      <tr><td><code>axiom memory set count 42</code></td><td><code>42</code></td><td>number</td></tr>
      <tr><td><code>axiom memory set flag true</code></td><td><code>true</code></td><td>boolean</td></tr>
      <tr><td><code>axiom memory set theme dark</code></td><td><code>"dark"</code></td><td>string</td></tr>
      <tr><td><code>axiom memory set items '["a","b"]'</code></td><td><code>["a","b"]</code></td><td>array</td></tr>
      <tr><td><code>axiom memory set config '{"a":1}'</code></td><td><code>{"a":1}</code></td><td>object</td></tr>
    </tbody>
  </table>

  <h3>Practical Examples</h3>
  <pre><code># Store architecture decisions
axiom memory set api.baseUrl "/api/v1" --as backend-dev
axiom memory set stack.database "postgresql" --as lead
axiom memory set db.config '{"host":"localhost","port":5432}' --as backend-dev
axiom memory set completed.modules '["auth","users","billing"]' --as lead</code></pre>

  <h2>Getting &amp; Listing</h2>
  <pre><code>axiom memory get &lt;key&gt; --pretty
axiom memory list --pretty</code></pre>

  <h2>Key Naming Convention</h2>
  <p>Use dot-delimited notation: <code>api.baseUrl</code>, <code>design.primaryColor</code>, <code>db.host</code>. On disk, dots become hyphens in filenames.</p>

  <h2>Deleting &amp; Overwriting</h2>
  <pre><code>axiom memory delete &lt;key&gt; --as &lt;agent&gt;</code></pre>
  <p>Setting a key that already exists overwrites the previous value. Observers cannot write to or delete memory.</p>

  <h2>When to Use Memory vs. Messages</h2>
  <table>
    <thead><tr><th>Use Case</th><th>Tool</th></tr></thead>
    <tbody>
      <tr><td>Share a decision that all agents need</td><td><strong>Memory</strong></td></tr>
      <tr><td>Notify a specific agent about something</td><td><strong>Messages</strong></td></tr>
      <tr><td>Store configuration that persists</td><td><strong>Memory</strong></td></tr>
      <tr><td>Ask a question and get a response</td><td><strong>Messages</strong></td></tr>
      <tr><td>Record architecture decisions</td><td><strong>Memory</strong></td></tr>
      <tr><td>Report progress on a task</td><td><strong>Messages</strong> (or logs)</td></tr>
    </tbody>
  </table>
</div>

<!-- ==================== MESSAGING ==================== -->`,
  },
  {
    id: "messaging",
    label: "Messaging",
    html: `  <h1>Messaging</h1>
  <p class="lead">Direct agent-to-agent messaging with collaboration constraints.</p>

  <h2>Sending Messages</h2>
  <pre><code>axiom message "Please prioritize the auth module" --to backend-dev --as lead</code></pre>

  <h2>Collaboration Constraints</h2>
  <table>
    <thead><tr><th>Sender</th><th>Can Message</th></tr></thead>
    <tbody>
      <tr><td><strong>Orchestrator</strong></td><td>Any registered agent</td></tr>
      <tr><td><strong>Worker</strong></td><td>Agents in their <code>collaborators</code> list + any orchestrator</td></tr>
      <tr><td><strong>Reviewer</strong></td><td>Agents in their <code>collaborators</code> list + any orchestrator</td></tr>
      <tr><td><strong>Observer</strong></td><td>Cannot send messages</td></tr>
    </tbody>
  </table>

  <h3>Setting Up Collaborators</h3>
  <pre><code># At registration time
axiom register --name "Backend Dev" --collaborators "lead,frontend-dev"

# Or update later
axiom agent update --id backend-dev --collaborators "lead,frontend-dev,reviewer-bot" --as lead</code></pre>

  <h2>Reading Messages</h2>
  <pre><code># Read all messages
axiom messages --as backend-dev --pretty

# Read only unread messages
axiom messages --unread --as backend-dev --pretty</code></pre>
  <p>Messages are returned newest-first. Reading messages automatically marks them as read.</p>

  <h2>Watch Mode</h2>
  <pre><code>axiom messages --watch --poll-interval 3 --as backend-dev</code></pre>
  <p>Continuously polls every 3 seconds and emits new messages as JSON to stdout. Useful for long-running agent processes.</p>

  <h2>Practical Workflow</h2>
  <pre><code># Orchestrator sends task context
axiom message "The API should use JWT for auth." --to backend-dev --as lead

# Worker reads before starting
axiom messages --unread --as backend-dev

# Worker sends a question back
axiom message "Should JWT expire in 1h or 24h?" --to lead --as backend-dev

# Worker notifies a collaborator
axiom message "Changed /users to return paginated results." --to frontend-dev --as backend-dev</code></pre>

  <h2>Message Storage</h2>
  <p>Messages are stored as JSONL in per-agent inbox files at <code>.axiom/messages/&lt;agent-slug&gt;-inbox.jsonl</code>.</p>
</div>

<!-- ==================== LOGGING ==================== -->`,
  },
  {
    id: "logging",
    label: "Logging",
    html: `  <h1>Logging</h1>
  <p class="lead">Structured logging system for tracking agent activity. Logs are stored as JSONL files grouped by date.</p>

  <h2>Writing Log Entries</h2>
  <pre><code>axiom log "Your message here" --as &lt;agent&gt;</code></pre>

  <h3>Log Levels</h3>
  <table>
    <thead><tr><th>Level</th><th>Flag</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><code>info</code></td><td><code>--level info</code> (default)</td><td>Progress updates, status changes, decisions</td></tr>
      <tr><td><code>warn</code></td><td><code>--level warn</code></td><td>Potential issues, retries, degraded performance</td></tr>
      <tr><td><code>error</code></td><td><code>--level error</code></td><td>Failures, exceptions, blocked work</td></tr>
    </tbody>
  </table>

  <h3>Examples</h3>
  <pre><code># Info (default level)
axiom log "Started building user API endpoints" --as backend-dev

# Warning
axiom log "Database connection slow, retrying..." --level warn --as backend-dev

# Error
axiom log "Failed to connect to database after 3 retries" --level error --as backend-dev</code></pre>

  <h2>Reading Logs</h2>
  <pre><code># List available log dates
axiom log list --pretty

# Read logs for a specific date
axiom log read 2026-03-14 --pretty

# Filter by level
axiom log read 2026-03-14 --level error --pretty

# Filter by agent
axiom log read --agent backend-dev --pretty

# Combine filters
axiom log read 2026-03-14 --level warn --agent backend-dev --pretty</code></pre>

  <h2>Log Storage</h2>
  <p>Stored as JSONL in <code>.axiom/logs/</code>, one file per day:</p>
  <pre><code>.axiom/logs/
├── 2026-03-14.jsonl
├── 2026-03-15.jsonl
└── 2026-03-16.jsonl</code></pre>
  <p>Each line is a JSON object:</p>
  <pre><code>{"timestamp":"2026-03-14T10:30:00Z","agent":"backend-dev","level":"info","message":"Started building user API"}</code></pre>

  <h2>Best Practices</h2>
  <ul>
    <li><strong>Log after meaningful steps</strong> &mdash; major milestones, not every line of code</li>
    <li><strong>Use appropriate levels</strong> &mdash; <code>info</code> for progress, <code>warn</code> for concerns, <code>error</code> for failures</li>
    <li><strong>Include context</strong> &mdash; "Built user model with 5 fields" is better than "Done"</li>
    <li><strong>Log decisions</strong> &mdash; when you make a technical choice, log why</li>
  </ul>
</div>

<!-- ==================== CONFIGURATION ==================== -->`,
  },
  {
    id: "configuration",
    label: "Configuration",
    html: `  <h1>Configuration</h1>
  <p class="lead">Project and global settings for Axiom.</p>

  <h2>Project Settings</h2>
  <pre><code>axiom config --pretty
axiom config --set max_agents=100</code></pre>

  <table>
    <thead><tr><th>Key</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>agent_timeout_minutes</code></td><td>integer</td><td>10</td><td>Agent activity timeout</td></tr>
      <tr><td><code>max_agents</code></td><td>integer</td><td>50</td><td>Maximum registered agents</td></tr>
      <tr><td><code>task_pull_strategy</code></td><td>string</td><td><code>queued_first</code></td><td>Default strategy for <code>task next</code></td></tr>
    </tbody>
  </table>

  <h3>Examples</h3>
  <pre><code>axiom config --set max_agents=100
axiom config --set task_pull_strategy=assigned_only
axiom config --set agent_timeout_minutes=30</code></pre>

  <h2>Global Configuration</h2>
  <p>Stored at <code>~/.axiom/config.json</code>. Created automatically on first use. Contains default settings and a list of registered projects.</p>

  <h2>Project Directory Structure</h2>
  <pre><code>.axiom/
├── manifest.json          # Project metadata and settings
├── .lock                  # Advisory lock file
├── .session               # Last registered agent ID
├── AGENT_ONBOARDING.md    # Cold-start guide for agents
├── agents/                # One JSON file per agent
├── tasks/                 # One JSON file per task
├── memory/                # One JSON file per memory key
├── messages/              # One JSONL file per agent inbox
├── logs/                  # JSONL log files (YYYY-MM-DD.jsonl)
├── recovery/              # Recovered corrupt files
└── runtime/               # Managed launch files</code></pre>

  <h2>Environment Variables</h2>
  <table>
    <thead><tr><th>Variable</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>AXIOM_AGENT</code></td><td>Override the active agent identity</td></tr>
      <tr><td><code>AXIOM_PROJECT</code></td><td>Override the project directory</td></tr>
      <tr><td><code>AXIOM_INSTALL_DIR</code></td><td>Custom install directory for installer</td></tr>
      <tr><td><code>AXIOM_ONBOARDING_FILE</code></td><td>Path to onboarding file (managed launch)</td></tr>
      <tr><td><code>AXIOM_AGENT_FILE</code></td><td>Path to agent JSON file (managed launch)</td></tr>
      <tr><td><code>AXIOM_LAUNCH_PACKET</code></td><td>Path to launch packet (managed launch)</td></tr>
    </tbody>
  </table>

  <h2>CLI and GUI Coexistence</h2>
  <p>Both the CLI and GUI operate on the same <code>.axiom/</code> directory using advisory file locking. The GUI includes a filesystem watcher that detects CLI changes within milliseconds. No manual refresh needed.</p>
</div>

<!-- ==================== TEMPLATES ==================== -->`,
  },
  {
    id: "templates",
    label: "Templates",
    html: `  <h1>Role Templates</h1>
  <p class="lead">Reusable agent configurations stored globally. Apply defaults with <code>--role</code> during registration.</p>

  <h2>Predefined Templates</h2>
  <table>
    <thead><tr><th>Slug</th><th>Name</th><th>Permission</th><th>Allowed Tags</th><th>Blocked Tags</th></tr></thead>
    <tbody>
      <tr><td><code>orchestrator</code></td><td>Orchestrator</td><td>orchestrator</td><td>(none)</td><td>(none)</td></tr>
      <tr><td><code>backend-developer</code></td><td>Backend Developer</td><td>worker</td><td>backend, api, database, server</td><td>frontend, ui, design</td></tr>
      <tr><td><code>frontend-developer</code></td><td>Frontend Developer</td><td>worker</td><td>frontend, ui, css, design</td><td>backend, database, server</td></tr>
      <tr><td><code>fullstack-developer</code></td><td>Full-Stack Developer</td><td>worker</td><td>(none)</td><td>(none)</td></tr>
    </tbody>
  </table>

  <h2>Using Templates</h2>
  <pre><code>axiom register --name "Backend Dev" --role backend-developer</code></pre>
  <p>Template defaults are applied first, then explicit flags override them:</p>
  <pre><code># Start with backend template, but also allow "devops" tag
axiom register --name "Backend Dev" \\
  --role backend-developer \\
  --allowed-tags "backend,api,database,server,devops"</code></pre>

  <h2>Viewing Templates</h2>
  <pre><code>axiom template list --pretty
axiom template show backend-developer --pretty</code></pre>

  <h2>Saving Custom Templates</h2>
  <pre><code>axiom template save --name "DevOps Engineer" --agent backend-dev</code></pre>
  <p>Captures the agent's permission level, allowed/blocked tags, and prompt. Templates are stored at <code>~/.axiom/templates/roles/</code>.</p>
  <p>Use your custom template for future registrations:</p>
  <pre><code>axiom register --name "DevOps Bot" --role devops-engineer</code></pre>
</div>

<!-- ==================== WORKFLOWS ==================== -->`,
  },
  {
    id: "workflows",
    label: "Workflows & Tutorials",
    html: `  <h1>Workflows &amp; Tutorials</h1>
  <p class="lead">Complete end-to-end examples that show how to use Axiom for real-world multi-agent coordination.</p>

  <h2>Multi-Agent Web App Development</h2>
  <p>Three agents build a web app: orchestrator, backend developer, frontend developer.</p>

  <h3>Setup</h3>
  <pre><code>cd ~/projects/my-app
axiom init --name "My Web App"

axiom register --name "Lead" --role orchestrator
axiom register --name "Backend Dev" --role backend-developer --collaborators "lead"
axiom register --name "Frontend Dev" --role frontend-developer --collaborators "lead,backend-dev"</code></pre>

  <h3>Create Task Plan</h3>
  <pre><code>axiom task create --title "Setup database schema" \\
  --tags "backend,database" --priority critical --as lead

axiom task create --title "Build REST API" \\
  --tags "backend,api" --priority high \\
  --depends-on "task-setup-database-schema" --as lead

axiom task create --title "Build login page" \\
  --tags "frontend,ui" --priority high \\
  --depends-on "task-build-rest-api" --as lead

axiom task create --title "Build dashboard" \\
  --tags "frontend,ui" --priority medium \\
  --depends-on "task-build-rest-api" --as lead</code></pre>

  <h3>Execute</h3>
  <pre><code># Backend Dev works through the chain
axiom task next --as backend-dev
axiom task claim task-setup-database-schema --as backend-dev
axiom task status task-setup-database-schema in_progress --as backend-dev
axiom log "Created users, posts, comments tables" --as backend-dev
axiom memory set db.tables '["users","posts","comments"]' --as backend-dev
axiom task status task-setup-database-schema done --as backend-dev

# Next task is now unblocked
axiom task next --as backend-dev
axiom task claim task-build-rest-api --as backend-dev
axiom task status task-build-rest-api in_progress --as backend-dev
axiom memory set api.baseUrl "/api/v1" --as backend-dev
axiom message "API ready at /api/v1" --to frontend-dev --as backend-dev
axiom task status task-build-rest-api done --as backend-dev

# Frontend Dev picks up work
axiom messages --unread --as frontend-dev
axiom memory get api.baseUrl --as frontend-dev
axiom task next --as frontend-dev
axiom task claim task-build-login-page --as frontend-dev
axiom task status task-build-login-page in_progress --as frontend-dev</code></pre>

  <h2>Code Review Pipeline</h2>
  <p>Use a reviewer agent to gate task completion.</p>
  <pre><code># Setup
axiom register --name "Lead" --role orchestrator
axiom register --name "Dev" --permission worker --collaborators "lead,reviewer"
axiom register --name "Reviewer" --permission reviewer --collaborators "lead,dev"

# Dev works and submits for review
axiom task status task-implement-auth in_review --as dev
axiom message "Auth ready for review. Using JWT." --to reviewer --as dev

# Reviewer approves or rejects
axiom task status task-implement-auth done --as reviewer
# or
axiom task status task-implement-auth failed --as reviewer
axiom message "JWT has a vulnerability." --to dev --as reviewer

# Orchestrator retries
axiom task status task-implement-auth queued --as lead</code></pre>

  <h2>Shared Memory Coordination</h2>
  <pre><code># Orchestrator sets project decisions
axiom memory set stack.language "typescript" --as lead
axiom memory set stack.framework "nextjs" --as lead
axiom memory set conventions.naming "camelCase for vars, PascalCase for components" --as lead

# Workers read before starting
axiom memory list --pretty --as backend-dev
axiom memory get stack.database --as backend-dev

# Workers record findings
axiom memory set api.auth.strategy "JWT with refresh tokens" --as backend-dev

# Others read those findings
axiom memory get api.auth.strategy --as frontend-dev</code></pre>
</div>

<!-- ==================== CLI REFERENCE ==================== -->`,
  },
  {
    id: "cli-reference",
    label: "CLI Reference",
    html: `  <h1>CLI Reference</h1>
  <p class="lead">Complete command reference for the <code>axiom</code> CLI. All commands output structured JSON. Use <code>--pretty</code> for formatted output.</p>

  <h2>Global Flags</h2>
  <table>
    <thead><tr><th>Flag</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>--pretty</code></td><td>Format JSON output with indentation</td></tr>
      <tr><td><code>--as &lt;agent&gt;</code></td><td>Act as the specified agent (overrides <code>AXIOM_AGENT</code> and <code>.session</code>)</td></tr>
    </tbody>
  </table>

  <h2>axiom init</h2>
  <pre><code>axiom init [path] [--name "Project Name"]</code></pre>
  <p>Initialize a new Axiom project. Creates <code>.axiom/</code> directory, manifest, onboarding file, and updates <code>.gitignore</code>.</p>

  <h2>axiom version</h2>
  <pre><code>axiom version [--pretty]</code></pre>
  <p>Print Axiom version, commit hash, build date, and release channel.</p>

  <h2>axiom status</h2>
  <pre><code>axiom status [--pretty]</code></pre>
  <p>Display project summary: agent counts by status, task counts by status, and agent list.</p>

  <h2>axiom register</h2>
  <pre><code>axiom register --name "Agent Name" [--role &lt;template&gt;] [--permission &lt;level&gt;] ...</code></pre>
  <p>Register a new agent. See <a href="#agents">Agents</a> for the full flags table.</p>

  <h2>axiom unregister</h2>
  <pre><code>axiom unregister --id &lt;slug&gt; [--force]</code></pre>
  <p>Remove a registered agent, clear session, remove from task assignments, delete inbox.</p>

  <h2>axiom who</h2>
  <pre><code>axiom who [--status &lt;status&gt;] [--pretty]</code></pre>
  <p>List all registered agents, optionally filtered by status (<code>idle</code>, <code>working</code>, <code>error</code>, <code>offline</code>).</p>

  <h2>axiom agent / axiom agent update</h2>
  <pre><code>axiom agent &lt;slug&gt; [--pretty]
axiom agent update --id &lt;slug&gt; [--prompt ...] [--tools ...] --as &lt;caller&gt;</code></pre>
  <p>View or update agent configuration. Workers can update own config; orchestrators can update anyone.</p>

  <h2>axiom task create</h2>
  <pre><code>axiom task create --title "Task Title" [--tags ...] [--priority ...] [--assign ...] --as &lt;orchestrator&gt;</code></pre>

  <h2>axiom task list</h2>
  <pre><code>axiom task list [--status ...] [--tag ...] [--assigned ...] [--priority ...] [--pretty]</code></pre>
  <p>Filters are combined with AND logic.</p>

  <h2>axiom task next / claim / status</h2>
  <pre><code>axiom task next [--strategy &lt;strategy&gt;] --as &lt;agent&gt;
axiom task claim &lt;task-id&gt; --as &lt;agent&gt;
axiom task status &lt;task-id&gt; &lt;new-status&gt; --as &lt;agent&gt;</code></pre>

  <h2>axiom task update</h2>
  <pre><code>axiom task update &lt;task-id&gt; [--title ...] [--tags ...] [--priority ...] [--assign ...] --as &lt;orchestrator&gt;</code></pre>
  <p>Update mutable task fields. Only orchestrators can use this command.</p>

  <h2>axiom memory</h2>
  <pre><code>axiom memory set &lt;key&gt; &lt;value&gt; --as &lt;agent&gt;
axiom memory get &lt;key&gt; [--pretty]
axiom memory list [--pretty]
axiom memory delete &lt;key&gt; --as &lt;agent&gt;</code></pre>

  <h2>axiom message / messages</h2>
  <pre><code>axiom message "content" --to &lt;recipient&gt; --as &lt;sender&gt;
axiom messages [--unread] [--watch] [--poll-interval &lt;n&gt;] --as &lt;agent&gt;</code></pre>

  <h2>axiom log</h2>
  <pre><code>axiom log "message" [--level &lt;level&gt;] --as &lt;agent&gt;
axiom log list [--pretty]
axiom log read [date] [--level ...] [--agent ...] [--pretty]</code></pre>
  <p>Levels: <code>info</code> (default), <code>warn</code>, <code>error</code>.</p>

  <h2>axiom config</h2>
  <pre><code>axiom config [--pretty]
axiom config --set &lt;key&gt;=&lt;value&gt;</code></pre>
  <p>See <a href="#configuration">Configuration</a> for available settings.</p>

  <h2>axiom watch</h2>
  <pre><code>axiom watch [--interval &lt;seconds&gt;] --as &lt;orchestrator&gt;</code></pre>
  <p>Headless daemon for CLI-only environments. Provides dependency auto-unblock, heartbeat detection, and auto-launch.</p>

  <h2>axiom template</h2>
  <pre><code>axiom template list [--pretty]
axiom template show &lt;slug&gt; [--pretty]
axiom template save --name "Name" --agent &lt;slug&gt;</code></pre>
</div>

<!-- ==================== ERROR REFERENCE ==================== -->`,
  },
  {
    id: "error-reference",
    label: "Error Reference",
    html: `  <h1>Error Reference</h1>
  <p class="lead">All Axiom CLI commands return structured JSON. Errors include an error code and human-readable message.</p>

  <pre><code>{
  "ok": false,
  "error": "ERROR_CODE",
  "message": "Human-readable description"
}</code></pre>

  <h2>Error Codes</h2>

  <h3>PROJECT_NOT_FOUND</h3>
  <p>No <code>.axiom/</code> directory found. <strong>Fix:</strong> Run <code>axiom init</code> or set <code>AXIOM_PROJECT=/path/to/project</code>.</p>

  <h3>ALREADY_INITIALIZED</h3>
  <p>Directory already has <code>.axiom/</code>. <strong>Fix:</strong> You don't need to init again. To start fresh: <code>rm -rf .axiom && axiom init</code>.</p>

  <h3>LOCK_TIMEOUT</h3>
  <p>Another process holds the lock (5s timeout). <strong>Fix:</strong> Wait and retry. If stale: <code>rm .axiom/.lock</code>.</p>

  <h3>BLOCKED</h3>
  <p>Agent not eligible for the task (tag scoping). <strong>Fix:</strong> Check agent's tags with <code>axiom agent &lt;slug&gt; --pretty</code> and update if needed.</p>

  <h3>CONFLICT</h3>
  <p>Resource already exists (duplicate slug). <strong>Fix:</strong> Use a different name or unregister the existing resource.</p>

  <h3>INVALID_TRANSITION</h3>
  <p>Task status transition violates state machine. <strong>Fix:</strong> Check <a href="#tasks">valid transitions</a>. Common mistake: trying to go from <code>queued</code> directly to <code>in_progress</code>.</p>

  <h3>NOT_FOUND</h3>
  <p>Resource doesn't exist. <strong>Fix:</strong> Verify with <code>axiom who</code>, <code>axiom task list</code>, <code>axiom memory list</code>, or <code>axiom template list</code>.</p>

  <h3>PERMISSION_DENIED</h3>
  <p>Agent lacks required permission. <strong>Fix:</strong> Check <a href="#agents">permission matrix</a>. Common: worker trying to create tasks (orchestrator only).</p>

  <h3>NO_COLLABORATION</h3>
  <p>Non-orchestrator tried to message a non-collaborator. <strong>Fix:</strong> Add recipient to collaborators: <code>axiom agent update --id sender --collaborators "recipient" --as lead</code>.</p>

  <h3>DEPENDENCY_NOT_MET</h3>
  <p>Task dependencies not all <code>done</code>. <strong>Fix:</strong> Complete dependency tasks first.</p>

  <h3>IDENTITY_REQUIRED</h3>
  <p>No agent identity found. <strong>Fix:</strong> Use <code>--as &lt;agent&gt;</code>, set <code>AXIOM_AGENT</code>, or register an agent.</p>

  <h3>MAX_AGENTS_EXCEEDED</h3>
  <p>Hit <code>max_agents</code> limit. <strong>Fix:</strong> <code>axiom unregister --id unused-agent</code> or <code>axiom config --set max_agents=100</code>.</p>

  <h3>CORRUPT_FILE</h3>
  <p>JSON file unparseable. Auto-copied to <code>.axiom/recovery/</code>. <strong>Fix:</strong> Check recovery dir, fix or delete the corrupt file.</p>

  <h3>INVALID_INPUT</h3>
  <p>Bad arguments or flag values. <strong>Fix:</strong> Check the error message for the specific issue.</p>`,
  },
]

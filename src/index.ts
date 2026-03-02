import type {
  ExtensionAPI,
  ExtensionContext,
} from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  let planModeEnabled = false;

  function updateStatus(ctx: ExtensionContext) {
    if (planModeEnabled) {
      ctx.ui.setStatus("plan", "Plan mode enabled");
    } else {
      ctx.ui.setStatus("plan", "");
    }
  }

  pi.registerCommand("plan", {
    description: "Toggle plan mode (on/off)",
    getArgumentCompletions: (prefix: string) => {
      const items = [
        { value: "on", label: "on — Enable plan mode (read-only)" },
        { value: "off", label: "off — Disable plan mode" },
      ];
      return items.filter((i) => i.value.startsWith(prefix));
    },
    handler: async (args, ctx) => {
      const arg = args?.trim().toLowerCase();

      if (!arg) {
        ctx.ui.notify(
          `Plan mode: ${planModeEnabled ? "on" : "off"}`,
          "info",
        );
        return;
      }

      if (arg === "on") {
        planModeEnabled = true;
        updateStatus(ctx);
        ctx.ui.notify("Plan mode enabled", "success");
        return;
      }

      if (arg === "off") {
        planModeEnabled = false;
        updateStatus(ctx);
        ctx.ui.notify("Plan mode disabled", "success");
        return;
      }

      ctx.ui.notify(`Unknown option: ${arg}. Use 'on' or 'off'.`, "error");
    },
  });

  pi.on("before_agent_start", async (event, ctx) => {
    if (planModeEnabled) {
      event.systemPrompt +=
        "\n\nYou are in PLAN mode. Analyze, research, and plan only. Do not make file changes.";
    }
  });

  pi.on("tool_call", async (event, ctx) => {
    if (planModeEnabled && (event.toolName === "write" || event.toolName === "edit")) {
      return {
        block: true,
        reason: "Plan mode is enabled. Run '/plan off' to make changes.",
      };
    }
  });

  pi.on("session_start", async (_event, ctx) => {
    updateStatus(ctx);
  });
}

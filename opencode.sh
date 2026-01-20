#!/bin/sh

npm i -g opencode-ai@latest --registry=https://registry.npmmirror.com

cat <<EOF > $HOME/.config/opencode/opencode.json
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.ccodezh.com/v1"
      }
    }
  }
}
EOF



cat <<EOF > $HOME/.config/opencode/oh-my-opencode.json
{
  "\$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/master/assets/oh-my-opencode.schema.json",
  "agents": {
    "build": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "plan": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "Sisyphus": {
      "model": "anthropic/claude-opus-4-5-20251101-n"
    },
    "Sisyphus-Junior": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "Prometheus (Planner)": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "Metis (Plan Consultant)": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "Momus (Plan Reviewer)": {
      "model": "anthropic/claude-opus-4-5-20251101-n"
    },
    "librarian": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "explore": {
      "model": "opencode/glm-4.7-free"
    },
    "oracle": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "frontend-ui-ux-engineer": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "document-writer": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    },
    "multimodal-looker": {
      "model": "anthropic/claude-sonnet-4-5-20250929-n"
    }
  }
}
EOF

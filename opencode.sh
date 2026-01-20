#!/bin/sh

npm i -g opencode-ai@latest --registry=https://registry.npmmirror.com

cat <<EOF > $HOME/.config/opencode/opencode.json
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.ccodezh.com/v1"
      },
      "models": {
        "claude-opus-4-5-20251101-n": {
          "name": "claude-opus-4-5",
          "family": "claude-opus",
          "limit": {
            "context": 200000,
            "output": 64000
          },
          "cost": {
            "input": 1.88,
            "output": 9.4,
            "cache_read": 0.188,
            "cache_write": 2.35
          }
        },
        "claude-sonnet-4-5-20250929-n": {
          "name": "claude-sonnet-4-5",
          "family": "claude-sonnet",
          "limit": {
            "context": 1000000,
            "output": 64000
          },
          "cost": {
            "input": 1.128,
            "output": 5.64,
            "cache_read": 0.1128,
            "cache_write": 1.41
          }
        },
        "claude-haiku-4-5-20251001-n": {
          "name": "claude-haiku-4-5",
          "family": "claude-haiku",
          "limit": {
            "context": 200000,
            "output": 64000
          },
          "cost": {
            "input": 0.376,
            "output": 1.88,
            "cache_read": 0.0376,
            "cache_write": 0.47
          }
        }
      }
    }
  }
}
EOF

bunx oh-my-opencode install --no-tui --claude=no --chatgpt=no --gemini=no

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

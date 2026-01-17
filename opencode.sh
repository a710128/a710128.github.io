#!/bin/sh

npm i -g opencode-ai@latest --registry=https://registry.npmmirror.com

cat <<EOF > $HOME/.config/opencode/opencode.json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "options": {
        "baseURL": "https://api.ccodezh.com/v1"
      }
    }
  }
}
EOF

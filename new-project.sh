#!/bin/bash
# new-project.sh - scaffolds a new project with standard structure
# Usage: ./new-project.sh project-name

set -e

PROJECT_NAME="$1"

if [ -z "$PROJECT_NAME" ]; then
  echo "Usage: $0 project-name"
  exit 1
fi

mkdir -p "$PROJECT_NAME"/{src/{css,js,images},docs,tests}

# Create starter files
cat > "$PROJECT_NAME"/README.md <<EOF
# $PROJECT_NAME

Project scaffold created by new-project.sh
EOF

touch "$PROJECT_NAME"/src/index.html
cat > "$PROJECT_NAME"/src/css/styles.css <<'CSS'
/* Basic starter styles */
body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; padding:0; }
.container { max-width: 960px; margin: 0 auto; padding: 1rem; }
CSS

touch "$PROJECT_NAME"/src/js/main.js

echo "# $PROJECT_NAME" > "$PROJECT_NAME"/README.md

echo "Project $PROJECT_NAME created successfully!"

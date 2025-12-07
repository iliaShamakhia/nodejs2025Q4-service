#!/bin/sh
set -e

# run prisma migrations (if present)
if command -v npx >/dev/null 2>&1; then
  echo "Running prisma migrate deploy..."
  npx prisma migrate dev --name init
  npx prisma migrate deploy || echo "Prisma migrate deploy failed or no migrations to run"
fi

# Start app
echo "Starting app..."
exec node dist/main
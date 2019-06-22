#!/bin/bash

# Script file for completely rebuilding Docker containers and volumes

echo "[MakeDocker] Destroying containers and volumes"
docker-compose down -v

echo "[MakeDocker] Rebuilding containers and volumes"
docker-compose up -d

# Give time for the docker container ports to be available
# Otherwise, prisma deploy may not connect to the container server
sleep 10

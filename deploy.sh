#!bin/bash

IMAGE_NAME=self-service-totem
NAMESPACE=evilfeeh
TAG=$(wget -q -O - "https://hub.docker.com/v2/repositories/evilfeeh/self-service-totem/tags" | grep -o '"name": *"[^"]*' | grep -o '[^"]*$' | sort -n | tail -1)

echo "🐳 Creating Docker image!"
echo "What is the version for image? (MAJOR|MINOR|PATCH):"
read VERSION

UPDATED_TAG=$(node ./tagging.js $TAG $VERSION)
echo "🔖Creating image with tag: $UPDATED_TAG"

echo "🔨Building Image..."
docker buildx build -t $NAMESPACE/$IMAGE_NAME:$UPDATED_TAG .

echo "🚀 Pushing image to Docker Hub..."
docker push $NAMESPACE/$IMAGE_NAME:$UPDATED_TAG
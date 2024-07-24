#!bin/bash

IMAGE_NAME=self-service-totem
NAMESPACE=evilfeeh
TAG=$(git describe --tags --abbrev=0)
DOCKER_TAG=$(wget -q -O - "https://hub.docker.com/v2/repositories/evilfeeh/self-service-totem/tags" | grep -o '"name": *"[^"]*' | grep -o '[^"]*$')

echo "🐳 Creating Docker image!"
echo "What is the version for image? (MAJOR|MINOR|PATCH):"
read VERSION

if [[ $DOCKER_TAG > $TAG ]] 
then
  TAG=$DOCKER_TAG
fi

UPDATED_TAG=$(node ./tagging.js $TAG $VERSION)
echo "🔖Creating image with tag: $UPDATED_TAG"

echo "🔨Building Image..."
docker buildx build -t $NAMESPACE/$IMAGE_NAME:$UPDATED_TAG .

echo "🚀 Pushing image to Docker Hub..."
docker push $NAMESPACE/$IMAGE_NAME:$UPDATED_TAG
#!/bin/bash

TARGET_FILE=$1
TARGET_SCRIPT=$(find "$(pwd -P)" -name "${TARGET_FILE}")

echo -e "Searching ${TARGET_FILE}, Found: ${TARGET_SCRIPT}"

./node_modules/mocha/bin/mocha $TARGET_SCRIPT --require ts-node/register
#!/bin/bash

pushd examples/angular-material

if [ -e ./bin/on_reload.sh ]
then
	./bin/on_reload.sh
fi

go run main.go

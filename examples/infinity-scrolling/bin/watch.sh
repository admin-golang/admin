#!/bin/bash

if [ -e ./bin/on_reload.sh ]
then
	./bin/on_reload.sh
fi

go run main.go

#!/bin/bash

go test -cover -coverprofile=coverage.out ./... && go tool cover -o coverage.html -html=coverage.out; sed -i'' -e's/black/whitesmoke/g' coverage.html && xdg-open coverage.html

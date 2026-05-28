#!/bin/bash

go test -cover -coverprofile=coverage.out ./... \
  && go tool cover -o coverage.html -html=coverage.out \
  && sed -i 's/black/whitesmoke/g' coverage.html \
  && google-chrome coverage.html >/dev/null 2>&1 &

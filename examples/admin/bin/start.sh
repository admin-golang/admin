#!/bin/bash

go install github.com/cespare/reflex@latest
reflex -s -g reflex.conf -- reflex -c reflex.conf

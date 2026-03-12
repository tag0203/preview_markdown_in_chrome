#!/bin/bash
for f in "$@"; do
  open -a "Vivaldi" "$f"
done

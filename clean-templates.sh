#!/bin/bash

templates_folder="templates"

# Check if templates folder exists
if [ ! -d "$templates_folder" ]; then
  echo "Templates folder not found."
  exit 1
fi

# Iterate through each folder in the templates directory
for folder in "$templates_folder"/*/; do
  folder_name=$(basename "$folder")
  node_modules_path="$folder/node_modules"

  # Delete node_modules directory
  if [ -d "$node_modules_path" ]; then
    rm -rf "$node_modules_path"
    echo "Deleted node_modules directory in $folder_name."
  else
    echo "node_modules directory not found in $folder_name."
  fi

  # Delete lock files
  lock_files=("$folder"/*.lock*)
  for lock_file in "${lock_files[@]}"; do
    if [ -f "$lock_file" ]; then
      rm "$lock_file"
      echo "Deleted $(basename "$lock_file") in $folder_name."
    fi
  done
done

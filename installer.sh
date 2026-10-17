#!/bin/bash

echo "========================================="
echo "   Minecraft Bedrock Mod Installer       "
echo "========================================="
echo "Pilih mod yang ingin kamu instal:"
echo "1. Tree-capitator"
#echo "2. Custom-sword (contoh mod lain)"
#echo "3. Keluar"
read -p "Masukkan pilihan angka (1): " pilihan

case $pilihan in 
    1) 
        MOD_FOLDER="Tree-ccapitator"
        ;;
    *)
        echo "Instalasi dibatalkan."
        exit 0
        ;;
esac

REPO_URL="https://github.com/KUNBU8U7B/MOD-MCPE.git"

git init
if ! git remote | grep -q origin; then
    git remote add origin "$REPO_URL"
fi

git sparse-checkout init --cone
git sparse-checkout set "$MOD_FOLDER"

git pull origin main

echo "========================================="
echo " Selesai! Folder '$MOD_FOLDER' berhasil diunduh!"
echo "========================================="
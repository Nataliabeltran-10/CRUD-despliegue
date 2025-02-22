#!/bin/bash
set -e  # Detiene la ejecución si hay un error

echo "Iniciando despliegue..."

# Sincroniza archivos con el servidor
rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" ./ usuario@servidor:/ruta/destino

# Ejecuta un script remoto para reiniciar la aplicación
ssh -o StrictHostKeyChecking=no usuario@servidor "cd /ruta/destino && ./restart.sh"

echo "Despliegue completado con éxito."

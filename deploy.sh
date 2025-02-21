#!/bin/bash
echo "Iniciando despliegue a producción..."

# Ejemplo de comandos para desplegar a un servidor remoto via SSH
ssh -o StrictHostKeyChecking=no user@your-server.com << 'EOF'
  cd /path/to/your/app
  git pull origin main  # Obtener la última versión de la rama principal
  npm install  # Instalar dependencias
  npm run build  # Si tienes una construcción previa
  pm2 restart app  # Reiniciar el servidor (si usas pm2)
EOF

echo "Despliegue completado."

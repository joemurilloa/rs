#!/bin/bash

# Script para instalar las dependencias necesarias para solucionar el problema de ESLint

echo "Instalando dependencias de ESLint para soporte de ES6..."
npm install --save-dev @babel/core @babel/eslint-parser @babel/preset-react eslint eslint-plugin-react eslint-plugin-react-hooks

echo "Verificando la configuración..."
# Comprueba si el archivo .eslintrc.js está correctamente creado
if [ -f ".eslintrc.js" ]; then
  echo "El archivo .eslintrc.js existe. ✓"
else
  echo "ERROR: El archivo .eslintrc.js no existe. Por favor, crea este archivo primero."
  exit 1
fi

echo "Ejecutando una prueba de lint..."
# Prueba de lint en App.js
npx eslint src/App.js --no-error-on-unmatched-pattern

echo ""
echo "Instalación completa. Si no hay errores de ESLint, puedes proceder con el build:"
echo "npm run build"
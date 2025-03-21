#!/bin/bash

# Script para facilitar el despliegue a Netlify

echo "Instalando dependencias..."
npm install

echo "Ejecutando pruebas..."
npm test -- --watchAll=false

echo "Construyendo para producción..."
npm run build

echo "Proyecto listo para ser desplegado en Netlify!"
echo "Puedes desplegarlo manualmente subiendo la carpeta 'build' a Netlify"
echo "o usando el CLI de Netlify con: netlify deploy"
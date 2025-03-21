module.exports = {
    extends: [
      'react-app',
      'react-app/jest',
    ],
    rules: {
      // Desactivar reglas específicas que están causando problemas
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'warn'
    }
  };
# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./ 
RUN npm install 

# Copia el resto de los archivos (incluyendo /public y /src)
COPY . .

# Construye la aplicación (si usas Vite, esto es opcional si usas "preview")
RUN npm run build

# Expone el puerto que usa la app
EXPOSE 4173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "preview"]

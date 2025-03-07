# Usar una imagen base de Node.js más reciente
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 4173

# Comando para ejecutar la aplicación en modo de vista previa
CMD ["npm", "run", "preview"]
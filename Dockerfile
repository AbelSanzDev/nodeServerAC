# Usar una imagen base oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install


# Construir la aplicación
RUN npm run build

RUN npm run start



# Comando para ejecutar la aplicación
CMD ["node", "dist/app.js"]

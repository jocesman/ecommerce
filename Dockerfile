# Imagen base con Node 22.11.0
FROM node:22.11.0

# Crear y establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer el puerto (ajusta si tu app usa otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start"]

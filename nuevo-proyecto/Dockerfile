
# Dockerfile
FROM openjdk:17-jdk-slim

#directorio de trabajo
WORKDIR /app

# Aqui debemos asegurarnos del nombre de nuestro jar coincida
COPY target/nuevo-proyecto-1.0-SNAPSHOT.jar app.jar

# Ubicacion y nombre del wallet descomprimido
COPY ./Wallet_QMX8X1I4LTY0NIR1 /app/Wallet_tienda

#PUERTO
EXPOSE 8085

CMD ["java", "-jar", "app.jar"]
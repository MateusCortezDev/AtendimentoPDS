# Usa uma imagem oficial do Java (JDK 17)
FROM eclipse-temurin:17-jdk-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o JAR gerado pelo Maven para dentro do container
COPY target/app.jar app.jar

# Expõe a porta (Render define a variável PORT, mas aqui é só informativo)
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["java", "-jar", "app.jar"]

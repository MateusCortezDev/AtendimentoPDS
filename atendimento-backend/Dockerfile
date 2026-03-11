# Etapa de build
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Etapa final (runtime)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/app.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

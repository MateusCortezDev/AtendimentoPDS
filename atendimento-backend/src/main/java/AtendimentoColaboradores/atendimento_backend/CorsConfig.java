package AtendimentoColaboradores.atendimento_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("https://atendimento-im00h3t36-mateuscortezdevs-projects.vercel.app")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*") // permite todos os headers
                        .exposedHeaders("Authorization", "Content-Type") // expõe cabeçalhos úteis
                        .allowCredentials(true)
                        .maxAge(3600); // cache do preflight por 1h
            }
        };
    }
}

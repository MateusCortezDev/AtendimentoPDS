package AtendimentoColaboradores.atendimento_backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
    long countByStatusAndDataCriacaoBetween(String status, LocalDateTime inicio, LocalDateTime fim);
    long countByStatusAndDataConclusaoBetween(String status, LocalDateTime inicio, LocalDateTime fim);
}

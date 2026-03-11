package AtendimentoColaboradores.atendimento_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "https://atendimento-7gv53o2fv-mateuscortezdevs-projects.vercel.app")
public class ChamadoController {

    @Autowired
    private ChamadoRepository chamadoRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private ComentarioRepository comentarioRepo;

    // Criar chamado
    @PostMapping("/{usuarioId}")
    public Chamado criarChamado(@PathVariable Long usuarioId, @RequestBody Chamado chamado) {
        Usuario usuario = usuarioRepo.findById(usuarioId).orElseThrow();
        chamado.setCriador(usuario);
        chamado.setDataCriacao(LocalDateTime.now());
        return chamadoRepo.save(chamado);
    }

    // Listar todos (diagnóstico)
    @GetMapping("/todos")
    public List<Chamado> listarTodos() {
        return chamadoRepo.findAll();
    }

    // Listar chamados do colaborador
    @GetMapping("/colaborador/{usuarioId}")
    public List<Chamado> listarChamadosColaborador(@PathVariable Long usuarioId) {
        return chamadoRepo.findAll().stream()
                .filter(c -> c.getCriador() != null && c.getCriador().getId().equals(usuarioId))
                .toList();
    }

    // Listar chamados do atendente
    @GetMapping("/atendente")
    public List<Chamado> listarChamadosAtendente(@RequestParam(required = false) String setor) {
        List<Chamado> chamados = chamadoRepo.findAll();

        if (setor != null) {
            chamados = chamados.stream()
                    .filter(c -> c.getSetor().equalsIgnoreCase(setor))
                    .toList();
        }

        Map<String, Integer> prioridade = Map.of("TI", 1, "Financeiro", 2, "RH", 3);

        return chamados.stream()
                .sorted((c1, c2) -> Integer.compare(
                        prioridade.getOrDefault(c1.getSetor(), 99),
                        prioridade.getOrDefault(c2.getSetor(), 99)
                ))
                .toList();
    }

    // Excluir chamado
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirChamado(@PathVariable Long id) {
        if (chamadoRepo.existsById(id)) {
            chamadoRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Concluir chamado
    @PutMapping("/{id}/concluir")
    public ResponseEntity<Chamado> concluirChamado(@PathVariable Long id) {
        return chamadoRepo.findById(id)
                .map(chamado -> {
                    chamado.setStatus("CONCLUIDO");
                    chamado.setDataConclusao(LocalDateTime.now());
                    chamadoRepo.save(chamado);
                    return ResponseEntity.ok(chamado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Métricas
    @GetMapping("/metricas")
    public Map<String, Long> getMetricasDoDia() {
        LocalDate hoje = LocalDate.now();
        LocalDateTime inicio = hoje.atStartOfDay();
        LocalDateTime fim = hoje.atTime(LocalTime.MAX);

        long abertos = chamadoRepo.countByStatusAndDataCriacaoBetween("ABERTO", inicio, fim);
        long concluidos = chamadoRepo.countByStatusAndDataConclusaoBetween("CONCLUIDO", inicio, fim);

        Map<String, Long> metricas = new HashMap<>();
        metricas.put("abertos", abertos);
        metricas.put("concluidos", concluidos);

        return metricas;
    }

    // Adicionar comentário
    @PostMapping("/{id}/comentarios")
    public ResponseEntity<Comentario> adicionarComentario(@PathVariable Long id, @RequestBody Comentario comentario) {
        return chamadoRepo.findById(id)
                .map(chamado -> {
                    comentario.setChamado(chamado);
                    comentario.setDataCriacao(LocalDateTime.now());
                    Comentario salvo = comentarioRepo.save(comentario);
                    return ResponseEntity.ok(salvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Listar comentários
    @GetMapping("/{id}/comentarios")
    public ResponseEntity<List<Comentario>> listarComentarios(@PathVariable Long id) {
        return chamadoRepo.findById(id)
                .map(chamado -> ResponseEntity.ok(
                        chamado.getComentarios() != null ? chamado.getComentarios() : Collections.<Comentario>emptyList()
                ))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}

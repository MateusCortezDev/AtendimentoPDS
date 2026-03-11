package AtendimentoColaboradores.atendimento_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios") // prefixo de todas as rotas
@CrossOrigin(origins = "http://localhost:3000") // permite chamadas do frontend React
public class UsuarioController {

    @Autowired
    private UsuarioRepository repo;

    // Cadastro de usuário
    @PostMapping("/cadastro")
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        System.out.println("📌 Recebendo cadastro de usuário: " + usuario.getEmail());
        return repo.save(usuario);
    }

    // Login de usuário (valida e salva último login)
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario loginData) {

        System.out.println("🔑 Tentando login com email: " + loginData.getEmail());

        Usuario usuario = repo.findByEmail(loginData.getEmail());

        if (usuario != null) {

            System.out.println("Senha banco: " + usuario.getSenha());
            System.out.println("Senha enviada: " + loginData.getSenha());

            if (usuario.getSenha().equals(loginData.getSenha())) {
                usuario.setUltimoLogin(LocalDateTime.now());
                repo.save(usuario);
                return usuario;
            } else {
                System.out.println("❌ Senha incorreta");
            }
        }

        return null;
    }

    // Listar todos os usuários (apenas para teste/admin)
    @GetMapping
    public List<Usuario> listarUsuarios() {
        System.out.println("📋 Listando todos os usuários cadastrados");
        return repo.findAll();
    }
}

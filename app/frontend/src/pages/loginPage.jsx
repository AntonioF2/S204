import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Importe a função de login do serviço de API

const LoginPage = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os usuários cadastrados
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null); // Estado para o usuário selecionado
  const [error, setError] = useState(''); // Estado para mensagens de erro

  const navigate = useNavigate();

  // Função para carregar os usuários cadastrados (opcional, se ainda quiser usar a lista de usuários)
  useEffect(() => {
    const carregarUsuarios = async () => {
      const response = await fetch('http://localhost:5000/auth/usuarios');
      const data = await response.json();
      setUsuarios(data);
    };

    carregarUsuarios();
  }, []);

  const handleLogin = async () => {
    try {
      if (!usuarioSelecionado) {
        alert('Selecione um usuário!');
        return;
      }

      // Faz a chamada ao backend para autenticar o usuário
      const user = await login(usuarioSelecionado.matricula, senha);

      console.log('Login bem-sucedido:', user);
      navigate('/home', { state: { user } }); // Redireciona para a home com os dados do usuário
    } catch (error) {
      setError('Matrícula ou senha incorretas');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.form}>
        <select
          style={styles.select}
          value={usuarioSelecionado ? usuarioSelecionado.matricula : ''}
          onChange={(e) => {
            const usuario = usuarios.find((u) => u.matricula === e.target.value);
            setUsuarioSelecionado(usuario);
            setMatricula(usuario.matricula);
          }}
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.matricula} value={usuario.matricula}>
              {usuario.matricula} - {usuario.curso}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div style={{ height: '10px' }}></div>
        
        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>

        <div style={{ height: '40px' }}></div>

        <button onClick={() => navigate('/register')} style={styles.button}>
          Novo Usuário
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f0f0',
    margin: 0, // Remove margens
    padding: 0, // Remove paddings
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px', // Define uma largura máxima
    padding: '20px', // Padding interno
    backgroundColor: '#f0f0f0',
    boxSizing: 'border-box', // Garante que padding não aumente a largura
  },
  input: {
    marginBottom: '10px',
    padding: '12px', // Padding interno
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc', // Borda simples
    width: '100%',
    boxSizing: 'border-box', // Garante que padding e borda não aumentem a largura
  },
  select: {
    marginBottom: '10px',
    padding: '12px', // Padding interno
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc', // Borda simples
    width: '100%',
    backgroundColor: '#fff',
    boxSizing: 'border-box', // Garante que padding e borda não aumentem a largura
  },
  button: {
    padding: '12px', // Padding interno
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%', // Ocupa 100% da largura do form
    marginBottom: '10px', // Adiciona margem inferior para espaçamento entre os botões
    boxSizing: 'border-box', // Garante que padding e borda não aumentem a largura
  },
};

export default LoginPage;
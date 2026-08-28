import { useEffect, useState } from 'react';
import type {FormEvent} from 'react'


interface Produto {
  id: number;
  nome: string;
  descricao: string;
  createdAt: string;
}

export function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://compnuvem-atv-alwaysdata.onrender.com';

  const carregarProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (err: any) {
      setErro(err.message || 'Falha na conexão com a API');
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!nome || !descricao) return;

    setLoading(true);
    setErro('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao }),
      });

      if (!response.ok) throw new Error('Erro ao salvar produto');

      setNome('');
      setDescricao('');
      await carregarProdutos();
    } catch (err: any) {
      setErro(err.message || 'Erro ao realizar o insert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h2>Atividade Computação em Nuvem (AlwaysData)</h2>

      {erro && <div style={{ color: 'red', marginBottom: '15px' }}>{erro}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <h3>Inserir Novo Registro</h3>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Cadastrando...' : 'Cadastrar (INSERT)'}
        </button>
      </form>

      <hr />

      <h3>Registros Cadastrados no Banco (SELECT)</h3>
      {produtos.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {produtos.map((p) => (
            <li key={p.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <strong>#{p.id} - {p.nome}</strong>
              <p style={{ margin: '5px 0 0 0', color: '#555' }}>{p.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

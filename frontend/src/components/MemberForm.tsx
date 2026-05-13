import { useState, useEffect } from 'react';
import { Member, MemberRequest } from '../types/member';
import { formatCpf } from '../hooks/useCpf';

interface Props {
  onSubmit: (data: MemberRequest) => Promise<void>;
  onCancel: () => void;
  initial?: Member | null;
}

const EMPTY: MemberRequest = { name: '', cpf: '', birthDate: '', active: true };

export default function MemberForm({ onSubmit, onCancel, initial }: Props) {
  const [form, setForm] = useState<MemberRequest>(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        cpf: formatCpf(initial.cpf),
        birthDate: initial.birthDate,
        active: initial.active,
      });
    } else {
      setForm(EMPTY);
    }
  }, [initial]);

  const handleCpf = (value: string) => {
    setForm(f => ({ ...f, cpf: formatCpf(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ ...form, cpf: form.cpf.replace(/\D/g, '') });
      setForm(EMPTY);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{initial ? 'Editar membro' : 'Novo membro'}</h2>
          <button className="btn-close" onClick={onCancel} aria-label="Fechar">×</button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="João da Silva"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={e => handleCpf(e.target.value)}
              maxLength={14}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="birthDate">Data de nascimento</label>
            <input
              id="birthDate"
              type="date"
              value={form.birthDate}
              onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))}
              required
            />
          </div>

          <div className="field-row">
            <label className="toggle-label">
              <div className={`toggle ${form.active ? 'toggle--on' : ''}`}
                onClick={() => setForm(f => ({ ...f, active: !f.active }))}>
                <span className="toggle-thumb" />
              </div>
              <span>{form.active ? 'Membro ativo' : 'Membro inativo'}</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : initial ? 'Salvar alterações' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

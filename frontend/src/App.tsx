import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Member, MemberRequest } from './types/member';
import { memberService, extractApiError } from './services/api';
import MemberForm from './components/MemberForm';
import MemberCard from './components/MemberCard';
import EmptyState from './components/EmptyState';
import './App.css';

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } catch {
      toast.error('Falha ao carregar membros');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleCreate = async (data: MemberRequest) => {
    try {
      const created = await memberService.create(data);
      setMembers(prev => [...prev, created]);
      toast.success('Membro cadastrado com sucesso!');
      setShowForm(false);
    } catch (err) {
      toast.error(extractApiError(err));
      throw err;
    }
  };

  const handleUpdate = async (data: MemberRequest) => {
    if (!editing) return;
    try {
      const updated = await memberService.update(editing.id, data);
      setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
      toast.success('Membro atualizado!');
      setEditing(null);
    } catch (err) {
      toast.error(extractApiError(err));
      throw err;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir este membro?')) return;
    try {
      await memberService.remove(id);
      setMembers(prev => prev.filter(m => m.id !== id));
      toast.success('Membro removido');
    } catch (err) {
      toast.error(extractApiError(err));
    }
  };

  const openEdit = (member: Member) => {
    setEditing(member);
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const activeCount = members.filter(m => m.active).length;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
          duration: 3500,
        }}
      />

      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-dot" />
            <h1>Membros</h1>
          </div>
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditing(null); }}>
            + Novo membro
          </button>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {!loading && members.length > 0 && (
            <div className="stats">
              <div className="stat">
                <span className="stat-value">{members.length}</span>
                <span className="stat-label">total</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-value">{activeCount}</span>
                <span className="stat-label">ativos</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-value">{members.length - activeCount}</span>
                <span className="stat-label">inativos</span>
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading">Carregando...</div>
          ) : members.length === 0 ? (
            <EmptyState onAdd={() => setShowForm(true)} />
          ) : (
            <div className="members-grid">
              {members.map(member => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {(showForm || editing) && (
        <MemberForm
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={closeForm}
          initial={editing}
        />
      )}
    </>
  );
}

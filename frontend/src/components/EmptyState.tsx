interface Props {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: Props) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M24 16v16M16 24h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="empty-title">Nenhum membro cadastrado</p>
      <p className="empty-subtitle">Comece adicionando o primeiro membro ao sistema.</p>
      <button className="btn btn-primary" onClick={onAdd}>
        Adicionar membro
      </button>
    </div>
  );
}

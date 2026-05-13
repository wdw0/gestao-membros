import { Member } from '../types/member';
import { displayCpf } from '../hooks/useCpf';

interface Props {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function MemberCard({ member, onEdit, onDelete }: Props) {
  return (
    <div className="member-card">
      <div className="member-card__header">
        <div className="member-avatar">
          {member.name.charAt(0).toUpperCase()}
        </div>
        <div className="member-info">
          <span className="member-name">{member.name}</span>
          <span className="member-cpf">{displayCpf(member.cpf)}</span>
        </div>
        <span className={`badge ${member.active ? 'badge--active' : 'badge--inactive'}`}>
          {member.active ? 'Ativo' : 'Inativo'}
        </span>
      </div>

      <div className="member-card__footer">
        <span className="member-date">Nascimento: {formatDate(member.birthDate)}</span>
        <div className="member-actions">
          <button className="btn-action btn-action--edit" onClick={() => onEdit(member)}>
            Editar
          </button>
          <button className="btn-action btn-action--delete" onClick={() => onDelete(member.id)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

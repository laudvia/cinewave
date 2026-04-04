import type { TitleItem } from '../types';

interface DetailsPanelProps {
  item: TitleItem | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (id: number) => void;
}

export function DetailsPanel({ item, isFavorite, onClose, onToggleFavorite }: DetailsPanelProps) {
  if (!item) {
    return null;
  }

  return (
    <div className="details-overlay" role="dialog" aria-modal="true">
      <div className="details-panel">
        <button type="button" className="details-panel__close" onClick={onClose}>
          ×
        </button>

        <div className="details-panel__poster" style={{ background: item.accent }}>
          {item.poster}
        </div>

        <div className="details-panel__content">
          <span className="details-panel__badge">{item.category}</span>
          <h2>{item.name}</h2>
          <p className="details-panel__original">{item.originalName}</p>
          <p className="details-panel__description">{item.description}</p>

          <div className="details-panel__grid">
            <div>
              <span>Год</span>
              <strong>{item.year}</strong>
            </div>
            <div>
              <span>Рейтинг</span>
              <strong>★ {item.rating.toFixed(1)}</strong>
            </div>
            <div>
              <span>Страна</span>
              <strong>{item.country}</strong>
            </div>
            <div>
              <span>Длительность</span>
              <strong>{item.duration}</strong>
            </div>
          </div>

          <div className="card__chips card__chips--spacious">
            {item.genres.map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <button type="button" className="button details-panel__button" onClick={() => onToggleFavorite(item.id)}>
            {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
    </div>
  );
}

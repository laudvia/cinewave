import type { TitleItem } from '../types';

interface MovieCardProps {
  item: TitleItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (item: TitleItem) => void;
}

export function MovieCard({ item, isFavorite, onToggleFavorite, onOpenDetails }: MovieCardProps) {
  return (
    <article className="card">
      <div className="card__poster" style={{ background: item.accent }}>
        <span>{item.poster}</span>
        <small>{item.category}</small>
      </div>

      <div className="card__content">
        <div className="card__topline">
          <span>{item.year}</span>
          <span>★ {item.rating.toFixed(1)}</span>
        </div>

        <div>
          <h3>{item.name}</h3>
          <p className="card__original">{item.originalName}</p>
        </div>

        <p className="card__tagline">{item.tagline}</p>

        <div className="card__chips">
          {item.genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>

        <div className="card__meta">
          <span>{item.country}</span>
          <span>{item.duration}</span>
        </div>

        <div className="card__actions">
          <button type="button" className="button button--ghost" onClick={() => onOpenDetails(item)}>
            Подробнее
          </button>
          <button type="button" className="button" onClick={() => onToggleFavorite(item.id)}>
            {isFavorite ? 'Убрать из избранного' : 'В избранное'}
          </button>
        </div>
      </div>
    </article>
  );
}

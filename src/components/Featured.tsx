import type { TitleItem } from '../types';

interface FeaturedProps {
  item: TitleItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (item: TitleItem) => void;
}

export function Featured({ item, isFavorite, onToggleFavorite, onOpenDetails }: FeaturedProps) {
  return (
    <section className="featured" style={{ background: item.accent }}>
      <div className="featured__content">
        <span className="featured__badge">Мой выбор недели</span>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <div className="featured__meta">
          <span>{item.category}</span>
          <span>{item.year}</span>
          <span>★ {item.rating.toFixed(1)}</span>
          <span>{item.duration}</span>
        </div>
        <div className="featured__actions">
          <button type="button" className="button button--light" onClick={() => onOpenDetails(item)}>
            Открыть карточку
          </button>
          <button type="button" className="button button--outline" onClick={() => onToggleFavorite(item.id)}>
            {isFavorite ? 'Уже в избранном' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
      <div className="featured__poster">{item.poster}</div>
    </section>
  );
}

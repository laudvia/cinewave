import type { Category, Genre } from '../types';

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: 'Все' | Category;
  onCategoryChange: (value: 'Все' | Category) => void;
  genre: 'Все' | Genre;
  onGenreChange: (value: 'Все' | Genre) => void;
  sortBy: 'rating' | 'year' | 'name';
  onSortByChange: (value: 'rating' | 'year' | 'name') => void;
}

const genres: Array<'Все' | Genre> = [
  'Все',
  'Драма',
  'Фантастика',
  'Триллер',
  'Комедия',
  'Анимация',
  'Детектив',
  'Приключения',
  'Фэнтези',
];

export function Filters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  genre,
  onGenreChange,
  sortBy,
  onSortByChange,
}: FiltersProps) {
  return (
    <section className="filters">
      <label className="filters__search">
        <span>Поиск</span>
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Например: триллер, космос, драма"
        />
      </label>

      <label>
        <span>Формат</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value as 'Все' | Category)}>
          <option value="Все">Все</option>
          <option value="Фильм">Фильмы</option>
          <option value="Сериал">Сериалы</option>
        </select>
      </label>

      <label>
        <span>Жанр</span>
        <select value={genre} onChange={(event) => onGenreChange(event.target.value as 'Все' | Genre)}>
          {genres.map((genreOption) => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Сортировка</span>
        <select value={sortBy} onChange={(event) => onSortByChange(event.target.value as 'rating' | 'year' | 'name')}>
          <option value="rating">Сначала с высоким рейтингом</option>
          <option value="year">Сначала новые</option>
          <option value="name">По названию</option>
        </select>
      </label>
    </section>
  );
}

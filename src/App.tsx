import { useMemo, useState } from 'react';
import { DetailsPanel } from './components/DetailsPanel';
import { Featured } from './components/Featured';
import { Filters } from './components/Filters';
import { Header } from './components/Header';
import { MovieCard } from './components/MovieCard';
import { titles } from './data/titles';
import type { Category, Genre, TitleItem } from './types';

const FAVORITES_KEY = 'cinewave-favorites-v1';

function getStoredFavorites(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = window.localStorage.getItem(FAVORITES_KEY);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as number[];
  } catch {
    return [];
  }
}

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'Все' | Category>('Все');
  const [genre, setGenre] = useState<'Все' | Genre>('Все');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'name'>('rating');
  const [activeItem, setActiveItem] = useState<TitleItem | null>(titles[0]);
  const [favorites, setFavorites] = useState<number[]>(getStoredFavorites);

  const filteredTitles = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...titles]
      .filter((item) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          item.name.toLowerCase().includes(normalizedSearch) ||
          item.originalName.toLowerCase().includes(normalizedSearch) ||
          item.description.toLowerCase().includes(normalizedSearch) ||
          item.genres.some((itemGenre) => itemGenre.toLowerCase().includes(normalizedSearch));

        const matchesCategory = category === 'Все' || item.category === category;
        const matchesGenre = genre === 'Все' || item.genres.includes(genre);

        return matchesSearch && matchesCategory && matchesGenre;
      })
      .sort((left, right) => {
        if (sortBy === 'rating') return right.rating - left.rating;
        if (sortBy === 'year') return right.year - left.year;
        return left.name.localeCompare(right.name, 'ru');
      });
  }, [category, genre, search, sortBy]);

  const featuredItem = filteredTitles[0] ?? titles[0];

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((currentId) => currentId !== id) : [...current, id];
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="page-shell">
      <div className="page-glow page-glow--left" />
      <div className="page-glow page-glow--right" />

      <main className="container">
        <Header total={titles.length} favoritesCount={favorites.length} />

        <Featured
          item={featuredItem}
          isFavorite={favorites.includes(featuredItem.id)}
          onToggleFavorite={toggleFavorite}
          onOpenDetails={setActiveItem}
        />

        <Filters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          genre={genre}
          onGenreChange={setGenre}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        <section className="section-heading">
          <div>
            <h2>Моя подборка</h2>
            <p>Я собрал здесь фильмы и сериалы, которые хочется открыть вечером без долгих поисков.</p>
          </div>
          <span>{filteredTitles.length} найдено</span>
        </section>

        <section className="grid">
          {filteredTitles.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
              onOpenDetails={setActiveItem}
            />
          ))}
        </section>

        {filteredTitles.length === 0 ? (
          <section className="empty-state">
            <h3>Ничего не нашлось</h3>
            <p>Я не нашёл совпадений по этому запросу. Можно очистить фильтры и посмотреть всю коллекцию.</p>
          </section>
        ) : null}
      </main>

      <DetailsPanel
        item={activeItem}
        isFavorite={activeItem ? favorites.includes(activeItem.id) : false}
        onClose={() => setActiveItem(null)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

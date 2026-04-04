interface HeaderProps {
  total: number;
  favoritesCount: number;
}

export function Header({ total, favoritesCount }: HeaderProps) {
  return (
    <header className="hero">
      <div>
        <span className="hero__badge">Каталог фильмов и сериалов</span>
        <h1>Я собрал для себя яркую онлайн-библиотеку для уютного просмотра.</h1>
        <p>
          Здесь я могу быстро найти фильм или сериал по настроению, жанру и формату,
          а ещё сохранить понравившиеся тайтлы в избранное.
        </p>
      </div>
      <div className="hero__stats">
        <article>
          <strong>{total}</strong>
          <span>Карточек в каталоге</span>
        </article>
        <article>
          <strong>{favoritesCount}</strong>
          <span>У меня в избранном</span>
        </article>
      </div>
    </header>
  );
}

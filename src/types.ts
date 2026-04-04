export type Category = 'Фильм' | 'Сериал';
export type Genre =
  | 'Драма'
  | 'Фантастика'
  | 'Триллер'
  | 'Комедия'
  | 'Анимация'
  | 'Детектив'
  | 'Приключения'
  | 'Фэнтези';

export interface TitleItem {
  id: number;
  name: string;
  originalName: string;
  category: Category;
  year: number;
  rating: number;
  duration: string;
  genres: Genre[];
  country: string;
  tagline: string;
  description: string;
  accent: string;
  poster: string;
}

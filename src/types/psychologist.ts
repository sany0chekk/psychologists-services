export interface Psychologist {
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
  }[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export interface IQuery {
  q: string;
  category: string[];
  provider: string[];
  sort: {
    column: string;
    direction: string;
  }
}

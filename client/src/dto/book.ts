export interface IBookDTO {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  publicationYear?: string;
}

export interface IBookResponseDTO {
  results: IBookDTO[];
  totalPage: number;
}

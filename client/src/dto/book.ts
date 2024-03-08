export interface IBookDTO {
  id: number;
  title: string;
  author?: string;
  isbn?: string;
  publicationYear?: string;
}

export interface IBookDTOWithPage {
  results: IBookDTO[];
  totalPage: number;
}

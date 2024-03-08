export interface IBookRequestDTO {
  id?: string;
  title: string;
  author?: string;
  isbn?: string;
  publicationYear?: string;
}

export interface IBookResponseDTO {
  id: string;
  title: string;
  author?: string;
  isbn?: string;
  publicationYear?: string;
}

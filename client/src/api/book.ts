import axios from "axios";
import { IBookDTO, IBookResponseDTO } from "../dto/book";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api/v1",
});

export const getBooks = async (
  skip: number = 0,
  limit: number = 10
): Promise<IBookResponseDTO> => {
  const response = await httpClient.get(`/books?skip=${skip}&limit=${limit}`);

  return { results: response.data.results, totalPage: response.data.totalPage };
};

export const getBook = async (id: string): Promise<IBookDTO> => {
  const response = await httpClient.get(`/books/${id}`);

  return response.data.results;
};

export const createBook = async (data: IBookDTO): Promise<IBookDTO> => {
  const response = await httpClient.post("/books", data);

  return response.data.results;
};

export const updateBook = async (
  id: string,
  data: IBookDTO
): Promise<IBookDTO> => {
  const response = await httpClient.put(`/books/${id}`, data);

  return response.data.results;
};

export const deleteBook = async (id: string) => {
  await httpClient.delete(`/books/${id}`);
};

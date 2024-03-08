import axios from "axios";
import { IBookRequestDTO, IBookResponseDTO } from "../dto/book";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api/v1",
});

export const getBooks = async (): Promise<IBookResponseDTO[]> => {
  const response = await httpClient.get("/books");

  return response.data.results;
};

export const getBook = async (id: string) => {
  const response = await httpClient.get(`/books/${id}`);

  return response.data.results;
};

export const createBook = async (data: IBookRequestDTO) => {
  const response = await httpClient.post("/books", data);

  return response.data.results;
};

export const updateBook = async (id: string, data: IBookRequestDTO) => {
  const response = await httpClient.put(`/books/${id}`, data);

  return response.data.results;
};

export const deleteBook = async (id: string) => {
  await httpClient.delete(`/books/${id}`);
};

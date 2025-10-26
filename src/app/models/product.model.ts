export interface ProductAttributes {
  name: string;
  description?: string;
  price?: number;
  [key: string]: any;
}

export interface JsonApiData<T> {
  type: string;
  id: string;
  attributes: T;
}

export interface JsonApiResponse<T> {
  data: T | T[];
  meta?: any;
}

export interface ProductDto {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

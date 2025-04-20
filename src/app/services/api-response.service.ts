import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ShortenedUrlResponse } from '../models/ShortenedUrlResponse';
@Injectable({
  providedIn: 'root'
})
export class ApiResponseService {

  private readonly apiUrl = 'https://encurtador-url-8lqz.onrender.com/shorten-url';

  constructor(private http: HttpClient) {}

  async shortenUrl(url: string): Promise<ShortenedUrlResponse> {
    try {
      return await firstValueFrom(
        this.http.post<ShortenedUrlResponse>(this.apiUrl, { url })
      );
    } catch (error) {
      console.error('Erro na chamada da API:', error);
      throw new Error('Erro ao encurtar a URL');
    }
  }

}

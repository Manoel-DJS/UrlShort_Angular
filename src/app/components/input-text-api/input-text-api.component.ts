import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ApiResponseService } from '../../services/api-response.service';
import { ShortenedUrlResponse } from '../../models/ShortenedUrlResponse';

@Component({
  selector: 'app-input-text-api',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-text-api.component.html',
  styleUrl: './input-text-api.component.scss'
})
export class InputTextApiComponent {

  userInput: string = '';
  apiResponse: ShortenedUrlResponse | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private ApiResponseService : ApiResponseService ) {}

  async sendToApi() {
    if (!this.userInput.trim()) {
      this.errorMessage = 'Por favor, digite algo antes de enviar';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.apiResponse = null;

    try {
      this.apiResponse = await this.ApiResponseService.shortenUrl(this.userInput);
    } catch (error: any) {
      this.errorMessage = error.message || 'Erro desconhecido';
    } finally {
      this.isLoading = false;
    }
  }

  
  copied: boolean = false;
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = true;
      console.log('Erro ao copiar:', this.apiResponse?.url)
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar:', err);
      this.errorMessage = 'Não foi possível copiar a URL';
    });
  }

}

/** 

  userInput: string = '';
  apiResponse: any; // substitua "YourExpectedType" pelo tipo real esperado
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }

  async sendToApi() {
    if (!this.userInput.trim()) {
      this.errorMessage = 'Por favor, digite algo antes de enviar';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.apiResponse = null;

    try {
      // Substitua pela URL da sua API real
      // const apiUrl = 'http://localhost:8080/shorten-url';
      const apiUrl = 'https://encurtador-url-8lqz.onrender.com/shorten-url';
      //this.apiResponse = await this.http.post(apiUrl, { url: this.userInput}).toPromise();
      this.apiResponse = await firstValueFrom(
        this.http.post(apiUrl, { url: this.userInput })
      );
    } catch (error) {
      console.error('Erro na requisição:', error);
      this.errorMessage = 'Ocorreu um erro ao chamar a API';
    } finally {
      this.isLoading = false;
    }
  }

  copied = false;
  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar:', err);
      this.errorMessage = 'Não foi possível copiar a URL';
    });
  }

**/

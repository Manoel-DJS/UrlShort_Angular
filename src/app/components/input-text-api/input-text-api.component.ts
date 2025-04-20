import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timer } from 'rxjs';
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
      timer(2000).subscribe(() => this.copied = false);
    }).catch(err => {
      console.error('Erro ao copiar:', err);
      this.errorMessage = 'Não foi possível copiar a URL';
    });
  }

}

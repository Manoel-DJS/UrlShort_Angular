import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-input-text-api',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-text-api.component.html',
  styleUrl: './input-text-api.component.scss'
})
export class InputTextApiComponent {

  userInput = '';
  apiResponse: any;
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

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
      const apiUrl = 'http://localhost:8080/shorten-url';
      
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


}

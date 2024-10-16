import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';  // Importa o arquivo de ambiente
import { ToastController } from '@ionic/angular';
import { ApiResponse } from '../models/api-response';
import { firstValueFrom } from 'rxjs'; // Importa a função para converter observable em promise

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private axiosClient: AxiosInstance;

  constructor(
    private toastController: ToastController,
    private afAuth: AngularFireAuth
  ) {
    this.axiosClient = axios.create({
      baseURL: environment.ApiBaseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async get<T>(endpoint: string, anonimous: boolean = false): Promise<T | null> {
    try {
      if (!anonimous) {
        var v = await this.applicationAuthorization();
        if (v === false) return null;
      }

      const response = await this.axiosClient.get<ApiResponse<T>>(endpoint);
      if (!response.data.success)
        throw new Error(response.data.errorMessage || "");

      return response.data.data;
    } catch (error) {
      var responseError = error as AxiosError<ApiResponse<T>>;
      console.log(responseError);
      this.showToast(responseError.response?.data.errorMessage || "");
      return null;
    }
  }

  async post<T>(endpoint: string, data: any, anonimous: boolean = false): Promise<T | null> {
    try {
      if (!anonimous) {
        var v = await this.applicationAuthorization();
        if (v === false) return null;
      }

      const response = await this.axiosClient.post<ApiResponse<T>>(endpoint, data);
      return response.data.data;
    } catch (error) {
      var responseError = error as AxiosError<ApiResponse<T>>;
      console.log(responseError);
      this.showToast(responseError.response?.data.errorMessage || "");
      return null;
    }
  }

  async postFormData<T>(endpoint: string, data: FormData, anonimous: boolean = false): Promise<T | null> {
    try {
      if (!anonimous) {
        var v = await this.applicationAuthorization();
        if (v === false) return null;
      }
console.log(data);
      const response: AxiosResponse<T> = await this.axiosClient.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    } catch (error) {
      var responseError = error as AxiosError<ApiResponse<T>>;
      this.showToast(responseError.response?.data.errorMessage || "");
      return null;
    }
  }

  async put<T>(endpoint: string, data: any, anonimous: boolean = false): Promise<T | null> {
    try {
      if (!anonimous) {
        var v = await this.applicationAuthorization();
        if (v == null) return null;
      }
      const response: AxiosResponse<T> = await this.axiosClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      var responseError = error as AxiosError<ApiResponse<T>>;
      this.showToast(responseError.response?.data.errorMessage || "");
      return null;
    }
  }

  async delete<T>(endpoint: string, data: any, anonimous: boolean = false): Promise<T | null> {
    try {
      if (!anonimous) {
        var v = await this.applicationAuthorization();
        if (v == null) return null;
      }
      const response: AxiosResponse<T> = await this.axiosClient.delete(endpoint, data);
      return response.data;
    } catch (error) {
      var responseError = error as AxiosError<ApiResponse<T>>;
      this.showToast(responseError.response?.data.errorMessage || "");
      return null;
    }
  }

  public registerHeader(token: string) {
    this.axiosClient.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }



  private async applicationAuthorization(): Promise<boolean> {
    const user = await firstValueFrom(this.afAuth.user);
    if (user) {
      var e = await user.getIdToken();
      this.registerHeader(e);
      return true;
    } else {
      return false;
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { ApiServiceService } from '../services/api-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.page.html',
  styleUrls: ['./pet-register.page.scss'],
})
export class PetRegisterPage implements OnInit {
  public imageBase64: string = "";
  private type: string = "";

  public nome?: string;
  public descricao?: string;
  public status?: string;
  public localizacao?: string;
  public load: boolean = false;

  constructor(private route: Router,
    private api: ApiServiceService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras) {
      var image: Photo | null = navigation.extras.state!["imageBase64"];
      if (image != null) {
        const mimeType = image.format === 'png' ? 'image/png' : 'image/jpeg';
        const base64Image = `data:${mimeType};base64,${image.base64String}`;
        this.imageBase64 = base64Image;
      }
    }
  }


  async back() {
    await this.route.navigate(["tabs/tab1"], {});
  }

  async register() {
    const form = new FormData();
    try {
      this.load = true;
      console.log(this.nome, this.descricao, this.status);
      if (!this.nome || !this.status) throw new Error("Preenche os campos obrigatórios.");
      var file = this.base64ToFile(this.imageBase64, this.type);

      form.append("img", file, "thumb");
      form.append("apelido", this.nome);
      form.append("descricao", this.descricao ?? "");
      form.append("localizacao", this.localizacao ?? "");
      form.append("status", this.status);

      await this.api.postFormData("pet/find/register", form);
      this.load = false;
      const toast = await this.toast.create({
        message: "Pet cadastrado com sucesso!",
        position: 'bottom',
        color: 'success',
        duration: 3000
      })
      toast.present();

      await this.route.navigate(["tabs/tab1"])

    } catch (error) {
      var errorString = error as string;
      await this.toast.create({
        message: errorString,
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      })
    }
  }

  private base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(','); // Divide a string em duas partes
    const mime = arr[0].match(/:(.*?);/)?.[1]; // Obtém o tipo MIME
    const bstr = atob(arr[1]); // Decodifica a parte base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n); // Converte para um array de bytes
    }

    return new File([u8arr], filename, { type: mime }); // Cria um objeto File
  }

}

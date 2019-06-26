import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public baseUrl = "http://172.20.10.4/slim/public/";
  // public baseUrl = "http://localhos/slim/public/";
  constructor(private toastCtrl: ToastController) { };

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  
}
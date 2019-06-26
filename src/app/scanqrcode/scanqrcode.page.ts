import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scanqrcode',
  templateUrl: './scanqrcode.page.html',
  styleUrls: ['./scanqrcode.page.scss'],
})
export class ScanqrcodePage {

  zbarOptions:any;
  scannedResult:any;
  name = "";
  username = "";
  userId = null;
 
  constructor(
    private zbar: ZBar, private global: GlobalService, private storage: Storage, private navCtrl: NavController, private http: HttpClient
  ) {
 
    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }

    this.storage.get('name').then((val) => {
      if(val != null){
        this.name = val;
      }else{
        this.navCtrl.navigateRoot("");
      }
    });

    this.storage.get('username').then((val) => {
      if(val != null){
        this.username = val;
      }else{
        this.navCtrl.navigateRoot("");
      }
    });

    this.storage.get('userId').then((val) => {
      if(val != null){
        this.userId = val;
      }else{
        this.navCtrl.navigateRoot("");
      }
    });
 
  }
 
  scanCode(){
    this.zbar.scan(this.zbarOptions)
   .then(result => {
      this.save(result);
   })
   .catch(error => {
      // alert(error); // Error message
      this.global.presentToast(error);
   });
  }

  save(result){
    this.http.post(this.global.baseUrl+"api/checkcourse", {userId: this.userId, course: result}).subscribe(res => {
      let data = JSON.stringify(res);
      let response = JSON.parse(data);
      if(response.result){
        this.global.presentToast("เข้าเรียนแล้ว");
      }else{
        // เข้าสูเระบบไม่สำเร็จ
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private global:GlobalService,
    private storage: Storage
 
  ) { }

  ngOnInit() {
    this.storage.get('userId').then((val) => {
      if(val != null){
        this.navCtrl.navigateRoot("/scanqrcode");
      }
    });
    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
  'id': [
      { type: 'required', message: 'ต้องระบุ ID ชื่อผู้ใช้ ' },
      { type: 'minlength', message: 'จะต้องมีความยาวอย่างน้อย 8 ตัวอักษร ' }
    ],
    'password': [
      { type: 'required', message: 'ต้องการรหัสผ่าน.' },
      { type: 'minlength', message: 'รหัสผ่านจะต้องมีความยาวอย่างน้อย 5 ตัวอักษร' }
    ]
  };

  loginUser(value){
      this.http.post(this.global.baseUrl+"api/login", value).subscribe(res => {
        let data = JSON.stringify(res);
        let response = JSON.parse(data);
        if(response.result){
          this.storage.set('userId', response.result.userId);
          this.storage.set('name', response.result.name);
          this.storage.set('username', response.result.username);
          this.global.presentToast("เข้าสู่ระบบสำเร็จ");
          this.navCtrl.navigateRoot('scanqrcode');
        }else{
          this.global.presentToast("เข้าสู่ระบบไม่สำเร็จ"); 
        }
      });
  }

}

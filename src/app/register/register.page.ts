import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  validation_messages = {
  'id': [
    { type: 'required', message: 'ต้องระบุ ID ชื่อผู้ใช้ ' },
    { type: 'pattern', message: 'จะต้องมีความยาวอย่างน้อย 8 ตัวอักษร ' }
  ],
  'name': [
    { type: 'required', message: 'ต้องระบุชื่อผู้ใช้.' },
    { type: 'minlength', message: 'กรุณาใส่ชื่อผู้ใช้ที่ถูกต้อง' }
  ],
  'password': [
    { type: 'required', message: 'ต้องการรหัสผ่าน.' },
    { type: 'minlength', message: 'รหัสผ่านจะต้องมีความยาวอย่างน้อย 5 ตัวอักษร' }
  ]
 };
 
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(){
    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[ก-ฮ_.+-]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }
 

}

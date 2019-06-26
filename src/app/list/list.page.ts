import { Storage } from '@ionic/storage';
import { GlobalService } from './../global.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list = [];
  constructor(private storage:Storage, private http: HttpClient, private global: GlobalService) { }

  ngOnInit() {
    this.storage.get('userId').then((val) => {
      if(val != null){
        this.getAllCheckCourse(val)
      }
    });
  }

  getAllCheckCourse(userId){
    this.http.get(this.global.baseUrl+"api/getCheckCourse?userId="+userId).subscribe(res => {
      let data = JSON.stringify(res);
      let response = JSON.parse(data);
      if(response.result){
        this.list = response.result;
        // console.log(response.result);
        // เข้าสูเระบบไม่สำเร็จ
      }
    });
  }

}

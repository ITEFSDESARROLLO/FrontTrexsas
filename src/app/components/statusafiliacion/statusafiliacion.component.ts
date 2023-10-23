import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statusafiliacion',
  templateUrl: './statusafiliacion.component.html',
  styleUrls: ['./statusafiliacion.component.css']
})
export class StatusafiliacionComponent implements OnInit {
  res:any={};
  param:string="";
  constructor(private LoginService:LoginService,private router:Router,private route:ActivatedRoute) {
    this.param = this.route.snapshot.params['id'];
    this.LoginService.obtenerestAfiliacion(this.param).subscribe(
      (res: any) => {
      this.res=res;
      console.log(res);
      },
      err=>{
        this.res.mensaje=3
      }
    );
   }

  ngOnInit(): void {
  }


}

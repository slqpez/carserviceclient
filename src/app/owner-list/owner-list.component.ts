import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../shared/owner/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners:Array<any>;
  ownersChecked:Array<any> =[];
  constructor(private ownerService:OwnerService, route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe((resp:any)=>{
      this.owners = resp._embedded.owners;
      console.log(this.owners);
    })
  }


  ownersChecks(href:string,e){
    console.log(e.target.checked);
    if(e.target.checked){
      this.ownersChecked.push(href);
    }else{ 
      this.ownersChecked.map((values,i)=>{
        if(values === href){
            this.ownersChecked.splice(i,1);
        }
      })
    }
  
    console.log(this.ownersChecked);
  }
  
   deleteOWners(){
     this.ownerService.removeOWners(this.ownersChecked).subscribe((resp)=>{
       console.log(resp);
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/owner-list']);
     })
   } 
}

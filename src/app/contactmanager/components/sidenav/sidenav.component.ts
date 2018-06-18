import { Component, OnInit,NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
const SMALL_WIDTH_BREAKPPOINT =720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaCatcher : MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPPOINT}px)`);

  users: Observable<User[]>;

  constructor(zone : NgZone, private userService: UserService, private router: Router) {
    this.mediaCatcher.addListener(mql =>
    zone.run(()=>this.mediaCatcher = mql));
   }

   @ViewChild(MatSidenav) sidenav : MatSidenav;

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(()=>{
      if(this.isScreenSmall())
        this.sidenav.close();
    })
  }

  isScreenSmall() : boolean{
      return this.mediaCatcher.matches;
  }

}

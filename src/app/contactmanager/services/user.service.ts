import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private datastore: {
    users: User[]
  }

  constructor(private http: HttpClient) {
    this.datastore = { users: []};
    this._users = new BehaviorSubject<User[]>([]);
   }

   get users(): Observable<User[]>{
     return this._users.asObservable();
   }

   userById(id:number){
     return this.datastore.users.find(x => x.id == id);
   }


   loadAll(){
     const useUrl="https://angular-material-api.azurewebsites.net/users";

     return this.http.get<User[]>(useUrl)
     .subscribe(data=>{
       this.datastore.users = data;
       this._users.next(Object.assign({}, this.datastore).users);
     },error => {
       console.log("Failed to load");
     });
   }

}

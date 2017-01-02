import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {User} from '../Users';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    constructor(private http: Http){

    }

    getUsers(){
        return this.http.get('http://localhost:8080/users')
                .map((res:Response) => res.json());
    }

}

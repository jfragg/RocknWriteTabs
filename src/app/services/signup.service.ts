import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService{
    constructor(private http:Http){
        console.log('Task Service is Initialized...');
    }

    getUsers(){
        return this.http.get('http://localhost:8080/users')
                .map((res:Response) => res.json());
    }

    addUser(newUser){

        let enc = btoa(btoa(newUser.password));
        newUser.password = enc;

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/users', JSON.stringify(newUser), {headers: headers})
            .map(res => res.json());
    }

    deleteUser(id){
        return this.http.delete('http://localhost:8080/users/' + id)
            .map(res=>res.json());
    }
}

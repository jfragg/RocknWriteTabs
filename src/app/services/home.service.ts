import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HomeService{
    constructor(private http:Http){
        console.log('Task Service is Initialized...');
    }

    getTabs(){
        return this.http.get('http://localhost:8080/tabs')
                .map((res:Response) => res.json());
    }

    getTab(id) {
        return this.http.get('http://localhost:8080/tabs/' + id)
            .map((res:Response) => res.json());
    }

}
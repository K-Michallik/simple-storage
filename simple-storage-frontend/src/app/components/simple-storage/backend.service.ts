import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private readDataSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public readonly readData$: Observable<string | null> = this.readDataSubject.asObservable();

    private writeDataSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public readonly writeData$: Observable<string | null> = this.readDataSubject.asObservable();

    constructor(private http: HttpClient) {}


    // echoServer(url: string, ip: string, port: string, message:string): void {
    //     const fullUrl = 'http://' + url + `/connect?ip=${ip}&port=${port}&message=${encodeURIComponent(message)}`;
    //     this.http.get<{ response: string }>(fullUrl).subscribe({
    //       next: (serverResponse) => {
    //         console.log(`Server response received: ${JSON.stringify(serverResponse)}`);
    //         this.echoSubject.next(serverResponse.response);
    //       },
    //       error: (error) => {
    //         console.error(`Error connecting to server: ${error}`);
    //         this.echoSubject.next('Error connecting to server. Is the server running?');
    //       }
    //     });
    //   }

    readData(url: string): void {
        const fullUrl = 'http://' + url + `/read`;
        this.http.get<{contents: string}>(fullUrl).subscribe({
            next: (serverResponse) => {
                console.log(`Server response received: ${JSON.stringify(serverResponse)}`);
                this.readDataSubject.next(serverResponse.contents);
            },
            error: (error) => {
                console.error(`Error communicating with server: ${error}`);
                this.readDataSubject.next(`Error communicating with server: ${error}`);
            }
        })
    }

    writeData(url: string, text: string): void {
        const fullUrl = 'http://' + url + `/write`;
        this.http.post<{message: string}>(fullUrl, { text: text }).subscribe({
            next: (serverResponse) => {
                console.log(`Server response received: ${JSON.stringify(serverResponse)}`);
            },
            error: (error) => {
                console.error(`Error communicating with server: ${error}`);
            }
        });
    }


}
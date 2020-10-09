import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public d3jsd = {};
  public d3jsl = [];
  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#46b535',
                '#05e2f1',
                '#552bec',
                'red',
                'blue',
                'green'
            ],
        }
    ],
    labels: []
};
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  getBudget() {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++){
      this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
      this.dataSource.labels[i] = res.myBudget[i].title;
      this.d3jsd[res.myBudget[i].title] = res.myBudget[i].budget;
      this.d3jsl[i] = res.myBudget[i].title;
    }
  });
}
}

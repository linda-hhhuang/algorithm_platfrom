import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const url = '/api/server';

@Injectable({
  providedIn: 'root'
})
export class MessageHandleService {

  private sendMessage = new BehaviorSubject<any>(null);
  sendMessage$ = this.sendMessage.asObservable();
  private receiveMessage = new BehaviorSubject<any>(null);
  receiveMessage$ = this.receiveMessage.asObservable();
  options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };
  httpParams?: HttpParams = new HttpParams();
  constructor(
    private http: HttpClient
  ) { }

  send_message(rawmessage): void {
    this.sendMessage.next({
      problem: rawmessage.ProblemForm.problem.value,
      graph_size: rawmessage.ProblemForm.graph_size,
      model: rawmessage.ModelForm.model.value,
      embedding_dim: rawmessage.ModelForm.embedding_dim,
      hidden_dim: rawmessage.ModelForm.hidden_dim,
      n_encode_layers: rawmessage.ModelForm.encode_layers,
      n_heads: rawmessage.ModelForm.heads,
      baseline: 'rollout',
      bl_alpha: rawmessage.AlgorithmForm.baseline_alpha,
      lr_model: rawmessage.TrainForm.learning_rate,
      lr_decay: rawmessage.TrainForm.learning_rate_dacay,
      batch_size: rawmessage.TrainForm.instances_per_batch,
      epoch_size: rawmessage.TrainForm.instances_per_epoch,
      n_epochs: rawmessage.TrainForm.epochs,
      val_size: rawmessage.TrainForm.instance_per_validation,
      seed: rawmessage.TrainForm.seed,
      run_name: rawmessage.MiscForm.run_name,
      output_dir: rawmessage.MiscForm.output_dir
    });
    this.http.post<any>('http://127.0.0.1:5000/server', JSON.stringify(this.sendMessage.value)).pipe(
      tap({
        next: (response) => {
          this.receiveMessage.next(response);
          console.log(response);
        }
      })
    ).subscribe();
    // const response =
    // {
    //   all_epochs: 3,
    //   all_time: '00:00:22',
    //   avg_cost: 1.5673738718032837,
    //   batch_arr: [
    //     0,
    //     1,
    //     2
    //   ],
    //   cost_arr: [
    //     1.5673738718032837,
    //     1.5673738718032837,
    //     1.5673738718032837
    //   ],
    //   epoch: 3,
    //   epoch_arr: [
    //     0,
    //     1,
    //     2
    //   ],
    //   loss_arr: [
    //     0.06434205174446106,
    //     -2.284599398549858e-09,
    //     7.76639375033028e-09
    //   ],
    //   lr: 0.0001,
    //   run_name: 'tsp_20_20210506T235557',
    //   std_cost: 0.004739717114716768
    // };
    // this.receiveMessage.next(response);
  }


}

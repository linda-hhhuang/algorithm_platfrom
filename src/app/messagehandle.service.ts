import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { tap, switchMap, share, retry, takeUntil } from 'rxjs/operators';
import { RecvType, SendType } from './messagehandle.entity';

const url = '/api/server';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessageHandleService {

  private sendMessage = new BehaviorSubject<SendType>(null);
  sendMessage$ = this.sendMessage.asObservable();
  private receiveMessage = new BehaviorSubject<RecvType>(null);
  receiveMessage$ = this.receiveMessage.asObservable();
  private stopPolling = new Subject();
  startPolling$ = this.stopPolling.asObservable();
  private counter = 0;
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
    this.http.post<any>(url, JSON.stringify(this.sendMessage.value), httpOptions).subscribe();

    this.receiveMessage$ = timer(1, 3000).pipe(
      switchMap(() => this.http.get<any>(url, httpOptions)),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

    this.receiveMessage$.subscribe(
      (message: RecvType) => {
        if (!(message.epoch < message.all_epochs)) {
          this.counter++;
          if (this.counter === 3) {
            this.stopPolling.next();
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }

}

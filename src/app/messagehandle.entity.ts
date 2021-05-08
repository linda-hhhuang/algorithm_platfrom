export interface SendType {
  problem: string;
  graph_size: number;
  model: string;
  embedding_dim: number;
  hidden_dim: number;
  n_encode_layers: number;
  n_heads: number;
  baseline: string;
  bl_alpha: number;
  lr_model: number;
  lr_decay: number;
  batch_size: number;
  epoch_size: number;
  n_epochs: number;
  val_size: number;
  seed: number;
  run_name: string;
  output_dir: string;
}

export interface RecvType {
  'all_epochs': number;
  'all_time': string;
  'avg_cost': number;
  'batch_arr': number[];
  'cost_arr': number[];
  'epoch': number;
  'epoch_arr': number[];
  'loss_arr': number[];
  'lr': number;
  'run_name': string;
  'std_cost': number;
}

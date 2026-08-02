export interface Diagnostic {
  severity: 'error' | 'warning';
  message: string;
  line?: number;
}

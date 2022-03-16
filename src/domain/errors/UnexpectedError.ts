export class UnexpectedError extends Error {
  constructor() {
    super('An unexpected error occurred');
    this.name = 'UnexpectedError';
  }
}

import { AllExceptionsFilter, HttpExceptionFilter} from './app.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});

describe('AllExceptionsFilter', () => {
  it('should be defined', () => {
    expect(new AllExceptionsFilter()).toBeDefined();
  });
});

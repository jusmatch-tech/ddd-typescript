import { lastValueFrom, of } from 'rxjs';
import { WrapperDataInterceptor } from '../wrapper-data.interceptor';

describe('WrapperDataInterceptor', () => {
  let interceptor: WrapperDataInterceptor;

  beforeEach(() => {
    interceptor = new WrapperDataInterceptor();
  });
  it('should wrapper with data key', async () => {
    expect(interceptor).toBeDefined();
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of({ name: 'test' }),
    });
    // como observable não é uma promise nos usamos o lastValueFrom
    //para pegar o valor do observable e transformar em uma promise
    const result = await lastValueFrom(obs$);
    expect(result).toEqual({ data: { name: 'test' } });
  });

  it('should not wrapper with meta key', async () => {
    expect(interceptor).toBeDefined();
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of({ name: 'test', meta: {} }),
    });
    const result = await lastValueFrom(obs$);
    expect(result).toEqual({ name: 'test', meta: {} });
  });
});

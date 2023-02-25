import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RaffleEntity } from 'src/raffles/entities/raffle.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

//이거를 useValue에 넣을것이다.이게 하는역활은 가짜 프로바이더를 만들껀데
//우리의 경우에는 (가짜 productsRepository) 이 객체가 어떤함수가 있을것인데
//그걸 원하는데로 만들어주는것이다. 우리는 productsRepository가 createQueryBuilder를
//사용하기 떄문엥 그것을 넣어주는거다 근데 실제 쿼리빌더의 기능을 하는것이아니고 그냥
//빈 함수인것이다
const mockRepository = () => ({
  //jest.fn()을 사용하면 return undefined인 함수를 만들어주는것
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

//레포지토리 타입을 가짜 타입만들어주는거
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

//여기서 부터 테스트의 가장 큰 단위 '디스크라이브'로 묶어준다
describe('설명', () => {
  let productsService: ProductsService;
  let productsRepository: MockRepository<ProductEntity>;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity), //여기는 토큰이 오는자리,토큰이 무엇인지는
          useValue: mockRepository(),
          //여기에는 useValue랑 useClass중에 하나 쓰면된다
          //두개의 차이점은 useValue는 객체나 값인가 같고 useClass는
          //클래스로 선언된 애를 여기에 넣어주면된다.
        },
        {
          provide: getRepositoryToken(RaffleEntity), //여기는 토큰이 오는자리,토큰이 무엇인지는
          useValue: mockRepository(),
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsRepository = moduleRef.get<MockRepository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });
  it('findAll함수', async () => {
    //여기에 테스트할것 쓰기
    //일단 요구사항 적기 지금은 프로덕트 서비스니까 프로덕트 서비스가
    //해야될일을 쓴다.
    //근데 우리는 서비스가 사실 아무런 로직이없다 그냥 레포지토리가 가져다준 데이터
    //리턴만 해주기 떄문에
    //일단 서비스안에 레포지토리가 있기떄문에 그 레포지토리가 동작을 했을때
    //나오는 결과를 정해줘야한다.

    const data = {
      productId: 1,
      productPrice: 120000,
      productName: 'nike',
      productSize: 250,
      startPrice: 100000,
      productImage: 'data:image/png;base64',
    };
    jest.spyOn(productsRepository, 'find').mockResolvedValue([data]);
    const result = await productsService.findAll();
    expect(result).toEqual({ count: [data].length, data: [data] }); //{ count: data.length, data: data });
  });

  it('findOne함수', async () => {
    const data = {
      productId: 1,
      productPrice: 120000,
      productName: 'nike',
      productSize: 250,
      startPrice: 100000,
      productImage: 'data:image/png;base64',
    };
    jest.spyOn(productsRepository, 'findOne').mockResolvedValue(data);
    const result = await productsService.findOne(1);
    expect(result).toEqual(data);
  });

  it('delete함수', async () => {
    jest.spyOn(productsRepository, 'delete').mockResolvedValue({
      raw: [],
      affected: 0,
    });
    const result = await productsService.remove(1);
    expect(result).toEqual({
      raw: [],
      affected: 0,
    });
  });
});

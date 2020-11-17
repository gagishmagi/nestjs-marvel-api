import { CreateHeroDto } from './create-hero.dto';

describe('CreateHeroDto', () => {
  it('should be defined', () => {
    expect(new CreateHeroDto()).toBeDefined();
  });
});

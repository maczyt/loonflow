import { render } from '@testing-library/react';

import FormDesign from './form-design';

describe('FormDesign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormDesign />);
    expect(baseElement).toBeTruthy();
  });
});

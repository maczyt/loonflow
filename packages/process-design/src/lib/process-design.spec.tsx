import { render } from '@testing-library/react';

import ProcessDesign from './process-design';

describe('ProcessDesign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProcessDesign />);
    expect(baseElement).toBeTruthy();
  });
});

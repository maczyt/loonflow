import { render } from '@testing-library/react';

import RenderUi from './render-ui';

describe('RenderUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RenderUi />);
    expect(baseElement).toBeTruthy();
  });
});

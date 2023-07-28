/* eslint-disable-next-line */
export interface RenderUiProps {}

export function RenderUi(props: RenderUiProps) {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to RenderUi!</h1>
    </div>
  );
}

export default RenderUi;

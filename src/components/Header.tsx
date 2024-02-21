interface HeaderProps {}
export const Header: React.FunctionComponent<
  React.PropsWithChildren<HeaderProps>
> = ({ children }) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      {children}
    </header>
  );
};

import { FlexboxProps } from '@mui/system';
import { ReactNode } from 'react';

interface FlexProps {
  children: ReactNode;
}
const Flex = (props: FlexProps & FlexboxProps) => {
  const { children, flexDirection, justifyContent, alignItems } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: flexDirection,
        alignItems: alignItems,
        justifyContent: justifyContent,
      }}
    >
      {children}
    </div>
  );
};
export default Flex;

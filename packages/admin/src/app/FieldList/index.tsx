import { Field } from '@loonflow/schema';
import { ReactNode } from 'react';

const fieldTags: Array<{
  type: Field;
  icon: ReactNode;
  title: string;
  category: string;
}> = [];

const FieldList = () => {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default FieldList;

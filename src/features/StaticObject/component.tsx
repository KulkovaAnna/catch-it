import { FC } from 'react';
import { StaticObjectProps } from './types';
import './styles.css';

const StaticObjectComponent: FC<StaticObjectProps> = ({
  staticObject,
  containerStyle,
}) => {
  return (
    <div
      style={{
        width: staticObject.width,
        height: staticObject.height,
        ...containerStyle,
      }}
    >
      <img
        src={staticObject.texture}
        alt={staticObject.name}
        className="static-object_image"
      />
    </div>
  );
};

export default StaticObjectComponent;

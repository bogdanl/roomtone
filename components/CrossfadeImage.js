import { useEffect, useState } from 'react';

export default function CrossfadeImage(props) {
  const {src, duration, opacity, timingFunction, className, zIndex, fallback, ...otherAttrs} = props;
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [toggleImage, setToggleImage] = useState(true);
  
  useEffect(() => {
    const currentToggle = toggleImage;
    toggleImage ? setImg2(src) : setImg1(src);
    setToggleImage(!toggleImage);
    setTimeout(() => currentToggle ? setImg1('') : setImg2(''), duration);
  }, [src]);

  const onError = (error) => {
    toggleImage ? setImg1(fallback) : setImg2(fallback)
  };

  const transitionStyle = `opacity ${duration}ms ${timingFunction}`;

  return (
    <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto'
      }}
    >
      <img
        className={className}
        style={{
          transition: transitionStyle,
          opacity: `${toggleImage && img1 ? opacity : '0'}`,
          gridColumn: 1,
          gridRow: 1
        }}
        src={img1}
        onError={toggleImage ? onError : () => {}}
        {...otherAttrs}
      />
      <img
        className={className}
        style={{
          transition: transitionStyle,
          opacity: `${!toggleImage && img2 ? opacity : '0'}`,
          gridColumn: 1,
          gridRow: 1
        }}
        src={img2}
        onError={!toggleImage ? onError : () => {}}
        {...otherAttrs}
      />
    </div>
  )
}

CrossfadeImage.defaultProps = {
  duration: 1000,
  timingFunction: 'ease-in-out',
  opacity: '1',
};
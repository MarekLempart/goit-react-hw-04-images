//
import { ColorRing } from 'react-loader-spinner'; // Biblioteka z animowanym spinnerem

// Używany w komponentach, w których trzeba pokazać, że dane są ładowane
export const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="100"
      width="100"
      ariaLabel="blocks-loading"
      wrapperStyle={{
        display: 'block',
        marginTop: -25,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClass="blocks-wrapper"
      color={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
  );
};

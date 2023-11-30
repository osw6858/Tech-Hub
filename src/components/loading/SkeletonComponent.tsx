import { Skeleton } from "antd";

const SkeletonComponent = () => {
  const skeletonItems = new Array(4);
  return (
    <>
      {skeletonItems.map(() => (
        <Skeleton active />
      ))}
    </>
  );
};

export default SkeletonComponent;

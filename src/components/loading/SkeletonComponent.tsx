import { Skeleton } from "antd";

type IterateNum = {
  iterateNum: number;
};

const SkeletonComponent = ({ iterateNum }: IterateNum) => {
  const skeletonItems = new Array(iterateNum).fill(1);
  return (
    <>
      {skeletonItems.map((_, inedx) => (
        <Skeleton key={inedx} active />
      ))}
    </>
  );
};

export default SkeletonComponent;

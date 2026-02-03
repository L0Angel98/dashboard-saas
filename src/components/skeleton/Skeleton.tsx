import styles from "./Skeleton.module.scss";

type Props = {
  w?: number | string;
  h?: number | string;
  circle?: boolean;
  className?: string;
};

export default function Skeleton({ w, h, circle, className = "" }: Props) {
  return (
    <div
      className={`${styles.skeleton} ${circle ? styles.circle : ""} ${className}`}
      style={{
        width: w,
        height: h,
      }}
    />
  );
}

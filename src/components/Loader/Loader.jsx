import { Puff } from "react-loader-spinner"; 
import styles from "./Loader.module.css"; 

const Loader = () => (
  <div className={styles.loaderContainer}>
    <Puff
      height={100} 
      width={100}  
      color="#4fa94d" 
      ariaLabel="puff-loading" 
    />
  </div>
);

export default Loader;
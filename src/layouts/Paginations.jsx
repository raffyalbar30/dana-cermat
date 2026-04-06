import Pages from '../component/Pages';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



const Paginations = ({ 
    Page, 
    NextPage, 
    PrevPage, 
    disable, 
    ClassNext, 
    ClassPrev,
    Class, 
    totalData,
    }) => {

    return (
        <div className='flex justify-between items-center'>
        <p className={Class}>{totalData}</p>
        <div className={`${Class} flex gap-x-2 items-center cursor-pointer mr-6`}>
            <Pages 
            HandleClick={PrevPage} 
            ClassName={ClassPrev} 
            disable={disable} Components={ <IoIosArrowBack/>}/>
              { Page }
            <Pages 
            HandleClick={NextPage} 
            ClassName={ClassNext}
            Components={ <IoIosArrowForward/>}/>
        </div>

        </div>
    );
}

export default Paginations;

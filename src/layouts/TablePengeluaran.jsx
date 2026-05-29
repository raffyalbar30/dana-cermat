import { useEffect, useState } from "react";
import Table, {  TableContent } from "../component/Table";
import Searching from "../component/Searching";
import Kategori from "../component/Kategori";
import Paginations from "./Paginations";
import Pages from "../component/Pages";
import { DataExpanse } from "../services/expanses";
import LoaderTable from "../component/LoaderTable";
import Notfound from "../component/Notfound";
import LoaderPage from "../component/LoaderPage";



const apiKey = DataExpanse;


const TablePengeluaran = () => {
  
  const [data, setdata] = useState([]);
  const [datasearch, setdatasearch] = useState([]);
  const [dataFilter, setdataFilter] = useState([]);
  const [category, setcategory] = useState("");
  const [inputs, setinputs] = useState("");
  const [search, setsearch] = useState("");
  const [pages, setpages] = useState(1);
  const [current, setcurrent] = useState([]);
  const [disable, setdisable] = useState(false);
  const [loader, setloader] = useState(true);


  // debouncing pada saat user search
  useEffect(() => {
   const time =  setTimeout(() => {
      setsearch(inputs.trim());
    }, 600);

  return () => clearTimeout(time);
  }, [inputs]); 
 
   
  // live searching pada inputs
  const useFilter = () => {

    const SearchingByName = apiKey?.items?.filter((item) => 
    item?.FirstName?.trim().toLowerCase().includes(search.toLowerCase()));
    
    setdatasearch(SearchingByName);

  }

   
  useEffect(() => {
    setloader(true);
    const time = setTimeout(() => {
       useFilter(); 
       setloader(false);
    }, 600);

    return () => clearTimeout(time);
  }, [search]);



  // FiturCategory
  const FilterCategory = () => {

    if(!category || category === "") {
      setdataFilter(apiKey?.items);
      return;
    } else {
      const FilterDataCategory = apiKey?.items?.filter((item) => 
      item?.Category?.trim().toLowerCase() === category.trim().toLowerCase());
  
      setdataFilter(FilterDataCategory);
    }
  }
  
  useEffect(() => {
       FilterCategory()
  }, [category, apiKey])

  
  
  // paginations logic
  const paginationsPages = (page, dataFilter) => {
  const perPage = 5;
  const pages = parseInt(page - 1);
  const startIndex = pages * perPage;
  const endIndex = startIndex + perPage;
  const pageData = dataFilter.slice(startIndex, endIndex); 


    if(pageData){
      setloader(true)
      setTimeout(() => {
         setdata(pageData);
         setcurrent(page);
         setloader(false);
       }, 400)

    } else {
       setloader(false);
    }

  };

  // next pages paginations
  const nextPages = (next) => {

      if(next === 3) {
         setdisable(true);
      } else {
        setdisable(false);
        setpages(() => next + 1);
      }
  }

// prev  pages paginations
  const prevPages = (prev) => {
 
      if(prev === 1) {
        setdisable(true);
      } else {
         setdisable(false);
         setpages(() => prev - 1);
      }
  }  

// paginations list 
    let dataPage = [];
  
    if (search.length > 0) {
      for(let i = 1; i <= 1; i++) {
        dataPage.push(i);
      }
    } else {
      const allPages = Math.ceil(dataFilter.length / 5);
        for(let i = 1; i <= allPages; i++) {
           dataPage.push(i);
        }
      
    }

  useEffect(() => {
    setTimeout(() => {
      paginationsPages(pages, dataFilter);
    }, 600)
  }, [pages, dataFilter]);
  

  let TotalData = []; 
  for(let i = 0; i < apiKey.items.length; i++) {
    const data = i + apiKey.items.length;
    TotalData.push(data);
  }
  
  return (
    <div className="border border-solid border-t-0 border-r-0 border-b-0 border-l-slate-200 w-full h-[740px]">
      <div className="ml-6 mt-8 flex-wrap">
        <Searching onChange={(e) => {
            setinputs(e.target.value);
        }}/>
        <Kategori 
         getCategory={
          (e) => setcategory(e.target.value)} category={category}/>
          <Table
         Children={

            search === "" ?
               !data ? ( 
                   <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-500 border-slate-200">
                          <Notfound />
                        </td>
                    </tr>
               ) :
             loader === true ? (
               <tr>
                  <td colSpan={4}>
                      <div className="mt-8 mb-8 flex items-center justify-center h-64">
                              <LoaderTable />
                            </div>
                          </td>
                     </tr>
               ) : (
                  <TableContent data={data} /> 
                ) : loader === true ? (
                      <tr>
                          <td colSpan={4}>
                              <div className="mt-8 mb-8 flex items-center justify-center h-64">
                                      <LoaderTable />
                                    </div>
                                  </td>
                            </tr>
                        ) : datasearch.length > 0 ? (
                            <TableContent data={datasearch} />
                          ) : (
                            <tr>
                              <td colSpan={4} className="text-center py-4 text-gray-500 border-slate-200">
                                 <Notfound />
                               </td>
                            </tr>
                       ) 

            }/>
        { loader === true ? ( 
          <div className={`mt-8 `}>
             <LoaderPage/> 
          </div>
         ) : (
           search.length > 0 ? (
            <Paginations 
            totalData={`Jumlah data hasil pencarain adalah ${datasearch.length} dari ${TotalData.length}`} 
            Class={`${search === "" || datasearch.length < 1 ? `hidden` : `active text-[15px] text-gray-700 ml-4`} 
              ${search.length > 1 ? `active` : `hidden`}`}
            ClassNext={`px-4 py-4 text-[14px]`}
            ClassPrev={`px-4 py-4 text-[14px]`}
            Page={
                <Pages
                ClassName={`px-4 py-2 cursor-pointer bg-[#3F47F4] rounded-lg text-slate-50 text-[18px]`} 
                Components={1}/>
            }/>
          ) : (
           <Paginations   
           Class={`${search === "" ? `active` : `hidden`}`}
           ClassNext={`px-4 py-4 ${ dataPage.length === current  ? `hidden` : `active`} text-[14px] cursor-pointer`}
           ClassPrev={`px-4 py-4 ${ dataPage[0] === current ? `hidden` : `active`} text-[14px] cursor-pointer`}
           NextPage={()=> nextPages(current)} 
          PrevPage={()=> prevPages(current)}
           Page={
            dataPage.map((item) => {
                  return (
                            <Pages HandleClick={()=> paginationsPages(item, dataFilter)} 
                            ClassName={`px-4 py-2 ${item === current ? `rounded-lg text-slate-50 bg-[#3F47F4] cursor-pointer`
                               : `bg-transparent text-slate-700 cursor-pointer`} 
                             text-[18px]`} 
                            disable={item === current}
                            Components={item}/>
                        )
                    })
            }/>
          )
        ) 
        } 
      </div>
    </div>
  );
};

export default TablePengeluaran;

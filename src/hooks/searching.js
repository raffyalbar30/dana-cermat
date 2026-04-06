
export const useSearching = (data, inputs) => {

   // searching data by nama depan includes kata yang sama kaya data
    const SearchByName = data?.items?.filter(item =>
      item?.FirstName?.trim().toLowerCase().includes(inputs.toLowerCase())
    );
    
    return { search: SearchByName }

}